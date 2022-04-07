import { playbackActions } from "../../redux/playback/playback-slice";
import { store } from "../../redux/store";
import api from "../../utils/api";

export default class PlaybackService {
  windowObj = window as any;
  token: string = '';
  deviceId: string = '';
  sdk: any;

  constructor(token: string) {
    this.token = token;
  }
  async initPlaybackSDK() {
    this.windowObj.onSpotifyWebPlaybackSDKReady = () => {};

    const { Player } = await this.waitForPlaybackSDKToLoad();
    const sdk = new Player({
      name: "Web Playback SDK",
      volume: 1.0,
      getOAuthToken: (callback: any) => {
        callback(this.token);
      },
    });

    this.sdk = sdk;

    sdk.addListener("ready", async (event: any) => {
      console.log("Ready with Device ID", event.device_id);
      store.dispatch(playbackActions.setVolume({
        volume: await this.sdk.getVolume()
      }));
      if (!this.deviceId || this.deviceId !== event.device_id) {
        this.deviceId = event.device_id;
        store.dispatch(playbackActions.addDeviceId({
          deviceId: event.device_id
        }));
        await api.put('/me/player', {
          device_ids: [this.deviceId],
          play: false
        });
      }
      if (this.sdk) {
        console.log(this.sdk);
        store.dispatch(playbackActions.updatePlayer({
          player: this.sdk
        }));
      }
    });

    sdk.addListener("not_ready", (event: any) => {
      console.log("Device ID has gone offline", event.device_id);
    });

    sdk.addListener("player_state_changed", async (state: any) => {
      if (!state) {
        return;
      }
      const prevTrack = store.getState().playback.track;
      if (JSON.stringify(prevTrack) !== JSON.stringify(state.track_window.current_track) && state.track_window.current_track) {
        store.dispatch(playbackActions.updateTrack({
          track: state.track_window.current_track
        }));
        store.dispatch(playbackActions.setPosition({
          position: state.position
        }));
      }
      const prevIsPlaying = store.getState().playback.isPlaying;
      if (prevIsPlaying !== !state.paused) {
        store.dispatch(playbackActions.updateIsPlaying({
          isPlaying: !state.paused
        }))
      }
    });

    await sdk.connect();
  
  }

  async togglePlay(isPlaying: boolean, contextUri: string) {
    const response = isPlaying ? await this.play(contextUri) : await this.pause(contextUri);
    console.log(response);
  }

  private play(contextUri: string) {
    return api.put(`/me/player/play?device_id=${this.deviceId}`, {
      context_uri: contextUri
    });
  }

  private pause(contextUri: string) {
    return api.put(`/me/player/pause?device_id=${this.deviceId}`, {
      context_uri: contextUri
    });
  }

  private waitForPlaybackSDKToLoad(): any {
    return new Promise((resolve) => {
      if (this.windowObj.Spotify) {
        resolve(this.windowObj.Spotify);
      } else {
        this.windowObj.onSpotifyWebPlaybackSDKReady = () => {
          resolve(this.windowObj.Spotify);
        };
      }
    });
  }

}

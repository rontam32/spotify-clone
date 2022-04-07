import { Log, User, UserManager } from "oidc-client";
import { IDENTITY_CONFIG, METADATA_CONFIG } from "./auth-config";
import api from "../../utils/api";
import PlaybackService from "../playback/playback.service";
import { store } from "../../redux/store";
import { authActions, getUserProfile } from "../../redux/auth/auth-slice";
import {
  getPlaylist,
  playlistActions,
} from "../../redux/playlist/playlist-slice";

export default class AuthService {
  UserManager: UserManager;
  _navigate: (route: string | undefined) => void = (
    route: string | undefined
  ) => {};

  constructor(navigate: (route: string | undefined) => void) {
    this.UserManager = new UserManager({
      ...IDENTITY_CONFIG,
      metadata: METADATA_CONFIG,
    });

    this._navigate = navigate;

    // Log.logger = console;
    // Log.level = Log.DEBUG;
  }

  signinRedirect = () => {
    localStorage.setItem("redirectUri", window.location.pathname);
    this.UserManager.signinRedirect();
  };

  logout = () => {
    this.clearUserProfile();
    this.UserManager.signoutRedirect();
    this.UserManager.clearStaleState();
  };

  signoutRedirectCallback = () => {
    this.UserManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace(process.env.REACT_APP_PUBLIC_URL || "");
    });
    this.UserManager.clearStaleState();
  };

  async initLogin() {
    let isSigninRedirect = false;
    let user: User | null = null;
    try {
      const user = await this.UserManager.signinRedirectCallback();
      isSigninRedirect = !!user;
    } catch (error) {
      isSigninRedirect = false;
    }

    if (!user) {
      try {
        user = await this.UserManager.getUser();
        isSigninRedirect = !!user;
      } catch (error) {
        isSigninRedirect = false;
      }
    }

    const state = store.getState();

    if (!isSigninRedirect) {
      this.navigateToScreen(window.location.pathname);
      store.dispatch(
        authActions.updateUserProfile({
          userProfile: null,
        })
      );

      return;
    }

    console.log(state.auth.userProfile);
    if (!state.auth.userProfile) {
      try {
        if (user) {
          this.UserManager.events.addAccessTokenExpired(() => {
            console.log("Expired");
            // this.clearUserProfile();
          });
          sessionStorage.setItem("expires_in", user.expires_in.toString());
          sessionStorage.setItem("access_token", user.access_token);
          sessionStorage.setItem(
            "refresh_token",
            user.refresh_token!.toString()
          );

          store.dispatch(getUserProfile());

          store.dispatch(getPlaylist());

          const playback = new PlaybackService(user.access_token);
          playback.initPlaybackSDK();

          store.dispatch(
            authActions.setIsAuthenticated({
              isAuthenticated: true,
            })
          );
          this.navigateToScreen(window.location.pathname);
        } else {
          this.navigateToScreen(window.location.pathname);
        }
      } catch (error) {
        console.log(error);
        this.clearUserProfile();
        this.navigateToScreen(window.location.pathname);
      }
    }
  }

  private navigateToScreen = (route?: string) => {
    this._navigate(route);
  };

  private clearUserProfile = () => {
    store.dispatch(
      authActions.updateUserProfile({
        userProfile: null,
      })
    );
    console.log("cleared userprofile");
    sessionStorage.removeItem("expires_in");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
  };

  static get accessToken() {
    const token = sessionStorage.getItem(`access_token`);
    return token || "";
  }
}

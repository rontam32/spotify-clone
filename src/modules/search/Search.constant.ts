import moment from "moment";
import { CategoryGridContents } from "../../models/Application";
import { millisecondsToMinutes } from "date-fns";
import { MouseEvent } from "react";

export const mutateSearchResultFn = (
  response: any,
  navigate: (path: string) => void
) => {
  const mutatedResult: { [key: string]: CategoryGridContents[] } = {};
  for (const type of Object.keys(response)) {
    const items = response[type].items as any[];
    switch (type) {
      case "albums":
        mutatedResult[type] = items.map((item) => {
          return {
            artists: item.artists,
            name: item.name,
            img: item.images[0].url,
            id: item.id,
            uri: item.uri,
            containerClickHandler: (e: MouseEvent) => {
              navigate(`/album/${item.id}`);
            },
          };
        });
        break;
      case "artists":
        mutatedResult[type] = items.map((item) => {
          return {
            name: item.name,
            img: item.images[0]?.url,
            id: item.id,
            description: "Artist",
            uri: item.uri,
            isArtist: true,
            containerClickHandler: (e: MouseEvent) => {},
          };
        });
        break;
      case "episodes":
        mutatedResult[type] = items.map((item) => {
          return {
            name: item.name,
            img: item.images[0].url,
            id: item.id,
            description:
              moment(item.release_date).format("ll") +
              " ·" +
              millisecondsToMinutes(item.duration_ms),
            containerClickHandler: (e: MouseEvent) => {},
          };
        });
        break;
      case "playlists":
        mutatedResult[type] = items.map((item) => {
          return {
            name: item.name,
            description: "By " + item.owner.display_name,
            img: item.images[0].url,
            id: item.id,
            uri: item.uri,
            containerClickHandler: (e: MouseEvent) => {
              navigate(`/playlist/${item.id}`);
            },
            isCategoryPlaying: (currentTrackId: string) => {
              return items
                .map((item) => {
                  return item.id;
                })
                .includes(currentTrackId);
            },
          };
        });
        break;
      case "shows":
        mutatedResult[type] = items.map((item) => {
          return {
            name: item.name,
            description: item.publisher,
            img: item.images[0].url,
            id: item.id,
            containerClickHandler: (e: MouseEvent) => {},
            isCategoryPlaying: (currentTrackId: string) => {
              return item.id === currentTrackId;
            },
          };
        });
        break;
    }
  }

  return mutatedResult;
};

export const TYPE_GET_DATA_TYPE_MAPPING: { [key: string]: string } = {
  tracks: "track",
  artists: "artist",
  albums: "album",
  shows: "show",
  episodes: "episode",
  playlists: "playlist",
};

export const SEARCH_TYPES: { [key: string]: string } = {
  track: "Songs",
  artist: "Artists",
  album: "Albums",
  show: "Podcasts",
  episode: "Episodes",
  playlist: "Playlists",
};

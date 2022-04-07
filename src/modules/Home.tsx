import { useEffect, useState } from "react";
import useHeader from "../hooks/use-header";
import api from "../utils/api";
import Media from "../components/containers/category-grid/CategoryGrid";
import {
  FeaturedPlaylist,
  GenericPlaylist,
  RecentlyPlayedPlaylist,
} from "../models/Playlist";
import { CategoryGridContents } from "../models/Application";
import { defaultContentInfo } from "../constants";
import usePlaylistGrid from "../hooks/use-playlist-grid";
import TopPaddingContainer from "../components/wrapper/top-padding-container/TopPaddingContainer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [recentlyPlayedContent, setRecentlyPlayedContent] =
    useState<GenericPlaylist.FeaturedPlaylistsContentInfo>(
      defaultContentInfo("Recently Played")
    );

  useHeader();
  const {
    playlistContent: featurePlaylistContent,
    setPlaylistGridConfig: setFeaturedPlaylistGridConfig,
  } = usePlaylistGrid();
  const navigate = useNavigate();

  useEffect(() => {
    const getRecentlyPlayedContent = async () => {
      const response = await api.get("/me/player/recently-played", {
        limit: "6",
        types: [
          "artist",
          "album",
          "show",
          "playlist",
          "station",
          "collection",
          "track",
        ].join(","),
        market: "from_token",
      });

      const items = response.items as RecentlyPlayedPlaylist.RecentlyPlayedPlaylistItem[];

      setRecentlyPlayedContent((prevState) => {
        return {
          ...prevState,
          playlistItems: items.map(({ track }) => {
            return {
              img: track.album.images[0].url,
              name: track.name,
              artists: track.artists,
              id: track.id,
              containerClickHandler: (e: React.MouseEvent) => {
                navigate(`/album/${track.album.id}`);
              },
              uri: track.album.uri,
              trackNumber: track.track_number - 1
            };
          }),
        };
      });
    };

    const getFeaturedPlaylists = async () => {
      const featuredPlaylistsResponse = await api.get(
        "/browse/featured-playlists",
        {
          limit: "4",
        }
      );
      const featuredPlaylistItems = featuredPlaylistsResponse.playlists
        .items as FeaturedPlaylist.FeaturedPlaylistItem[];

      const getPlaylistItems = (id: string) => {
        return api.get(`/playlists/${id}/tracks`, {
          limit: "8",
        });
      };
      if (featuredPlaylistItems.length > 0) {
        const featurePlaylistGridConfigList: GenericPlaylist.PlaylistGridConfig[] =
          [];
        const transformplaylistItemsFn = (
          playlistItem: GenericPlaylist.GenericPlaylistItem
        ) => {
          const { track } = playlistItem;
          return {
            artists: track.artists,
            name: track.name,
            img: track.album.images[0].url,
            id: track.id,
            containerClickHandler: (e: React.MouseEvent) => {
              navigate(`/album/${track.album.id}`);
            },
            uri: track.album.uri,
          } as CategoryGridContents;
        };

        for (const item of featuredPlaylistItems) {
          const featurePlaylistGridConfig: GenericPlaylist.PlaylistGridConfig =
            {
              transformplaylistItemsFn,
              getPlaylistFn: async () => {
                const playlistItemsResponse: any = await getPlaylistItems(
                  item.id
                );
                const playlistItems =
                  playlistItemsResponse.items as GenericPlaylist.GenericPlaylistItem[];
                return playlistItems;
              },
              extraPropertyFn: () => {
                return {
                  playlistName: item.name,
                  playlistId: item.id,
                };
              },
            };

          featurePlaylistGridConfigList.push(featurePlaylistGridConfig);
        }

        setFeaturedPlaylistGridConfig(featurePlaylistGridConfigList);
      }
    };
    getRecentlyPlayedContent();
    getFeaturedPlaylists();
  }, []);

  return (
    <>
      <TopPaddingContainer>
        <Media
          title={recentlyPlayedContent.playlistName}
          contents={recentlyPlayedContent.playlistItems}
          seeAllLink=''
        ></Media>
        {featurePlaylistContent?.map((content) => {
          return (
            <Media
              id={content.playlistId}
              key={content.playlistId || "recently-played"}
              title={content.playlistName}
              contents={content.playlistItems}
              seeAllLink={`/album/${content.playlistId}`}
            ></Media>
          );
        })}
      </TopPaddingContainer>
    </>
  );
};

export default Home;

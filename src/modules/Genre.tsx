import { useParams } from "react-router";
import useHeader from "../hooks/use-header";
import usePlaylistGrid from "../hooks/use-playlist-grid";
import { CategoryGridContents } from "../models/Application";
import { GenericPlaylist } from "../models/Playlist";
import api from "../utils/api";
import Media from "../components/containers/category-grid/CategoryGrid";
import TopPaddingContainer from "../components/wrapper/top-padding-container/TopPaddingContainer"; 
import { useNavigate } from "react-router-dom";

const Genre = () => {
  useHeader("default");
  const params = useParams();
  const navigate = useNavigate();

  const playlistGridConfig: GenericPlaylist.PlaylistGridConfig[] = [{
    extraPropertyFn: async () => {
      const playlistDetailResponse = (await api.get(
        `/playlists/${params.genreId}`,
        {}
      )) as GenericPlaylist.PlaylistDetail;
      return {
        playlistName: playlistDetailResponse.name,
      };
    },
    getPlaylistFn: async () => {
      const playlistTrackresponse = await api.get(
        `/playlists/${params.genreId}/tracks`,
        { limit: "15" }
      );
      const items =
        playlistTrackresponse.items as GenericPlaylist.GenericPlaylistItem[];
      return items;
    },
    transformplaylistItemsFn: ({track}: GenericPlaylist.GenericPlaylistItem) => {
      return {
        description: track.artists.map(artist => {
            return artist.name
        }).join(', '),
        name: track.name,
        id: track.id,
        containerClickHandler: (e: React.MouseEvent) => {
          navigate(`/album/${track.album.id}`);
        },
        uri: track.uri,
        img: track.album.images[0].url

      } as CategoryGridContents;
    },
  }];

  const { playlistContent } = usePlaylistGrid(playlistGridConfig);

  return (
    <>
    <TopPaddingContainer>
      {playlistContent.map(content => {
          return <Media
          isFullScreen={true}
          title={content.playlistName}
          contents={content.playlistItems}
          seeAllLink={``}
        ></Media>
      })}
    </TopPaddingContainer>
    </>
  );
};

export default Genre;

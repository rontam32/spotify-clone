import TopPaddingContainer from "../../../../components/wrapper/top-padding-container/TopPaddingContainer";
import TrackTable from "../../../../contexts/DataGridContext";
import Media from "../../../../components/containers/category-grid/CategoryGrid";
import FavoriteButton from "../../../../components/common/buttons/favorite-button/FavoriteButton";
import { useContext, useEffect, useState } from "react";
import { CategoryGridContents, TableHeader } from "../../../../models/Application";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Track } from "../../../../models/Common";
import { SnackbarContext } from "../../../../contexts";
import classes from "./SearchResult.module.scss";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { convertMilliSecToDisplayTime } from "../../../../utils";
import api from "../../../../utils/api";
import { mutateSearchResultFn, SEARCH_TYPES } from "../../Search.constant";
import { useDispatch, useSelector } from "react-redux";
import { getSearchTracks, removeSavedTrack, saveTrack } from "../../async-thunks/searchResultAsyncThunk";

const SearchResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTrackResult = useSelector((state: any) => state.search).tracks;
  const params = useParams();
  const searchQuery = params.query;
  const [searchResult, setSearchResult] = useState<{
    [key: string]: CategoryGridContents[];
  }>({});
  const snackBarHandler = useContext(SnackbarContext).openSnackBar;

  const trackTableHeaders: TableHeader[] = [
    {
      key: "name",
      name: "Title",
      rowTemplate: (track: Track, currentTrackId) => {
        return (
          <div className={classes["title"]}>
            <div className={classes["album-image"]}>
              <img src={track.album.images[0].url}></img>
            </div>
            <div className={classes["name-col"]}>
              <div
                className={
                  track.id === currentTrackId
                    ? `${classes.name} ${classes.playing}`
                    : classes.name
                }
              >
                {track.name}
              </div>
              <div className={classes.artist}>
                <span>
                  {track.artists.map((artist, index) => {
                    if (index !== track.artists.length - 1) {
                      return (
                        <>
                          <Link
                            className={classes["artist-name"]}
                            to={`/artist/${artist.id}`}
                            key={artist.id}
                          >
                            {artist.name}
                          </Link>
                          {`, `}
                        </>
                      );
                    }
                    return (
                      <Link
                        className={classes["artist-name"]}
                        to={`/artist/${artist.id}`}
                        key={artist.id}
                      >
                        {artist.name}
                      </Link>
                    );
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "favorite",
      favButtonTemplate: (
        buttonCss: string,
        currentTrackId?: string,
        isTracksSaved?: boolean
      ) => {
        const saveTrackHandler = async (isSave: boolean) => {
          isSave
            ? dispatch(saveTrack({ trackId: currentTrackId! }))
            : dispatch(removeSavedTrack({ trackId: currentTrackId! }));
          isSave
            ? snackBarHandler("Saved to Your Liked Songs", "save_track")
            : snackBarHandler("Removed from Your Liked Songs", "remove_track");
        };
        return (
          <FavoriteButton
            cssClass={buttonCss}
            favoriteHandler={() => {
              saveTrackHandler(true);
            }}
            unfavoriteHandler={() => {
              saveTrackHandler(false);
            }}
            isCurrentlyFavorited={isTracksSaved}
          />
        );
      },
      name: "",
      cellProps: { align: "right" },
    },
    {
      key: "duration_ms",
      name: () => {
        return (
          <AccessTimeIcon
            style={{
              height: 16,
              width: 16,
            }}
          />
        );
      },
      rowTemplate: (item: Track) => {
        const { min, sec } = convertMilliSecToDisplayTime(item.duration_ms);
        return (
          <>
            <div className="default-table-cell">{`${min}:${sec}`}</div>
          </>
        );
      },
      cellProps: { align: "right", width: 40 },
    },
  ];

  useEffect(() => {
    if (searchQuery) {
      const getSearchList = async () => {
        const response = await api.get("/search", {
          limit: "8",
          type: Object.keys(SEARCH_TYPES).join(","),
          q: searchQuery,
        });
        dispatch(getSearchTracks({
          searchQuery,
          searchTypes: SEARCH_TYPES
        }));

        delete response.tracks;
        setSearchResult(mutateSearchResultFn(response, navigate));
      };

      getSearchList();
    }
  }, [searchQuery]);

  return (
    <>
      <TopPaddingContainer>
        {Object.keys(searchResult).length &&
          Object.keys(SEARCH_TYPES).map((type) => {
            if (type === "track") {
              return (
                <div className="mb-3" key={type}>
                  <TrackTable
                    tableConfig={{
                      rows: searchTrackResult || [],
                      headers: trackTableHeaders,
                      isSearchResultOrLikedSongs: true
                    }}
                  />
                </div>
              );
            }
            return (
              <Media
                id={type}
                key={type}
                title={SEARCH_TYPES[type]}
                contents={searchResult[type + "s"]}
                seeAllLink={`/search/${searchQuery}/${type + "s"}`}
                reloadDocumentWhenSeeAll={false}
              ></Media>
            );
          })}
      </TopPaddingContainer>
    </>
  );
};

export default SearchResult;

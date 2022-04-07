import api from "../../../utils/api";
import { TYPE_GET_DATA_TYPE_MAPPING } from "../Search.constant";

const service = {
    getSearchList(searchQuery: string, searchTypes: { [key: string]: string }) {
        return api.get("/search", {
            limit: "8",
            type: Object.keys(searchTypes).join(","),
            q: searchQuery,
          });
    },
    updateSavedTrack(isSave: boolean, currentTrackId: string) {
        return isSave
        ? api.put(`/me/tracks/?ids=${currentTrackId}`, {})
        : api.delete(`/me/tracks/?ids=${currentTrackId}`, {});
    },
    getSearchListByType(type: string, query: string, offset: number) {
        return api.get("/search", {
            limit: "50",
            type: TYPE_GET_DATA_TYPE_MAPPING[type],
            q: query,
            offset,
          })
    }
};

export default service;
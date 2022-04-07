import React, { useEffect, useState } from 'react';
import { GenericProps, TableHeader } from '../models/Application';
import { chunk } from 'lodash';
import api from "../utils/api";
import TrackDataGrid from '../components/data-tables/track-data-grid/TrackDataGrid';


interface TableContext {
    rows: any[],
    categoryDetail: any,
    checkTracksAreSaved: boolean[],
    headers: TableHeader[],
    categoryUri: string,
    isSearchResultOrLikedSongs: boolean;
    isLikedSongs: boolean;
}

interface TrackTableProps {
    tableConfig: {
        rows: any[];
        categoryDetail?: any;
        headers: TableHeader[];
        categoryUri?: string;
        isSearchResultOrLikedSongs?: boolean;
        isLikedSongs?: boolean;
    }
}

const DEFAULT_TABLE_CONFIG = {
    rows: [],
    headers: [],
    categoryDetail: [],
    categoryUri: '',
    checkTracksAreSaved: [],
    isSearchResultOrLikedSongs: false,
    isLikedSongs: false,
}

export const TrackTableContext = React.createContext<TableContext>(DEFAULT_TABLE_CONFIG);

export const TrackTable = ({tableConfig}: GenericProps<TrackTableProps>) => {
    const [checkTracksAreSaved, setCheckTracksAreSaved] = useState<boolean[]>([]);
    const {rows, headers, categoryDetail, categoryUri = '', isSearchResultOrLikedSongs = false, isLikedSongs = false} = tableConfig;
    useEffect(() => {
        if (rows.length) {
          const chunkedTableRows = chunk(rows, 50);
          
          const checkTracksAreSaved = async () => {
            let aggregatedCheckTracks: any[] = [];
            for (const chunkRow of chunkedTableRows) {
              const ids = chunkRow.map((row: any) => row.id).join(',');
              const response = await api.get(`/me/tracks/contains?ids=${ids}`, {});
              aggregatedCheckTracks = [...aggregatedCheckTracks, ...response];
            }
            setCheckTracksAreSaved(aggregatedCheckTracks);
    
          }
    
          checkTracksAreSaved();
        }
      }, [rows]);

    return <TrackTableContext.Provider value={{
        checkTracksAreSaved,
        rows,
        headers,
        categoryDetail,
        categoryUri,
        isSearchResultOrLikedSongs,
        isLikedSongs
    }}>
        <TrackDataGrid />
    </TrackTableContext.Provider>
}

export default TrackTable;

import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TrackDataRow from "../track-data-row/TrackDataRow";
import { useContext } from "react";
import { isFunction } from "lodash";
import {TrackTableContext} from '../../../contexts/DataGridContext';

const TrackDataGrid = () => {
  const {rows,
    headers,
    categoryUri,
    checkTracksAreSaved,
    isSearchResultOrLikedSongs
  } = useContext(TrackTableContext);

  const tableRow = rows.map((row, index) => {
    return (
      <TrackDataRow
        albumUri={isSearchResultOrLikedSongs ? row?.album?.uri : categoryUri}
        key={index}
        rowIndex={index}
        trackNumber={isSearchResultOrLikedSongs ? row?.track_number - 1 : index}
        row={row}
        isTracksSaved={checkTracksAreSaved[index]}
      />
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {headers.map((header) => {
              return (
                <TableCell {...header.cellProps} key={header.key}>
                  {isFunction(header.name) ? header.name() : header.name}
                </TableCell>
              );
            })}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRow}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrackDataGrid;

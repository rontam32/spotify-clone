import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { HeaderContext } from "../../../contexts";
import classes from "./CollectionButtonGroup.module.scss";

const TYPES: { [key: string]: string } = {
  playlists: "Playlists",
  artists: "Artists",
  albums: "Albums",
};
const CollectionButtonGroup = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {forwardHeaderData} = useContext(HeaderContext);

  const tabClickHandler = (index: number) => {
    setSelectedIndex(index);
    forwardHeaderData(Object.keys(TYPES)[index]);
  }

  return (
    <>
      <div className="flex gap-x-3">
        {Object.keys(TYPES).map((type, index) => {
          return (
            <Button
              key={index}
              disableRipple
              disableElevation
              className={
                selectedIndex === index
                  ? `${classes.selected} ${classes.button}`
                  : classes.button
              }
              onClick={() => {
                tabClickHandler(index);
              }}
            >
              {TYPES[type]}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default CollectionButtonGroup;

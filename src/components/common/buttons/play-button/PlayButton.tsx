import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { StyledIconButton } from "../button.styles";
import React, { useCallback, useEffect, useState } from "react";
import { GenericProps } from "../../../../models/Application";

interface PlayButtonProps {
  playHandler: (e: React.MouseEvent) => void;
  pauseHandler: (e: React.MouseEvent) => void;
  cssClass?: string; 
  styles?: {[key: string]: string | number};
  isCurrentTrackPlaying?: boolean;
}
const PlayButton = ({ playHandler, pauseHandler, cssClass, styles, isCurrentTrackPlaying }: GenericProps<PlayButtonProps>) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const clickPlayHandler = useCallback((e: React.MouseEvent) => {
    if (!isPlaying) {
      playHandler(e);
    } else {
      pauseHandler(e);
    }
    setIsPlaying((prevState) => {
      return !prevState;
    });
  }, [playHandler, pauseHandler, isPlaying]);

  useEffect(() => {
    setIsPlaying(!!isCurrentTrackPlaying);
  }, [isCurrentTrackPlaying]);

  return (
    <StyledIconButton style={styles || {}} onClick={clickPlayHandler} className={cssClass || ""}>
      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
    </StyledIconButton>
  );
};

export default React.memo(PlayButton);

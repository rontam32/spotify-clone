import { StyledIconButton } from "../button.styles";
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { GenericProps } from "../../../../models/Application";
import { useEffect, useState } from "react";
import classes from './VolumeButton.module.scss';
import React from 'react';

interface VolumeButtonProps {
    volume: number;
    clickVolumeHandler: (isMuted: boolean) => void;
}

const VolumeButton = ({ volume, clickVolumeHandler }: GenericProps<VolumeButtonProps>) => {
    const [isSoundMuted, setIsSoundMuted] = useState(false);

    const clickHandler = () => {
        clickVolumeHandler(!isSoundMuted);
        setIsSoundMuted(prev => {
            return !prev
        });
    }

    useEffect(() => {
        setIsSoundMuted(!(!!volume));
    }, [volume])

    return (
        <StyledIconButton onClick={clickHandler} className={classes.mute}>
          {isSoundMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
        </StyledIconButton>
      );
}

export default React.memo(VolumeButton);
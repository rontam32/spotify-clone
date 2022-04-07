import classes from './FavoriteButton.module.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GenericProps } from "../../../../models/Application";
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';

interface FavoriteButtonProps {
    favoriteHandler: (e: React.MouseEvent) => void;
    unfavoriteHandler: (e: React.MouseEvent) => void;
    cssClass?: string; 
    isCurrentlyFavorited?: boolean;
}
const FavoriteButton = ({ favoriteHandler, unfavoriteHandler, cssClass, isCurrentlyFavorited }: GenericProps<FavoriteButtonProps>) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const clickFavoriteHandler = (e: React.MouseEvent) => {
        isFavorite ? unfavoriteHandler(e) : favoriteHandler(e);
        setIsFavorite(prevState => {
            return !prevState;
        });
    }

    useEffect(() => {
        setIsFavorite(!!isCurrentlyFavorited);
    }, [isCurrentlyFavorited])
    return (
        <IconButton style={isFavorite ? {
            display: 'inline-flex'
        } : {}} className={cssClass ? cssClass : classes.heart} onClick={clickFavoriteHandler}>
                            {isFavorite ? <FavoriteIcon className={classes['favorite']}/> : <FavoriteBorderIcon/>}

        </IconButton>
    );
}

export default FavoriteButton;
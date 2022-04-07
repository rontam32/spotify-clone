import { IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';

export const StyledIconButton = styled(IconButton)({
    'svg': {
        color: '#fff',
        verticalAlign: 'top'
    }, 
    backgroundColor: '#1db954',
    height: '40px',
    '&:hover': {
        backgroundColor: '#1db954',
        transform: 'scale(1.06)'
      }
  });
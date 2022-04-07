import { styled } from "@mui/material/styles";

export const MediaGridContainer = styled("div")(({ theme }) => ({
    gridAutoRows: 0,
    gridTemplateRows: '1fr',
    overflowY: 'hidden',
    gap: '24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))'
  }));

  export const AutoMediaGridContainer = styled("div")(({ theme }) => ({
    gridAutoRows: 'auto',
    gridTemplateRows: '1fr',
    overflowY: 'hidden',
    gap: '24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))'
  }));
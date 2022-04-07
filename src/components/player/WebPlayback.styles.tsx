import { Slider, SliderProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledSlider = styled((props: SliderProps) => (
  <Slider size="small" min={0} step={1} {...props} />
))(({ theme }) => ({
    "&:hover": {
        "& .MuiSlider-thumb": {
            boxShadow: "none",
            display: 'flex'
        },
        "& .MuiSlider-track": {
            border: "none",
            color: "#1db954"
          }
      },
  "& .MuiSlider-track": {
    border: "none",
    color: "#b3b3b3"
  },
  "& .MuiSlider-rail": {
    color: "#535353",
  },
  "& .MuiSlider-thumb": {
    backgroundColor: "#fff",
    display: 'none',
    "&:before": {
      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
    },
    "&:hover": {
      boxShadow: "none",
    },
  },
}));

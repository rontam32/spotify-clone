import { GenericProps } from "../../../../models/Application";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { StyledIconButton } from "../button.styles";

interface SkipButtonProps {
  type: "next" | "previous";
  cssClass?: string;
  clickHandler: (e: React.MouseEvent) => void;
}

const SkipButton = ({
  type,
  cssClass = "",
  clickHandler,
}: GenericProps<SkipButtonProps>) => {
  return (
    <StyledIconButton onClick={clickHandler} className={cssClass}>
      {type === "next" ? <SkipNextIcon /> : <SkipPreviousIcon />}
    </StyledIconButton>
  );
};

export default SkipButton;

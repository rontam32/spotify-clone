import { GenericProps } from "../../../../models/Application";
import TopPaddingContainer from "../../../wrapper/top-padding-container/TopPaddingContainer";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import classes from "./ErrorFallback.module.scss";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: GenericProps<{ error: any; resetErrorBoundary: () => void }>) => {
  return (
    <>
      <TopPaddingContainer cssClass={classes['main-wrapper']}>
        <div className={classes["error-container"]}>
          <div className={classes['error-icon']}>
            <ErrorOutlineIcon />
          </div>
          <h1 className={classes["error-text"]}>
              Something went wrong
          </h1>
        </div>
      </TopPaddingContainer>
    </>
  );
};

export default ErrorFallback;

import { styled } from "@mui/material/styles";
import SideBar from "../components/sections/side-bar/SideBar";
import MainViewer from "../components/sections/main-viewer/MainViewer";
import Footer from "../components/sections/footer/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScrollProvider } from "../contexts";

const MainContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "calc(100vh - 90px)",
}));

const Main = () => {
  const { userProfile } = useSelector((state: any) => state.auth);

  return (
    <>
      <MainContainer>
        <SideBar />
        <ScrollProvider>
          <MainViewer>{userProfile && <Outlet />}</MainViewer>
        </ScrollProvider>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Main;

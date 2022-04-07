import Main from "../modules/Main";
import { Route, Routes } from "react-router-dom";
import Home from "../modules/Home";
import Genre from "../modules/Genre";
import Album from "../modules/album/Album";
import Playlist from "../modules/playlist/pages/playlist/Playlist";
import Collection from "../modules/collection/Collection";
import { renderConfigs } from "../utils/router";
import rootRoutes from "./rootRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />

        {rootRoutes.map(config => {
          return renderConfigs(config);
        })}

        <Route path="genre">
          <Route path=":genreId" element={<Genre />} />
        </Route>
        <Route path="album">
          <Route path=":albumId" element={<Album />} />
        </Route>
        <Route path="collection">
          <Route path="tracks" element={<Playlist />} />
          <Route path=":type" element={<Collection />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;

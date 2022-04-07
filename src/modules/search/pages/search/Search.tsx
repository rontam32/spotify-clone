import { useContext, useEffect, useRef, useState } from "react";
import useHeader from "../../../../hooks/use-header";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { HeaderContext } from "../../../../contexts";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const prevSearchQuery = useRef('');
  const params = useParams();
  const { query } = params;
  const {setComponentData} = useContext(HeaderContext);

  const navigate = useNavigate();
  const queryCallBackFunction = (query: string) => {
    setSearchQuery(query);
  };

  useHeader("search", queryCallBackFunction);

  useEffect(() => {
    if (searchQuery) {
      prevSearchQuery.current = searchQuery;
      navigate(`/search/${searchQuery}`);
    } 
    else {
      if (prevSearchQuery.current) {
        navigate('/search');
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    setComponentData(query || '');
  }, [query])

  return (
    <>
      <Outlet />
    </>
  );
};

export default Search;

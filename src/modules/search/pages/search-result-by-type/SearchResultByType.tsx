import { useParams } from "react-router";
import TopPaddingContainer from "../../../../components/wrapper/top-padding-container/TopPaddingContainer";
import CategoryGrid from "../../../../components/containers/category-grid/CategoryGrid";
import { CategoryGridContents } from "../../../../models/Application";
import { useContext, useEffect, useState } from "react";
import {
  mutateSearchResultFn,
  TYPE_GET_DATA_TYPE_MAPPING,
} from "../../Search.constant";
import api from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
import { ScrollContext } from "../../../../contexts";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import ErrorFallback from "../../../../components/common/applications/error-fallback/ErrorFallback";

const SearchResultByType = () => {
  const params = useParams();
  const handleError = useErrorHandler();
  const { type = "", query } = params;
  const [searchResult, setSearchResult] = useState<CategoryGridContents[]>([]);
  const navigate = useNavigate();
  const { isScrolledToBottom } = useContext(ScrollContext);

  const getSearchListByType = async (type: string, offset: number = 0) => {
    try {
      const response = await api.get("/search", {
        limit: "50",
        type: TYPE_GET_DATA_TYPE_MAPPING[type],
        q: query,
        offset,
      });
      if (!offset) {
        setSearchResult(mutateSearchResultFn(response, navigate)[type]);
      } else {
        const updatedCategoryGrid = mutateSearchResultFn(response, navigate);
        setSearchResult((prevResult) => {
          const updatedResult = [...prevResult, ...updatedCategoryGrid[type]];
          return updatedResult;
        });
      }
    } catch (e: any) {
      handleError(e);
    }
  };

  useEffect(() => {
    if (type) {
      getSearchListByType(type);
    }
  }, [type]);

  useEffect(() => {
    if (isScrolledToBottom && type) {
      if (searchResult.length < 900) {
        getSearchListByType(type, searchResult.length + 1);
      }
    }
  }, [isScrolledToBottom]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TopPaddingContainer>
        <CategoryGrid
          title={`All ${type} for "${query}"`}
          seeAllLink=""
          contents={searchResult}
          isFullScreen={true}
        ></CategoryGrid>
      </TopPaddingContainer>
    </ErrorBoundary>
  );
};

export default SearchResultByType;

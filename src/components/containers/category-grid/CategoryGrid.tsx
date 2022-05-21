import classes from "./CategoryGrid.module.scss";
import { MediaGridContainer, AutoMediaGridContainer } from "./CategoryGrid.styles";
import CategoryGridCard from "../../cards/category-grid-card/CategoryGridCard";
import { CategoryGridContents, GenericProps } from "../../../models/Application";
import { Link } from "react-router-dom";
import { uniqueId } from 'lodash';

interface CategoryGridProps { reloadDocumentWhenSeeAll?: boolean; title: string; contents: CategoryGridContents[]; id?: number | string; isFullScreen?: boolean; seeAllLink: string; }
const CategoryGrid = ({
  contents = [],
  title,
  id,
  isFullScreen,
  seeAllLink,
  reloadDocumentWhenSeeAll = true
}: GenericProps<CategoryGridProps>) => {
  const GridContainer = isFullScreen ? AutoMediaGridContainer : MediaGridContainer;
  if (contents.length === 0) {
    return null;
  }
  return (
    <>
      <div className={classes["media-top-section"]}>
        <h2>{title}</h2>
        {id && seeAllLink && <Link className={classes['right-section']} to={seeAllLink} reloadDocument={reloadDocumentWhenSeeAll}>See All</Link>}
      </div>
      <GridContainer>
        {contents.map((content) => {
          const randomStr = uniqueId();
          return <CategoryGridCard key={`${content.id}_${randomStr}`} {...content} />;
        })}
      </GridContainer>
    </>
  );
};

export default CategoryGrid;

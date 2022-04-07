import CollectionButtonGroup from '../../common/collection-button-group/CollectionButtonGroup';
import TopBarSearchInput from '../../common/top-bar-search-input/TopBarSearchInput';

const headerElementMapping: {[key: string]: () => JSX.Element} = {
    search: () => {
        return <TopBarSearchInput />
    },
    default: () => {
        return <> </>
    },
    collection: () => {
        return <CollectionButtonGroup />;
    }
}

export default headerElementMapping;
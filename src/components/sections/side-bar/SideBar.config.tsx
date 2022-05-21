import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { MenuItem } from '../../../models/Application';

export const MENU_ITEMS_CONFIG: MenuItem[] = [
    {
        iconCmp: <HomeIcon />,
        itemText: 'Home',
        link: '/'
    },
    {
        iconCmp: <SearchIcon />,
        itemText: 'Search',
        link: '/search'
    },
    {
        iconCmp: <LibraryMusicIcon />,
        itemText: 'Your Library',
        link: '/collection/playlists',
        matchPattern: '/collection'
    },
    {
        iconCmp: <img style={{
            height: '24px',
            width: '24px'
        }} src={`${window.location.origin}/liked-song.png`}></img>,
        itemText: 'Liked Songs',
        link: '/collection/tracks'
    }
]

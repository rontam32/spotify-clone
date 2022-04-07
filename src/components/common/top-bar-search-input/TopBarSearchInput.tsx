import classes from './TopBarSearchInput.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { HeaderContext } from '../../../contexts';
import debounce from 'lodash/debounce';

const TopBarSearchInput = () => {
    const [searchValue, setSearchValue] = useState('');
    const textInput = useRef<HTMLInputElement>(null);
    const {forwardHeaderData, componentData: initialQuery} = useContext(HeaderContext);
    const debounceForwardData = useMemo(() => debounce((value: string) => {
        forwardHeaderData(value);
    }, 1000), []);
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    useEffect(()=> {
        if (textInput.current) {
            textInput.current.value = initialQuery || '';            
        }

    }, [initialQuery]);

    useEffect(() => {
        debounceForwardData(searchValue);
        return () => {
            debounceForwardData.cancel();
        };
    }, [searchValue]);

    return <div className={classes['input-container']}>
        <label>
            <SearchIcon className={classes['search-icon']} style={{ fontSize: 30 }}/>
        </label>
        <input ref={textInput} placeholder="Artists, songs, or podcasts" maxLength={800} autoCorrect="off" onChange={inputChangeHandler}/>
    </div>
}

export default TopBarSearchInput;
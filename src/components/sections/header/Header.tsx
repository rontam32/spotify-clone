import React, { useContext } from "react";
import UserProfileButton from './user-profile-button/UserProfileButton';
import classes from './Header.module.scss';
import { HeaderContext } from "../../../contexts";
import headerElementMapping from './Header.config';
import { GenericProps } from "../../../models/Application";

const Header = (props: GenericProps<{opacity: number}>) => {
    const { currentPath } = useContext(HeaderContext);
    const Header = headerElementMapping[currentPath] ? headerElementMapping[currentPath] : headerElementMapping.default;

    return (
        <div className={classes.header}>
            <div className={`p-3 ${classes['inner-header']}`}>
                <div className={classes.bg} style={{opacity: props.opacity}}></div>
                <div className={classes['header-section-left']}>
                    <Header />
                </div>
                <UserProfileButton/>
            </div>
        </div>
    );
}

export default React.memo(Header);
import React from 'react';
import {NavLink} from "react-router-dom";
import styles from'./HeaderNav.module.scss'

const HeaderNav = () => (
    <nav>
        <ul className={styles.wrapper}>
            <li className={styles.navItem}><NavLink exact  activeClassName={styles.navItemLinkActive} className={styles.navItemLink} to="/">start</NavLink></li>
            <li className={styles.navItem}><NavLink   activeClassName={styles.navItemLinkActive} className={styles.navItemLink} to="/edit">edytuj</NavLink></li>
            <li className={styles.navItem}><NavLink   activeClassName={styles.navItemLinkActive} className={styles.navItemLink} to="/add">dodaj</NavLink></li>
            <li className={styles.navItem}><NavLink   activeClassName={styles.navItemLinkActive} className={styles.navItemLink} to="/list">lista</NavLink></li>
            <li className={styles.navItem}><NavLink   activeClassName={styles.navItemLinkActive} className={styles.navItemLink} to="/settings">ustawienia</NavLink></li>
        </ul>
    </nav>
);

export default HeaderNav;
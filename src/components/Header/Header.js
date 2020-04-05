import React from 'react';
import logo from '../../asstets/img/logo.svg';
import HeaderNav from './HeaderNav';
import styles from './Header.module.scss'

const Header = () => (
    <header className={styles.wrapper}>
        <img src={logo} alt="Logo"/>
        <HeaderNav/>
    </header>
);

export default Header;


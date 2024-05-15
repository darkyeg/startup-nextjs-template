'use client';

import type { FC } from 'react';

import styles from './index.module.css';

export interface NavbarProps {}

const Navbar: FC = () => {
  return <nav className={styles.navbar}></nav>;
};

export default Navbar;

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './AnotherStyles.module.scss';
// import './App.scss';
import imgPng from '@/assets/JavaScript-logo.png';
import imgJpg from '@/assets/1.jpg';
import SVGIcon from '@/assets/board.svg';

export const App = () => {
  return (
    // data-testismoil will be removed for prod with our custom babel plugin
    <div data-testismoil="test">
      <div>
        <h2>Admin App.tsx</h2>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

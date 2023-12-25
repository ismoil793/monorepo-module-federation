import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './AnotherStyles.module.scss';
// import './App.scss';
import imgPng from '@/assets/JavaScript-logo.png';
import imgJpg from '@/assets/1.jpg';
import SVGIcon from '@/assets/board.svg';
import {adminRoutes} from '@packages/shared/src/routes/admin'
import {shopRoutes} from '@packages/shared/src/routes/shop'

export const App = () => {
  return (
    // data-testismoil will be removed for prod with our custom babel plugin
    <div data-testismoil="test">
      <div>
        <img width={100} src={imgPng} alt="img png" />
        <img width={100} src={imgJpg} alt="img jpg" />
        <SVGIcon width={100} height={100} color="red" />

      <div>
          <p>
              <strong>__ISMOIL_GLOBAL__:</strong> {__ISMOIL_GLOBAL__}
          </p>
      </div>
      </div>

      <div className={styles.blue}>
        App
        <div>
          <div>
            <Link to="/">home</Link>
          </div>
          <br/>
          <div>
            <Link to={adminRoutes.admin}>admin</Link>
          </div>
          <div>
            <Link to={adminRoutes.adminMain}>admin/main</Link>
          </div>
          <div>
            <Link to={adminRoutes.adminInsideMain}>admin/main/inside-main</Link>
          </div>
          <br/>
          <div>
            <Link to={shopRoutes.shop}>shop</Link>
          </div>
          <div>
            <Link to={shopRoutes.shopMain}>shop/main</Link>
          </div>
          <div>
            <Link to={shopRoutes.shopInsideMain}>shop/main/inside-main</Link>
          </div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

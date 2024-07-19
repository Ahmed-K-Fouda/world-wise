import style from "./Sidebar.module.css";
import AppNav from "./../app-nav/AppNav";
import Logo from "./../logo/Logo";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer>
        <p className={style.copyright}>
          <span>&copy; Copyright {new Date().getFullYear()}</span>
          <span>Designed By A.Fouda with help (Jonas.S)</span>
        </p>
      </Footer>
    </div>
  );
}

export default Sidebar;

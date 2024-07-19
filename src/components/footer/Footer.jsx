import style from "./Footer.module.css";

// eslint-disable-next-line react/prop-types
function Footer({ children }) {
  return <footer className={style.footer}>{children}</footer>;
}

export default Footer;

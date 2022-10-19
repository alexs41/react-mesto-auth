import { Link, NavLink } from "react-router-dom";

export default function Header(props) {
    const { linkName, linkPath, onLogout, children} = props;
    return (
        <header className="header">
            <div className="header__logo"></div>
            {children}
        </header>
    );
  }
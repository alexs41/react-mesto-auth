import { Link, NavLink } from "react-router-dom";

export default function Header(props) {
    const { linkName, linkPath} = props;
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__link"><Link to={linkPath} className="link" style={{ textDecoration: 'none' }}>{linkName}</Link></div>
        </header>
    );
  }
export default function Header(props) {
    const { children} = props;
    return (
        <header className="header">
            <div className="header__logo"></div>
            {children}
        </header>
    );
  }
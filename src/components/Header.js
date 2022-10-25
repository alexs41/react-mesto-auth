export default function Header(props) {
    const { children, childrenPreheader } = props;
    return (
        <>
            {childrenPreheader}
            <header className="header">
                <div className="header__logo"></div>
                {children}
            </header>
        </>
    );
  }
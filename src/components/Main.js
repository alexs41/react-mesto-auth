export default function Main(props) {
    
    return (
        <main className="content">
            <section className="profile">
                <div className="profile-info">
                    <div className="profile-info__avatar" onClick={() => props.onEditAvatar()}>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-text-info">
                            <h3 className="profile-text-info__full-name">Жак Ив Кусто</h3>
                            <p className="profile-text-info__description">Исследователь Океана</p>
                        </div>
                        <button className="profile-info-container__edit-button" type="button" onClick={() => props.onEditProfile()}></button>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={() => props.onAddPlace()}></button>
            </section>
            <section className="elements"></section>
        </main>
    );
  }



export default function Card(props) {
    const { card,  cardClickCallback } = props;
    function handleClick() {
        cardClickCallback(card);
      }
    return (
        <div className="element" id={card.id}>
            
            <img src={card.link} alt={card.name} className="element__image" onClick={() => handleClick()}/>
            <h4 className="element__header">{card.name}</h4>
            <div className="like-container">
                <button className="like-container__like-button" type="button"></button> 
                <p className="like-container__like-count">{card.likes.length}</p>
            </div>
            <button className="element__trash-button" type="button"></button>
        </div>
    );
  }
    
import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ListCard from "./card";
const List = ({ listData,updateList }) => {
  const [newCardHandle, updateNewCardHandle] = useState(false);
  const [newCardData, updateNewCardData] = useState("");
  const [underDragDetails,updateDragDetails]=useState(null);
    const [cards, setCards] = React.useState(
    localStorage.getItem("cards")
      ? JSON.parse(localStorage.getItem("cards"))
      : []
  );

  const addNewCard = (lid, cardData) => {
    let oldCards = [...cards];
    oldCards.push({
      lid: lid,
      id: uuidv4(),
      data: cardData,
    });
    setCards(oldCards);
    localStorage.setItem("cards", JSON.stringify(oldCards));
  };


const getDragCardDetails=(obj)=>{
    updateDragDetails({...obj});
}


  const updateCard = (cardObj) => {
    let oldCards = [...cards];
    let cardIndex = cards.findIndex((card) => card.id == cardObj.id);
    oldCards[cardIndex] = cardObj;
    setCards(oldCards);
    localStorage.setItem("cards", JSON.stringify(oldCards));
  };

  return (
    <div key={listData.id} style={{padding:'2rem',border:'1px solid black',borderRadius:'5px'}} 
    onDrop={(e)=>{
        let data = e.dataTransfer.getData("text");
        let oldCards = [...cards];
        let cardIndex = cards.findIndex((card) => card.id == data);
        oldCards[cardIndex].lid=listData.id;
        setCards(oldCards);
        localStorage.setItem("cards", JSON.stringify(oldCards));
        updateList();
        }} 


        onDragOver={e=>{e.preventDefault()}}
        
        >
      <h5> {listData.title}</h5>
      {cards
        .filter((card) => card.lid == listData.id)
        .map((card, index) => {
          return (
            <ListCard key={card.id} cardData={card} updateCard={updateCard} getDragCardDetails={getDragCardDetails} />
          );
        })}
      {!newCardHandle ? (
        <button
          onClick={() => {
            updateNewCardHandle(!newCardHandle);
          }}
        >
          {" "}
        +  Add New Card
        </button>
      ) : (
        <Fragment>
          <input
            onChange={(e) => {
              updateNewCardData(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              updateNewCardHandle(!newCardHandle);
              addNewCard(listData.id, newCardData);
            }}
          >
            Confirm Card
          </button>
        </Fragment>
      )}
    </div>
  );
};
export default List;

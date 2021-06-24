import React, { Fragment, useState } from "react";

const ListCard = ({ cardData, updateCard,getDragCardDetails }) => {
  const [localCardText, setLocalCardText] = useState(cardData.data || "");
  const [editable, setEditable] = useState(false);

  const updateCardText = () => {
    updateCard({
      ...cardData,
      data: localCardText,
    });
    setEditable(!editable);
  };


  return (
    <Fragment>
      {editable ? (
        <div style={{display:"flex", flexDirection:'column'}}>
          {" "}
          <input
            key={cardData.id}
            onChange={(e) => {
              setLocalCardText(e.target.value);
            }}
            value={localCardText}
          />
          <button onClick={updateCardText} style={{background:'green' ,padding:"0.1rem"}}>Add</button>
        </div>
      ) : (
        <div
        draggable={true}
        key={cardData.id}
        onDragStart={e=>  e.dataTransfer.setData("text",cardData.id)}

          style={{ borderRadius: "3px", border: "1px dotted grey" }}
          onClick={() => {
            setEditable(!editable);
          }}
        >
          <p>{localCardText}</p>
        </div>
      )}
    </Fragment>
  );
};

export default ListCard;

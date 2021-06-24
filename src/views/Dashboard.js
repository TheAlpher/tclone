import React, { useState, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { Row, Col } from "reactstrap";
import List from "../components/list";
const Dashboard = () => {
  const addNewList = () => {
    let newList = [
      ...lists,
      {
        title: newlistVal,
        id: uuidv4(),
      },
    ];
    setLists(newList);
    localStorage.setItem("tlist", JSON.stringify(newList));
    updateNewlistVal("");
  };

  const [lists, setLists] = React.useState(
    JSON.parse(localStorage.getItem("tlist")) || []
  );

const refreshList=()=>{
setLists([...lists]);
}



  const [addHandle, updateAddHandle] = React.useState(false);
  const [newlistVal, updateNewlistVal] = React.useState("");
  return (
    <Fragment>
      {!addHandle ? (
        <button
          onClick={() => {
            updateAddHandle(!addHandle);
          }}
        >
          Add New List
        </button>
      ) : (
        <div className="add-new-container">
          <input
            onChange={(e) => {
              updateNewlistVal(e.target.value);
            }}
            value={newlistVal}
          />
          <button onClick={addNewList}>Confirm List</button>
        </div>
      )}
      <div style={{ display: "flex" }}>
        {lists.map((list, index) => {
          return <List key={list.id} listData={list} updateList={refreshList} />;
        })}
      </div>
    </Fragment>
  );
};

export default Dashboard;

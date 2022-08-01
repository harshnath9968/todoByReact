import React, { useEffect, useState } from "react";
import "./style.css";

// create local storage

const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem,setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  // add items 
  const addItem = () => {
    if (!inputData) {
      alert("plz add");
    }else if(inputData && toggleButton){
      setItems(
        items.map((curElem) =>{
          if(curElem.id === isEditItem){
            return {...curElem , name: inputData}
          }
          return curElem;
        })
      );
      setInputData("");
    setIsEditItem(null);
    setToggleButton(false);
    } 
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // edit  the items 
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem)=>{
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  }


  // delete items
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };
  //remove All elem
  const removeAll = () => {
    setItems([]);
  };

  // add Local Storages

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  });

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todoLogo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          +
          <div className="addItems">
            <input
              type="text"
              placeholder="✍Add Items"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ?(
            <i className="far fa-edit" aria-hidden="true" onClick={addItem}></i>
            ) :(
            <i className="fa fa-plus" aria-hidden="true" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit" 
                    aria-hidden="true"
                    onClick={() =>editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt"
                      aria-hidden="true"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;

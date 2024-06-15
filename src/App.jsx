import React, { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("todos");
    return savedItems
      ? JSON.parse(savedItems)
      : [
          { text: "Learn React", isChecked: false },
          { text: "Build a To-Do App", isChecked: false },
        ];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem(e) {
    e.preventDefault();
    if (inputText.trim() === "") {
      alert("Please enter a task!");
      return;
    }
    setItems((prevItems) => {
      return [{ text: inputText, isChecked: false }, ...prevItems];
    });
    setInputText("");
  }

  function deleteItem(index) {
    setItems((prev) => prev.filter((item, idx) => idx !== index));
  }
  function handleCheck(index) {
    setItems((prev) =>
      prev.map((item, idx) =>
        index === idx ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <form onSubmit={addItem} className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button type="submit">
          <span>Add</span>
        </button>
      </form>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <li key={index} className={todoItem.isChecked ? "bg-gray" : ""}>
              <article>
                <b onClick={() => handleCheck(index)}>
                  {todoItem.isChecked ? "✅" : "⭕"}
                </b>
                {todoItem.text}
              </article>
              <span onClick={() => deleteItem(index)}>x</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

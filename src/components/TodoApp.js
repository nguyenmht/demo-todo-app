import "./TodoApp.css"
import { useState, useCallback, useEffect } from "react";
import TodoList from "./TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP"

function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList))
  }, [todoList])

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      setTodoList([
        { id: v4(), name: textInput, isCompleted: false },
        ...todoList,
      ]);
      setTextInput("");
    },
    [textInput, todoList]
  );

  const onEnterKey = useCallback(
    (e) => {
      if (textInput === "") {
        return;
      }
      if (e.key === 'Enter') {
        setTodoList([
          { id: v4(), name: textInput, isCompleted: false },
          ...todoList,
        ]);

        setTextInput("");
      }
    }, [textInput, todoList]
  )

  const onCheckBtnClick = useCallback((id) => {
    setTodoList(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }, []);

  const editTodo = useCallback((id, newValue) => {
    if (newValue === "") {
      return;
    }
    setTodoList(prevState =>
      prevState.map(todo =>
        (todo.id === id ? { ...todo, name: newValue } : todo)
      )
    );
  }, []);

  const onCrossBtnClick = useCallback((id) => {
    setTodoList(prevState =>
      prevState.filter(todo => todo.id !== id)
    );
  }, []);

  return (
    <div className="BodyApp">
      <div className="Header">
        <h2>My TodoList</h2>
      </div>
      <div className="add-field">
        <Textfield
          name="add-todo"
          placeholder="Enter your task..."
          elemAfterInput={
            <Button
              isDisabled={!textInput}
              appearance="primary"
              onClick={onAddBtnClick}>
              Add
            </Button>
          }
          onKeyDown={onEnterKey}
          value={textInput}
          onChange={onTextInputChange}
        ></Textfield>
      </div>
      <div className="todo-list">
        <TodoList
          todoList={todoList}
          onCheckBtnClick={onCheckBtnClick}
          editTodo={editTodo}
          onCrossBtnClick={onCrossBtnClick}
        />
      </div>
    </div>
  )
}

export default TodoApp;
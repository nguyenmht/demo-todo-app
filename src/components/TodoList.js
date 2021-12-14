import React from 'react'
import Todo from './Todo'

export default function TodoList({ todoList, onCheckBtnClick, editTodo, onCrossBtnClick }) {
    return (
        <>
            {
                todoList.map(todo =>
                    <Todo
                        key={todo.id}
                        todo={todo}
                        onCheckBtnClick={onCheckBtnClick}
                        editTodo={editTodo}
                        onCrossBtnClick={onCrossBtnClick}
                    />)
            }
        </>
    );
} 

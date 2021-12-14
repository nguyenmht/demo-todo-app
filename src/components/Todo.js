import "./Todo.css";
import React, { useState, useCallback } from 'react';
import styled, { css } from "styled-components";
import Button from '@atlaskit/button';
import Textfield from "@atlaskit/textfield";
import CheckIcon from "@atlaskit/icon/glyph/check"
import CheckBoxIcon from "@atlaskit/icon/glyph/media-services/rectangle"
import CrossIcon from "@atlaskit/icon/glyph/cross"

const TodoName = styled(Button)`
    margin-top: 5px;
    text-align: left;
    position: relative;
    
    span {
        margin-top: auto;
        margin-bottom: auto;
    }

    &,&:hover{
        ${(p) =>
        p.isCompleted &&
        css`
            text-decoration: line-through;
            `
    }

    .func-icon span {
        &:hover {
            background-color: #e2e2e2;
            border-radius: 3px;
        }
    }

    .checkbox-icon{
        ${(p) =>
        p.isCompleted &&
        css`
            display: none;
            `
    }
    }

    .check-icon{
        ${(p) =>
        !p.isCompleted &&
        css`
            display: none;
            `
    }
    }
`;

export default function Todo({ todo, onCheckBtnClick, editTodo, onCrossBtnClick }) {
    const [textInput, setTextInput] = useState("");

    const onTextInputChange = useCallback((e) => {
        setTextInput(e.target.value);
    }, []);

    const onEditBtnClick = (e) => {
        editTodo(todo.id, textInput);
        setTextInput("");
    };

    const onEnterKey =
        (e) => {
            if (e.key === 'Enter') {
                editTodo(todo.id, textInput);
                setTextInput("");
            }
        }

    return (
        <TodoName
            shouldFitContainer
            isCompleted={todo.isCompleted}
            iconBefore={
                <div className='func-icon'>
                    <span className='check-icon' onClick={() => onCheckBtnClick(todo.id)}>
                        <CheckIcon primaryColor="#33adff" />
                    </ span>
                    <span className='checkbox-icon' onClick={() => onCheckBtnClick(todo.id)}>
                        <CheckBoxIcon primaryColor="#33adff" />
                    </ span>
                </div>
            }
            iconAfter={
                <div className='func-icon'>
                    <span className='cross-icon' onClick={() => onCrossBtnClick(todo.id)}>
                        <CrossIcon primaryColor="#33adff" />
                    </span>
                </div>
            }
        >
            <Textfield
                id="text-field-edit"
                name="update-todo"
                placeholder={todo.name}
                elemAfterInput={
                    <Button
                        className='edit-icon'
                        isDisabled={!textInput}
                        appearance="primary"
                        onClick={() => onEditBtnClick()}
                    >
                        Update
                    </Button>
                }
                onKeyDown={onEnterKey}
                value={textInput}
                onChange={onTextInputChange}
            ></Textfield>
        </TodoName>
    )
}

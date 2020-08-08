import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import TodoListViewModel from '../viewmodels/TodoListViewModel';

type TodoListProps = {
    viewModel: TodoListViewModel
}

export default observer(
    ({viewModel} : TodoListProps) => {

        let [newItemText, setNewItemText] = useState('');

        useEffect(() => {
            viewModel.fetchTodoItems();
        }, []);

        function onInputChanged(e: React.FormEvent<HTMLInputElement>) {
            setNewItemText(e.currentTarget.value)
        }

        function onAddClicked() {
            viewModel.addTodoItem(newItemText)
                .then(() => setNewItemText(''));
        }

        return (
            <div>
                <h1>Todo Items: {viewModel.todosCount}</h1>
                <ol>
                    {viewModel.todoItems?.map(item => <li key={item.id}>{item.content}</li>)}
                </ol>
                <div>
                    <input type="text" value={newItemText} onChange={onInputChanged}/>
                    {viewModel.isAwaiting
                        ? <span>Loading...</span> 
                        : <button onClick={onAddClicked}>Add</button>}
                    {viewModel.didRequestFail
                        ? <span>{viewModel.failReason}</span> 
                        : null}
                </div>
            </div>
        );
    }
);
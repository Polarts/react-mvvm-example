import React, { useState } from 'react';
import { observer } from 'mobx-react';
import TodoItemViewModel from '../viewmodels/TodoItemViewModel';

type TodoItemProps = {
    viewModel: TodoItemViewModel
}

export default observer(
    ({viewModel} : TodoItemProps) => {
        
        const [isEditing, setIsEditing] = useState(false);
        const [content, setContent] = useState(viewModel.content);

        function onCheckboxChanged(e: React.FormEvent<HTMLInputElement>) {
            viewModel.setIsDone(e.currentTarget.checked);
        }

        function onInputChanged(e: React.FormEvent<HTMLInputElement>) {
            setContent(e.currentTarget.value);
        }

        function onInputKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
            if (e.key === 'Enter') {
                viewModel.updateContent(content);
                setIsEditing(false);
            }
        }

        return (
            <li>
                {viewModel.isAwaiting
                    ? null
                    : <input type="checkbox" checked={viewModel.isDone} onChange={onCheckboxChanged}/>}
                {viewModel.isAwaiting
                    ? <span>Loading...</span>
                    : isEditing
                        ? <input onChange={onInputChanged} onKeyUp={onInputKeyUp} value={content}/>
                        : <span onClick={() => setIsEditing(true)}>{content}</span>}
            </li>
        );
    }
);
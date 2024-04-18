import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Task = ({ task, setTasks, onDelete, onComplete, setIsEditing, isEditing }) => {
    const [editedText, setEditedText] = useState(task.text);

    const handleTaskEdit = () => {
        setTasks(prevTasks => prevTasks.map(prevTask => {
            if (prevTask.id === task.id) {
                return {...prevTask, text: editedText };
            }
            return prevTask;
        }));
    };

    const handleEditStart = () => {
        setIsEditing(task.id); // Pass task id to indicate editing
        setEditedText(task.text);
    };

    const handleEditEnd = () => {
        setIsEditing(null); // Clear the editing state in the parent component
        handleTaskEdit();
    };
    
    return (
        <div>
            {task.id === isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={handleEditEnd}
                    autoFocus
                />
            ) : (
                <div>
                    {/* {task.text} - {task.type} - {task.priority} */}
                    <input type="checkbox" onClick={() => onComplete(task.id)} />
                    <ModeEditIcon onClick={handleEditStart} />
                    <DeleteIcon onClick={() => onDelete(task.id)} />
                </div>
            )}
        </div>
    );
}

export default Task;

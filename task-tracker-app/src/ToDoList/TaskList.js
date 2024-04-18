import React from 'react'
import Task from './Task'

const TaskList = ({ tasks, setTasks, setIsEditing, onEditStart, onDelete, onComplete, isEditing }) => {
  return (
    <div>{tasks.map(task => (
        <Task
            key={task.id}
            task={task}
            isEditing={isEditing}
            setTasks={setTasks}
            setIsEditing={setIsEditing}
            onEditStart={onEditStart}
            onDelete={onDelete}
            onComplete={onComplete}
        />
    ))}</div>
  )
}

export default TaskList;
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import classes from './AddTaskModal.module.css';

const AddTaskModal = ({ openModal, setOpenModal, inputValue, handleInputChange, taskType, handleTaskTypeChange, taskPriority, handleTaskPriorityChange, handleAddTask }) => {
  return (
    <div>
      <Dialog className={classes.modal} open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle className={classes.modalTitle}>Add Task</DialogTitle>
        <DialogContent className={classes.modalContent}>
          <TextField className={classes.selectInput} autoFocus margin='dense' label='Task Name' type='text' fullWidth value={inputValue} onChange={handleInputChange} />
          <FormControl fullWidth>
            <InputLabel id='task-type-label'>Task Type</InputLabel>
            <Select className={classes.selectInput} labelId='task-type-label' value={taskType} onChange={handleTaskTypeChange}>
              <MenuItem value='work'>Work</MenuItem>
              <MenuItem value='home'>Home</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel className={classes.taskLabel}>Task Priority</InputLabel>
            <Select className={classes.selectInput} value={taskPriority} onChange={handleTaskPriorityChange}>
              <MenuItem value='high'>High</MenuItem>
              <MenuItem value='medium'>Medium</MenuItem>
              <MenuItem value='low'>Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.modalActions}>
          <Button className={classes.cancel} onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button className={classes.addTaskButton} onClick={handleAddTask} variant='contained' color='primary'>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTaskModal;

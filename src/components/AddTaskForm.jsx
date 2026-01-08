import Field from "./Field";
import Button from "./Button";
import {useContext, useState} from "react";
import {TasksContext, } from "../context/TasksContext";

const AddTaskForm = () => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef
  } = useContext(TasksContext);

  const [error, setError] = useState('');

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle)
    }

  }
  return (
    <>
      <form className="todo__form" onSubmit={onSubmit}>

        <Field
        className="todo__field"
        label="New task title"
        id="new-task"
        value={newTaskTitle}
        error={error}
        onInput={(event)=> setNewTaskTitle(event.target.value)}
          ref={newTaskInputRef}
        />
        <Button
          type="submit"
          isDisabled={isNewTaskTitleEmpty}
        >Add
        </Button>

      </form>
    </>
  )
}

export default AddTaskForm
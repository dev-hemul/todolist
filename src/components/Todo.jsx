import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import {useState} from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([
    {id: 'task-1', title: 'Купить молоко', isDone: false},
    {id: 'task-2', title: 'Погладить кота', isDone: true},
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const deleteAllTasks = () => {
    const isConfirmed = confirm('Are you sure you want to delete all tasks?');
    if (isConfirmed) {
      setTasks([]);
    }
  }

  const deleteTask = (tasksId) => {
    setTasks(
      tasks.filter((tasks => tasks.id !== tasksId))
    )
  }

  const toggleTaskComplete = (tasksId, isDone) => {
    setTasks(
      tasks.map((tasks) => {
        if (tasks.id === tasksId) {
          return {...tasks, isDone}
        }
        return tasks
      })
    )
  }

  const filterTasks = (query) => {
    console.log(`'Поиск: ' ${query}`)
  }

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  }
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm
      onSearchInput={filterTasks}
      />
      <TodoInfo
      total={tasks.length}
      done={tasks.filter(({isDone}) => isDone).length}
      onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  )
}

export default Todo
import {useState, useCallback, useEffect, useMemo, useRef} from 'react';
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
  useTasksLocalStorage();
  const {
    savedTasks,
    saveTasks
  } = useTasksLocalStorage();


  const [tasks, setTasks] = useState(savedTasks ?? [
    {id: 'task-1', title: 'Купить молоко', isDone: false},
    {id: 'task-2', title: 'Погладить кота', isDone: true}
  ])


  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all tasks?');
    if (isConfirmed) {
      setTasks([]);
    }
  }, [])

  const deleteTask = useCallback((tasksId) => {
    setTasks(
      tasks.filter((tasks => tasks.id !== tasksId))
    )
  }, [tasks])

  const toggleTaskComplete = useCallback((tasksId, isDone) => {
    setTasks(
      tasks.map((tasks) => {
        if (tasks.id === tasksId) {
          return {...tasks, isDone}
        }
        return tasks
      })
    )
  }, [tasks])

  const addTask = useCallback((title) => {
    const newTask = {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      isDone: false
    }

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle('');
    setSearchQuery('');
    newTaskInputRef.current.focus();

  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    saveTasks(tasks);
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, [])

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
  }, [searchQuery, tasks])

  return {
    tasks,
    filteredTasks,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    deleteTask,
    toggleTaskComplete,
    deleteAllTasks
  }
}

export default useTasks
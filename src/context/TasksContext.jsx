import {createContext, useCallback, useEffect, useMemo, useRef, useState} from 'react';

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const {children} = props;

    const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      {id: 'task-1', title: 'Купить молоко', isDone: false},
      {id: 'task-2', title: 'Погладить кота', isDone: true}
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find(({isDone}) => !isDone)?.id;

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

  const addTask = useCallback(() => {

    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false
      }

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle('');
      setSearchQuery('');
      newTaskInputRef.current.focus();
    }
  }, [newTaskTitle])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, [])

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
  }, [searchQuery, tasks])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,

        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask
      }}>
      {children}
    </TasksContext.Provider>
  )
}
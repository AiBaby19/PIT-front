import React, { useState, useEffect } from 'react';
import {
  fetchTasks,
  deleteTask,
  addTask,
  fetchTask,
  updateTask,
  registerUser,
  loginUser,
} from './helpers/helper';

import { Table } from './components/Table';
import { Form } from './components/Form';
import { UserForm } from './components/UserForm';
import { Task } from './models/Task';
import { User } from './models/User';
import { initialTask } from './helpers/initialTask';

import './App.css';

const App = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [task, setTask] = useState<Task>(initialTask);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [userId, setUserId] = useState<any>(localStorage.getItem('userId'));

  // const checkLoggedIn = () => {
  //   return localStorage.getItem('token') && localStorage.getItem('userId');
  // };
  // const [isLoggedIn, setIsLoggedIn] = useState<any>(() => checkLoggedIn());

  useEffect(() => {
    getTasks();
    setTasks([]);
    // setUserId('');
  }, [userId]);

  const getTasks = async (): Promise<Task[] | void> => {
    if (!userId) return;
    console.log(userId)
    const tasks: Task[] = await fetchTasks(userId);
    setTasks(tasks);
  };

  const submitTask = async (task: Task): Promise<string | void> => {
    task.userId = userId;
    const res: string = await addTask(task);

    handleResponse(res);
  };

  const eraseTask = async (id: number): Promise<string | void> => {
    const res: string = await deleteTask(id);
    handleResponse(res);
  };

  const getTask = async (id: number): Promise<Task | void> => {
    const task: Task = await fetchTask(id);
    setTask(task);
  };

  const submitEditTask = async (task: Task): Promise<void> => {
    const res: string = await updateTask(task);
    handleResponse(res);
  };

  const writeNewTask = (): void => {
    setToggleForm(!toggleForm);
    setTask(initialTask);
  };

  const login = async (user: User): Promise<string | void> => {
    const res: string = await loginUser(user);
    handleUserResponse(res);
  };

  const logout = () => {
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // setIsLoggedIn(false);
  };

  const register = async (user: User): Promise<string | void> => {
    const res: string = await registerUser(user);
    handleUserResponse(res);
  };

  const handleUserResponse = (res: any) => {
    if (res.success) {
      localStorage.setItem('token', res.success.token);
      localStorage.setItem('userId', res.success.userId);
      // setIsLoggedIn(true);
      setUserId(res.success.userId);
    } else {
      alert(res.failed);
    }
  };

  const handleResponse = (res: string): void => {
    if (res === 'success') {
      getTasks();
      setTask(initialTask);
    } else {
      alert(res);
    }
  };

  return (
    <div className='m-0 p-0 rtl'>
      <img id='img-header' src='./images/header.png' alt='header' />
      {!userId ? (
        <UserForm login={login} register={register} />
      ) : (
        <div id='wrapper'>
          <div className='logout' onClick={logout}>
            Logout
          </div>
          <h4 className='primary-color text-right'>ניהול משימות</h4>
          <input className='search' placeholder='חיפוש משימה...' type='text' />
          <div className='d-flex justify-content-between'>
            <p className='client-list'>
              רשימת הלקוחות שלך <span>({tasks.length})</span>
            </p>
            <button onClick={() => writeNewTask()} className='primary-btn'>
              משרה חדשה
            </button>
          </div>
          {toggleForm || task.name ? (
            <Form
              task={task}
              submit={submitTask}
              submitEditTask={submitEditTask}
            />
          ) : (
            ''
          )}
          <Table tasks={tasks} deleteTask={eraseTask} edit={getTask}></Table>
        </div>
      )}
    </div>
  );
};

export default App;

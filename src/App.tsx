import React, { useState, useEffect } from 'react';
import {
  fetchTasks,
  deleteTask,
  addTask,
  fetchTask,
  updateTask,
  registerUser
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

  const [user, setUser] = useState<User>();
  // {email: 'ss', password: '12'}
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async (): Promise<Task[] | void> => {
    const tasks: Task[] = await fetchTasks();
    setTasks(tasks);
  };

  const submitTask = async (task: Task): Promise<string | void> => {
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

  const login = (user: User): void => {
    console.log(user);
  };

  const register = async (user: User): Promise<string | void> => {
    const res: string = await registerUser(user);
    console.log(res)
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
      {!user ? (
        <UserForm login={login} register={register} />
      ) : (
        <div id='wrapper'>
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

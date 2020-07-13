import React, { useState, useEffect } from 'react';
import {
  fetchTasks,
  deleteTask,
  addTask,
  fetchTask,
  updateTask,
} from './helpers/helper';

import { Table } from './components/Table';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { Task } from './models/Task';

import './App.css';

function App() {
  const initialTask: Task = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    date: '',
  };

  const [toggleForm, setToggleForm] = useState(false);
  const [task, setTask] = useState<Task>(initialTask);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async (): Promise<Task[] | void> => {
    const tasks: Task[] = await fetchTasks();
    setTasks(tasks);
  };

  const submitTask = async (task: Task): Promise<string | void> => {
    console.log('res')
    const res: string = await addTask(task);
    
    handleResponse(res);
  };

  const eraseTask = async (id: number): Promise<string | void> => {
    const res = await deleteTask(id);
    handleResponse(res);
  };

  const getTask = async (id: number): Promise<Task | void> => {
    const task = await fetchTask(id);
    setTask(task);
  };

  const submitEditTask = async (task: Task) => {
      console.log('here')
    const res = await updateTask(task);
    handleResponse(res);
  };

  const writeNewTask = () => {
    setToggleForm(!toggleForm);
    setTask(initialTask);
  };

  const handleResponse = (res: string) => {
    if (res === 'success') {
      getTasks();
      setTask(initialTask);
    } else {
      alert(res);
    }
  };

  return (
    <div>
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
        <Table
          tasks={tasks}
          deleteTask={eraseTask}
          edit={getTask}
          watch={getTask}></Table>
      </div>
    </div>
  );
}

export default App;

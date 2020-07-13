import React, { useState } from 'react';
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

  const data: Task[] = [];

  const API_URL = `http://localhost:8000/api`;
  const deleteTask = async (id: number = 1) => {
    console.log(id);
    // await itemDelete(getURL(type), id);
    // itemDelete('items', id);
  };

  const getTask = async (id: number = 1) => {
    console.log('edit');
    // TEMP UNTIL SERVER SERVER
    setTask(data[id]);
  };

  const submitTask = (item: any) => {
    console.log('submit', item);
    // itemSubmit('items', item);
  };

  const submitEditItem = (item: any) => {
    // itemEditSubmit('items', item);
  };

  const writeNewTask = () => {
    setToggleForm(!toggleForm);
    setTask(initialTask);
  };

  const makeData = () => {
    for (let i = 0; i < 11; i++) {
      const row = {
        id: i,
        name: 'שם משתמש',
        phone: '052141232',
        email: 'some@email.com',
        date: '14/7/2020',
      };
      data.push(row);
      // console.log(row)
    }
  };
  makeData();

  return (
    <div>
      <div id='wrapper'>
        <h4 className='primary-color text-right'>ניהול משימות</h4>
        <input className='search' placeholder='חיפוש משימה...' type='text' />
        <div className='d-flex justify-content-between'>
          <p className='client-list'>
            רשימת הלקוחות שלך <span>({data.length})</span>
          </p>
          <button onClick={() => writeNewTask()} className='primary-btn'>
            משרה חדשה
          </button>
        </div>
        {toggleForm || task.name ? (
          <Form task={task} submit={submitTask} />
        ) : (
          ''
        )}
        <Table
          data={data}
          delete={deleteTask}
          edit={getTask}
          watch={getTask}></Table>
      </div>
    </div>
  );
}

export default App;

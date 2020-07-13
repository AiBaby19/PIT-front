import React, {useState} from 'react';
import { Table } from './components/Table';
import { Form } from './components/Form';
import { Header } from './components/Header';
import './App.css';

function App() {
  const [toggleForm, setToggleForm] = useState(false)
  
  const API_URL = `http://localhost:8000/api`;
  const deleteItem = async (id: number = 1) => {
    console.log(id);
    // await itemDelete(getURL(type), id);
    // itemDelete('items', id);
  };

  const getItem = async (id: number = 1) => {
    console.log(id);
  };

  const submitItem = (item: any) => {
    // itemSubmit('items', item);
  };

  const submitEditItem = (item: any) => {
    // itemEditSubmit('items', item);
  };

  const data = () => {
    const data = [];
    for (let i = 0; i < 11; i++) {
      const row = {
        id: 1,
        name: 'שם משתמש',
        phone: '052141232',
        email: 'some@email.com',
        date: '14/7/2020',
      };
      data.push(row);
      // console.log(row)
    }
    return data;
  };

  return (
    <div>
      {/* <Header /> */}
      <div id='wrapper'>
        <h4 className='primary-color text-right'>ניהול משימות</h4>
        <input className='search' placeholder='חיפוש משימה...' type='text' />
        {/* <div> */}
        <div className='d-flex justify-content-between'>
          <p className='client-list'>
           רשימת הלקוחות שלך  <span>({data().length})</span> 
          </p>
          <button onClick={() => setToggleForm(!toggleForm)} className='primary-btn'>משרה חדשה</button>
        </div>
        {toggleForm ? <Form data={data()[0]} /> : ''}
        {/* </div> */}
        {/* <div> */}
        <Table data={data()} delete={deleteItem} edit={getItem}></Table>
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;

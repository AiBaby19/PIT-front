import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Task } from '../models/Task';

const FormWrapper = styled.form`
  display: flex;
  width: auto;
  height: auto;
  min-height: 100px;
  background-color: white;
  border: 1px solid lightgrey;
  justify-content: center;
  padding: 35px;
  margin-bottom: 15px;
`;

const InputText = styled.input`
  border: none;
  margin-right: 40px;
  height: 40px;
  text-align: right;
  border-bottom: 1px solid lightgrey;
`;


export const Form: React.FC<any> = ({ ...data }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  //   useEffect(() => {
  //     setName(diversity?.name || '');
  //     setEnable(diversity?.enable || false);
  //     setClients(diversity?.clients || '');
  //     setItems(diversity?.items || '');
  //   }, [diversity]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // const values = { name, enable, items, clients, id:  };
  };

  const resetForm = () => {
    // setDiversityEdit('');
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <InputText
        type='text'
        value={name}
        placeholder='שם משתמש'
        onChange={(e) => setName(e.target.value)}
      />

      <InputText
        type='text'
        value={email}
        placeholder='מייל'
        onChange={(e) => setName(e.target.value)}
      />

      <InputText
        type='text'
        value={phone}
        placeholder='טלפון'
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <button className='btn btn-primary mr-4'>הוסף</button>
      </div>
    </FormWrapper>
  );
};

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Task } from '../models/Task';

interface Props {
  task: Task;
  submit: (task: Task) => void;
}

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

export const Form: React.FC<Props> = ({ task, submit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

    useEffect(() => {
      setName(task?.name || '');
      setPhone(task?.phone || '');
      setEmail(task?.email || '');
    }, [task]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit({ name, phone, email, date: addDate() });
  };

  const addDate = () => {
    const date = new Date();
    return `${date.getDate()}.${date.getMonth()}.${date
      .getFullYear()
      .toString()
      .substr(2, 2)}`;
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
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputText
        type='text'
        value={phone}
        placeholder='טלפון'
        onChange={(e) => setPhone(e.target.value)}
      />
      <div>
        <button type='submit' className='btn btn-primary mr-4'>
          הוסף
        </button>
      </div>
    </FormWrapper>
  );
};

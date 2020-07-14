import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User } from '../models/User';

interface Props {
  login: (user: User) => void;
  register: (user: User) => void;
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  min-height: 300px;
  height: auto;
  width: 400px;
  background-color: white;
  border: 1px solid lightgrey;
  justify-content: center;
  padding: 35px;
  box-sizing: border-box;
`;

const InputText = styled.input`
  border: none;
  height: 40px;
  margin-top: 30px;
  text-align: right;
  border-bottom: 1px solid lightgrey;
  min-width: 0;
`;

export const AuthForm: React.FC<Props> = ({ login, register }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (!email || !password) {
      alert('please fill all email & password');
      return;
    }
    const user: User = { email, password };
    if (!isLoginForm) user.isAdmin = isAdmin;

    isLoginForm ? login(user) : register(user);
  };

  const changeFormType = () => {
    setIsLoginForm(!isLoginForm);
    setEmail('');
    setPassword('');
    setIsAdmin(false);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h3 className='text-center'>{isLoginForm ? 'התחבר' : 'הרשמה'}</h3>
      <InputText
        type='email'
        value={email}
        placeholder='מייל'
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputText
        type='text'
        value={password}
        placeholder='סיסמא'
        onChange={(e) => setPassword(e.target.value)}
      />

      {!isLoginForm && (
        <div className='mt-4'>
          <input
            checked={isAdmin}
            type='checkbox'
            className='ml-2'
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <label className='form-check-label' htmlFor='defaultCheck'>
            הירשם כמנהל
          </label>
        </div>
      )}

      <div className='text-left mt-4'>
        <button type='submit' className='primary-btn mt-3 w-100'>
          {isLoginForm ? 'התחבר' : 'הצטרפות'}
        </button>
      </div>
      <div className='mt-4 text-center'>
        {isLoginForm ? (
          <p>
            אם אינך כבר רשום{' '}
            <b className='pointer' onClick={changeFormType}>
              הצטרף
            </b>
          </p>
        ) : (
          <p>
            אם הינך רשום{' '}
            <b className='pointer' onClick={changeFormType}>
              התחבר
            </b>
          </p>
        )}
      </div>
    </FormWrapper>
  );
};

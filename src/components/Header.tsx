import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Task } from '../models/Task';

const FormWrapper = styled.form`
  display: flex;
  min-width: 400px;
  height: auto;
  min-height: 100px;
  background-color: white;
  border: 1px solid lightgrey;
  justify-content: center;
  padding: 35px;
`;



export const Header: React.FC = () => {
  return <FormWrapper></FormWrapper>;
};

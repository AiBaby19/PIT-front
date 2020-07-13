import React from 'react';
import { Task } from '../models/Task';
import styled from 'styled-components';

interface Props {
  tasks: Task[];
  deleteTask: (id: number) => void;
  edit: (id: number) => void;
}

const TableWrapper = styled.table`
  border: 1px solid #dddddd;
  font-size: 16px;
  weight: 500;
  border-collapse: collapse;
`;

const HeaderRow = styled.th`
  background-color: #efefef;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  font-size: 14px;
  weight: 700;
  text-align: right;
  height: 10px;
  padding: 5px 0;
`;

const Row = styled.tr`
  padding: 20px;
  text-align: right;
  font-size: 12px;
  color: #3a3e69;
  &:hover {
    background-color: #d1f1e6;
  }
`;

const CheckBox = styled.td`
  background-color: transparent;
  padding-right: 10px;
`;

const HeaderCheckBox = styled.td`
  background-color: #efefef;
  border-bottom: 1px solid #dddddd;
  padding-right: 10px;
`;

export const Table: React.FC<Props> = ({ tasks, deleteTask, edit }) => {
  const headers = ['name', 'phone', 'email', 'date'];

  const translate = (header: string) => {
    if (header === 'name') return 'שם משתמש';
    if (header === 'phone') return 'טלפון';
    if (header === 'email') return 'מייל';
    if (header === 'date') return 'תאריך';
  };

  const renderTableHeader = () => {
    return headers.map((key, index: number) => {
      return <HeaderRow key={index}>{translate(key)}</HeaderRow>;
    });
  };

  const renderTableData = () => {
    return tasks.map((row: any, index: number) => {
      return (
        <Row className='pointer' key={index}>
          <CheckBox>
            <input type='checkbox'/>
          </CheckBox>
          {headers.map((header, index) => {
            return (
              <td key={index}>
                {header === 'date' ? (
                  <img
                    src='./images/done.png'
                    alt='checked'
                    width='10'
                    className='ml-2 mb-1'
                  />
                ) : (
                  ''
                )}
                {row[header]}
              </td>
            );
          })}
          <td>
            <span className='btn pr-0'>
              <img src='./images/eye.png' alt='watch' height='20' width='20' />
            </span>

            <span className='btn' onClick={() => edit(row.id)}>
              <img src='./images/edit.png' alt='edit' height='20' width='20' />
            </span>
            <span className='btn' onClick={() => deleteTask(row.id)}>
              <img
                src='./images/trash.png'
                alt='trash'
                height='20'
                width='20'
              />
            </span>
          </td>
        </Row>
      );
    });
  };

  return (
    <TableWrapper>
      <tbody>
        <Row>
          <HeaderCheckBox>
            <input type='checkbox'/>
          </HeaderCheckBox>

          {tasks && renderTableHeader()}
          <HeaderRow>{'פעולות'}</HeaderRow>
        </Row>
        {tasks && renderTableData()}
      </tbody>
    </TableWrapper>
  );
};

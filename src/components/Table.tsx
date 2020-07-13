import React from 'react';
import { Task } from '../models/Task';
import styled from 'styled-components';

interface Props {
  data: Task[];
  delete: () => void;
  edit: () => void;
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
`;

const CheckBox = styled.td`
  background-color: transparent;
`;

const HeaderCheckBox = styled.td`
  background-color: #efefef;
  border-bottom: 1px solid #dddddd;
`;

export const Table: React.FC<Props> = ({ data, delete: any, edit }) => {
  const headers = ['name', 'phone', 'email', 'date'];

  const checkAll = () => {
    console.log('all');
  };

  const checkOne = () => {
    console.log('one');
  };

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
    return data.map((row: any, index: number) => {
      return (
        <Row key={index}>
          <CheckBox>
            <input type='checkbox' onChange={checkAll} />
          </CheckBox>
          {headers.map((header, index) => {
            return <td key={index}>{row[header]}</td>;
          })}
          <td>
            <span className='btn px-0' onClick={() => delete row.id}>
              צפה
            </span>
            <span className='btn pl-0' onClick={() => delete row.id}>
              מחק
            </span>
            <span className='btn' onClick={() => edit()}>
              ערוך
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
            <input type='checkbox' onChange={checkOne} />
          </HeaderCheckBox>

          {data && renderTableHeader()}
          <HeaderRow>{'פעולות'}</HeaderRow>
        </Row>
        {data && renderTableData()}
      </tbody>
    </TableWrapper>
  );
};

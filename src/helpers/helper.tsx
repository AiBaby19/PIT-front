import { Task } from '../models/Task';
import { User } from '../models/User';


export const getURL = (type: string) => {
  return `http://localhost:3001/api/${type}`;
};

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    let response = await fetch(getURL('tasks'));
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchTask = async (id: number): Promise<Task> => {
  try {
    let response = await fetch(`${getURL('tasks')}/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const addTask = async (item: Task): Promise<string> => {
  try {
    const response = await fetch(`${getURL('tasks')}`, {
      method: 'post',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateTask = async (task: Task): Promise<string> => {
  try {
    const response = await fetch(`${getURL('tasks')}/${task.id}`, {
      method: 'put',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteTask = async (id: number): Promise<string> => {
  try {
    let response = await fetch(`${getURL('tasks')}/${id}`, {
      method: 'delete',
    });
    const res = await response.json();
    return res;
  } catch (err) {
    throw err;
  }
};


export const registerUser = async (user: User): Promise<string> => {
  try {
    const response = await fetch(`${getURL('user/register')}`, {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    return res;
  } catch (err) {
    throw err;
  }
};

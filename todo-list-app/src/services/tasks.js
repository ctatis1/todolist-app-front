import axios from 'axios';
const URL = 'http://localhost:3001/tasks';

const getAllTasks = async () => {
    const resp = await axios.get(URL);
    return resp.data;
};

const createTask = async (newTask) =>  {
    return await axios.post(URL, newTask);
};

const deleteTask = async (taskId) => {
    return await axios.delete(`${URL}/${taskId}`);
};

export default { getAllTasks, createTask, deleteTask };
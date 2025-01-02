import React, { useState } from "react";
import taskService from '../services/tasks';
import { Button } from 'react-bootstrap';

const TaskForm = ({setFormVisible}) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [notificationMsg, setNotificationMsg] = useState('');

    const addTask = async(e) => {
        e.preventDefault();
        const newTask = {
            title: newTitle,
            description: newDesc
        };
        taskService.createTask(newTask).then((resp) => {
            const respMsg = resp.data.Status.StatusDesc;
            
            setNotificationMsg(respMsg);
            setTimeout(() => {
                setNotificationMsg('');
                setFormVisible(false);
            }, 1500);
            //setTasks(task.concat(newTask));
        }).catch(err => setNotificationMsg(err.response.data.Status.StatusDesc));
    }
    
    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    }
    const handleDescChange = (e) => {
        setNewDesc(e.target.value);
    }
    return(
        <>
            <div style={{textAlign: 'center'}}><p className="p-notification">{notificationMsg}</p></div>
            <form onSubmit={addTask}>
                <div>
                    <input className="input-taskform" value={newTitle} placeholder="Title" onChange={handleTitleChange}/> 
                </div>
                <div>
                    <input className="input-taskform" style={{height: '80px'}} value={newDesc} placeholder="Description" onChange={handleDescChange}/>
                </div>
                <br />
                <div style={{textAlign: 'center'}}>
                    <Button className="btn-start" style={{marginRight: '10px'}} onClick={() => setFormVisible(false)}>Back</Button>
                    <Button className="btn-start" type='submit'>Add</Button>
                </div>
            </form>
        </>
    );
};

export default TaskForm;
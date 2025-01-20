import React, { useState } from "react";
import taskService from '../services/tasks';
import { Button } from 'react-bootstrap';

const TaskForm = ({setFormVisible}) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [notificationMsg, setNotificationMsg] = useState('');
    const [errFlag, setErrFlag] = useState(false);

    const addTask = async(e) => {
        e.preventDefault();
        setNotificationMsg('Cargando...');
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
        }).catch(err => {
            setErrFlag(true);
            setNotificationMsg('No es posible crear tareas en este momento');
            if(err.code === 'ERR_NETWORK') setTimeout(() => {
                setNotificationMsg('');
            }, 1500);
            else setNotificationMsg(err.response.data.Status.StatusDesc);
        });
    }
    
    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    }
    const handleDescChange = (e) => {
        setNewDesc(e.target.value);
    }
    return(
        <>
            <div style={{textAlign: 'center'}}><p className={errFlag ? 'p-notification-err':'p-notification-succ'}>{notificationMsg}</p></div>
            <form onSubmit={addTask} data-testid="task-form">
                <div>
                    <input className="input-taskform" type="text" value={newTitle} placeholder="Title" onChange={handleTitleChange} required/> 
                </div>
                <div>
                    <input className="input-taskform" type="text" style={{height: '80px'}} value={newDesc} placeholder="Description" onChange={handleDescChange} required/>
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
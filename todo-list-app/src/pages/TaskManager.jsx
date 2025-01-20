import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TaskList from "../components/taskList";
import TaskForm from "../components/taskForm";
import { Button } from "react-bootstrap";
import taskService from '../services/tasks';

const TasksManager = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [notificationMsg, setNotificationMsg] = useState('');

    useEffect(() => {
      setNotificationMsg('Cargando...');
      if(formVisible === false)taskService.getAllTasks()
        .then((initialTasks) => {setTasks(initialTasks.Tasks)})
        .catch(err => setNotificationMsg('No hay tareas pendientes'));
    },[formVisible]);

    return(
        <div className="container-sm">
            <div>
                <h3 data-testid="task-title" style={{textAlign: "center", color: 'rgb(30, 30, 142)'}}>Tasks</h3>
                {formVisible ? 
                    <TaskForm setFormVisible={setFormVisible}/>
                    :
                    <>
                        <div style={{textAlign: 'center'}}><Button className="btn-addtask" onClick={() => setFormVisible(!formVisible)}>Add Task</Button></div>
                        {tasks.length > 0 ? 
                            <TaskList tasks={tasks} setTasks={setTasks}/>
                        :
                            <div style={{textAlign: 'center', paddingTop: '20px'}}><p className="p-notification">{notificationMsg}</p></div>
                        }
                    </>
                }
            </div>
            <div style={{textAlign: 'center'}}>
                {
                    formVisible ? <></> 
                    : 
                    <>
                        <br />
                        <Button className="btn-start"><Link className="link-style" to={'/'} id="back-to-home-link">Back</Link></Button> 
                    </>
                }
            </div>
        </div>
    );
};

export default TasksManager;
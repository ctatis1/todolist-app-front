import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TaskList from "../components/taskList";
import TaskForm from "../components/taskForm";
import { Button } from "react-bootstrap";
import taskService from '../services/tasks';

const TasksManager = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      if(formVisible === false)taskService.getAllTasks().then((initialTasks) => {setTasks(initialTasks.Tasks)});
    },[formVisible]);

    return(
        <div className="container-sm">
            <div>
                <h3 style={{textAlign: "center", color: 'rgb(30, 30, 142)'}}>Tasks</h3>
                {formVisible ? 
                    <TaskForm setFormVisible={setFormVisible}/>
                    :
                    <>
                        <div style={{textAlign: 'center'}}><Button className="btn-addtask" onClick={() => setFormVisible(!formVisible)}>Add Task</Button></div>
                        <TaskList tasks={tasks} setTasks={setTasks}/>
                    </>
                }
            </div>
            <div style={{textAlign: 'center'}}>
                {
                    formVisible ? <></> 
                    : 
                    <>
                        <br />
                        <Button className="btn-start"><Link className="link-style" to={'/'}>Back</Link></Button> 
                    </>
                }
            </div>
        </div>
    );
};

export default TasksManager;
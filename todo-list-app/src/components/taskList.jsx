import React, { useState } from "react";
import { Form } from "react-bootstrap";
import tasksService from '../services/tasks';

const TaskList = ({tasks, setTasks}) => {
    const [notificationMsg, setNotificationMsg] = useState('');

    const handleDeleteTask = (taskId) =>{
        tasksService.deleteTask(taskId).then((resp) => {
            showHideMsg(resp.data.Status.StatusDesc);
            setTasks(tasks.filter(task => task.id !== taskId));
        }).catch(err => {
            showHideMsg(err.response.data.Status.StatusDesc);
        });
    }

    const showHideMsg = (msg) => {
        setNotificationMsg(msg);
        setTimeout(() => {
            setNotificationMsg('');
        }, 1500);
    };

    return(
        <>
        <div style={{textAlign: 'center'}}><p className="p-notification">{notificationMsg}</p></div>
        <div>
                {tasks.map(task => (
                    <div className="container d-flex task-container" key={task.id}>
                        <div className="row">
                            <Form style={{paddingTop: '25%'}}>
                                <Form.Check
                                    inline
                                    type="checkbox"
                                    style={{
                                        transform: "scale(1.2)"
                                    }}
                                    data-testid={`task-${task.id}`}
                                    id={`task-${task.id}`}
                                    onClick={() => handleDeleteTask(task.id)}
                                />
                            </Form>
                        </div>
                        <div className="row">
                            <h4>{task.title}</h4>
                            <p className="p-taskList">{task.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TaskList;
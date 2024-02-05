import React, { useEffect, createContext, useContext } from "react";
import { TaskInterface } from "../Interfaces/Task-interface";
import { HttpRequests } from "../tools/Http-request";

export const taskContext = createContext<any | undefined>(undefined);

export const MyTaskContext = () => {
    const context = useContext(taskContext);
    if(!context) throw new Error('there is not task-context providers');
    return context;
};

export const TaskContextProvider = ({ children }: { children: any }) => {

    const [ currentTask, setCurrentTask ] = React.useState({});
    const [ allTasks, setAllTasks ] = React.useState([]);
    const [ taskID, setTaskID ] = React.useState(0);

    const httpRequests = new HttpRequests;

    const setAllTasksx = async (tasks: any) => {
        setAllTasks(tasks);
    }
    const setTaskId = (id: number) => {
        setTaskID(id);
    }

    useEffect(() =>{
        const bringAllTasks = async () => {
          const result = await httpRequests.get('bring/all');
          setAllTasks(result);
        }
  
        bringAllTasks();
    }, []);

    const setSelectedTask = (task: TaskInterface) => {
        setCurrentTask(task);
    }
    return (
        <taskContext.Provider value={{ setSelectedTask, setAllTasksx, setTaskId, currentTask, allTasks, taskID }}>{children}</ taskContext.Provider>
    );
};
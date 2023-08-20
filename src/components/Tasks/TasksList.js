import React from "react";

import Task from "./Task";
import classes from "./TasksList.module.css";
import { useSelector } from "react-redux";

function TasksList() {
  const tasksList = useSelector((state) => state.tasks.tasksList);

  return (
    <section className={classes.tasksList}>
      {tasksList.length === 0 && (
        <h3 className={classes.noTasksMessage}>
          Adicione suas tarefas primeiro!
        </h3>
      )}
      {tasksList.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </section>
  );
}

export default TasksList;

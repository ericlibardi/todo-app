import React, { useEffect, useState } from "react";

import Task from "./Task";
import classes from "./TasksList.module.css";
import { useSelector } from "react-redux";

function TasksList() {
  const tasksList = useSelector((state) => state.tasks.tasksList);
  const filter = useSelector((state) => state.filters.filter);

  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    let completedTasks = [];
    let pendingTasks = [];

    if (filter === "completed" || filter === "allTasks") {
      completedTasks = tasksList.filter((task) => {
        return task.completed;
      });
    }

    if (filter === "pending" || filter === "allTasks") {
      pendingTasks = tasksList.filter((task) => {
        return !task.completed;
      });
    }

    const finalList = [...pendingTasks, ...completedTasks];

    setFilteredTasks(finalList);
  }, [tasksList, filter]);

  return (
    <section className={classes.tasksList}>
      {tasksList.length === 0 && (
        <h3 className={classes.noTasksMessage}>
          Adicione suas tarefas primeiro!
        </h3>
      )}
      {filteredTasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </section>
  );
}

export default TasksList;

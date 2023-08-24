import React, { useEffect, useState, useRef } from "react";

import { useDispatch } from "react-redux";
import { initializeTasks } from "../../store/reducers/tasksreducer";

import Task from "./Task";
import classes from "./TasksList.module.css";
import { useSelector } from "react-redux";

function TasksList() {
  const dispatch = useDispatch();

  const tasksList = useSelector((state) => state.tasks.tasksList);
  const filter = useSelector((state) => state.filters.filter);
  const ordering = useSelector((state) => state.filters.order);

  const [filteredTasks, setFilteredTasks] = useState([]);

  const isMounted = useRef(false);

  useEffect(() => {
    if (tasksList.length === 0) {
      setFilteredTasks([]);
      return;
    }

    let completedTasks = [];
    let pendingTasks = [];

    if (filter === "completed" || filter === "allTasks") {
      completedTasks = tasksList.filter((task) => {
        return task.completed;
      });

      if (ordering !== "noOrder") {
        completedTasks.sort((taskA, taskB) => {
          if (ordering === "recent") {
            return new Date(taskA.due) - new Date(taskB.due);
          }

          return new Date(taskB.due) - new Date(taskA.due);
        });
      }
    }

    if (filter === "pending" || filter === "allTasks") {
      pendingTasks = tasksList.filter((task) => {
        return !task.completed;
      });

      if (ordering !== "noOrder") {
        pendingTasks.sort((taskA, taskB) => {
          if (ordering === "recent") {
            return new Date(taskA.due) - new Date(taskB.due);
          }

          return new Date(taskB.due) - new Date(taskA.due);
        });
      }
    }

    const finalList = [...pendingTasks, ...completedTasks];

    setFilteredTasks(finalList);
  }, [tasksList, filter, ordering]);

  useEffect(() => {
    if (isMounted.current) {
      const tasksJson = JSON.stringify(tasksList);

      localStorage.setItem("tasks", tasksJson);
    } else {
      isMounted.current = true;
    }
  }, [tasksList]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (!storedTasks) return;

    const userTasks = JSON.parse(storedTasks);

    if (userTasks.length === 0) return;

    dispatch(initializeTasks(userTasks));
    isMounted.current = false;
  }, [dispatch]);

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

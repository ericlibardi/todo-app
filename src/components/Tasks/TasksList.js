import React from "react";

import Task from "./Task";
import classes from "./TaskList.module.css";

const Tasks = [
  {
    id: "fds23",
    description: "first task for the app",
    due: new Date("10-23-2023"),
    completed: false,
  },
  {
    id: "fht93",
    description: "second task for the app",
    due: new Date("11-09-2023"),
    completed: false,
  },
  {
    id: "fws25",
    description: "third task for the app",
    due: new Date("12-14-2023"),
    completed: false,
  },
];

function TasksList() {
  return (
    <section className={classes.tasksList}>
      {Tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </section>
  );
}

export default TasksList;

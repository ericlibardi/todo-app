import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import GroupButton from "./GroupButton";
import classes from "./Task.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Task(props) {
  const [dueDays, setDueDays] = useState(0);

  const { due } = props.task;

  useEffect(() => {
    const currentDate = new Date();

    /* Calculate the difference between the current date and the due date
        in order to get the remaining days for the task   
    */
    const differenceInTime = due.getTime() - currentDate.getTime();
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays <= 0) {
      differenceInDays = 0;
    }

    setDueDays(differenceInDays);
  }, [due]);

  let taskState = "";

  if (dueDays <= 0) {
    taskState = "overdue";
  }

  if (props.task.completed) {
    taskState = "completed";
  }

  return (
    <Card className={`${classes.taskCard} ${classes[taskState]}`}>
      {taskState === "completed" && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`${classes.taskCard__completedIcon}`}
        />
      )}

      <div className={classes.taskCard__details}>
        <p>{props.task.description}</p>
      </div>
      <div className={classes.taskCard__dueDate}>
        <p>
          {dueDays} <br /> dias
        </p>
      </div>
      <GroupButton />
    </Card>
  );
}

export default Task;

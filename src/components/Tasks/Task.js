import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Task.module.css";

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

  return (
    <Card className={classes.taskCard}>
      <div>
        <p>{props.task.description}</p>
      </div>
      <div>
        <p>{dueDays} dias</p>
      </div>
    </Card>
  );
}

export default Task;

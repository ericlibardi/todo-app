import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  toogleCompletionState,
  editTask,
} from "../../store/reducers/tasksreducer";

import Card from "../UI/Card";
import GroupButton from "./GroupButton";
import classes from "./Task.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../UI/Modal";
import AddForm from "../Forms/AddForm";

function Task(props) {
  const [dueDays, setDueDays] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const { due } = props.task;

  useEffect(() => {
    const currentDate = new Date();
    const dueDate = new Date(due);

    /* Calculate the difference between the current date and the due date
        in order to get the remaining days for the task   
    */
    const differenceInTime = dueDate.getTime() - currentDate.getTime();
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays <= 0) {
      differenceInDays = 0;
    }

    setDueDays(differenceInDays);
  }, [due]);

  const deleteHandler = () => {
    dispatch(deleteTask(props.task.id));
  };

  const toogleCompletion = () => {
    dispatch(toogleCompletionState(props.task.id));
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const editTaskHandler = (editedTask) => {
    dispatch(editTask(editedTask));
  };

  let taskState = "";

  if (dueDays <= 0) {
    taskState = "overdue";
  }

  if (props.task.completed) {
    taskState = "completed";
  }

  return (
    <React.Fragment>
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
        <GroupButton
          onDelete={deleteHandler}
          onChangeCompletion={toogleCompletion}
          onEdit={toggleModal}
        />
      </Card>

      {showModal && (
        <Modal title="Editar Tarefa">
          <AddForm
            button2Text="Confirmar"
            task={props.task}
            cancelRequest={toggleModal}
            confirmRequest={editTaskHandler}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}

export default Task;

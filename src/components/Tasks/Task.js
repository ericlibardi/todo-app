import React, { useEffect, useState, useCallback } from "react";
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
  const { id: taskId } = props.task;

  useEffect(() => {
    const currentDate = new Date();
    const dueDate = new Date(due);

    /* Calculate the difference between the current date and the due date
        in order to get the remaining days for the task   
    */
    const differenceInTime = dueDate.getTime() - currentDate.getTime();
    let differenceInDays =
      Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;

    if (differenceInDays <= 0) {
      differenceInDays = 0;
    }

    setDueDays(differenceInDays);
  }, [due]);

  /** Handle the request to delete a specific task
   * Dispatch the request to the reducer
   */
  const deleteHandler = useCallback(() => {
    dispatch(deleteTask(taskId));
  }, [dispatch, taskId]);

  /** Handle the request to change the Task's completion state
   * dispatch the request to the reducer
   */
  const toogleCompletion = useCallback(() => {
    dispatch(toogleCompletionState(taskId));
  }, [dispatch, taskId]);

  /** Changes the visibility of the Modal
   * if should be shown or hidden
   */
  const toggleModal = useCallback(() => {
    setShowModal((prevState) => !prevState);
  }, []);

  /** Handle the request to edit the task
   * dispatch the request to the reducer
   * @param {*} editedTask - edited task by the user
   */
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
            {dueDays} <br /> dia{dueDays === 1 ? "" : "s"}
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

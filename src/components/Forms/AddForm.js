import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";

import Button from "../UI/Button";
import classes from "./AddForm.module.css";

function AddForm(props) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);

  const [isDescriptionValid, setIsDescriptionValid] = useState({
    isValid: true,
    message: "",
  });

  const [isDateValid, setIsDateValid] = useState({
    isValid: true,
    message: "",
  });

  const { task } = props;

  useEffect(() => {
    // if task is passed as a props, set the initial values so the form is filled
    if (task) {
      setDescription(task.description);
      setDate(task.due);
      setCompleted(task.completed);
    }
  }, [task]);

  /** Handles the change on the description input
   *
   * @param {*} event event for changing the input
   */
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);

    if (!isDescriptionValid.isValid) {
      setIsDescriptionValid({ isValid: true, message: "" });
    }
  };

  /** Handles the change on the date input
   *
   * @param {*} event event for changing the input
   */
  const dateChangeHandler = (event) => {
    setDate(event.target.value);

    if (!isDateValid.isValid) {
      setIsDateValid({ isValid: true, message: "" });
    }
  };

  /** Handles the change on the Completed input switch
   *
   * @param {*} event event for changing the input
   */
  const completedCHangeHandler = (event) => {
    setCompleted((prevState) => !prevState);
  };

  /** Handle the request of submittion of the new task
   *
   * @param {*} event event of submit of the form
   * @returns
   */
  const submitHandler = (event) => {
    event.preventDefault();

    let invalid = false;

    /** Description must have at least 10 characters
     * if it is empty or doesn't have at least 10, place error message
     */
    if (description.trim().length < 10) {
      setIsDescriptionValid({
        isValid: false,
        message:
          description.trim().length === 0
            ? `A descrição não pode estar vazia.`
            : `Deve ter ao menos 10 caracteres.`,
      });

      invalid = true;
    }

    /** Date can't be empty
     * if it is, inform the user
     */
    if (date.length === 0) {
      setIsDateValid({ isValid: false, message: "Escolha uma data" });
      invalid = true;
    }

    /** Date must be higher than today
     *  if it isn't, inform the customer
     */
    if (new Date(date) < new Date()) {
      setIsDateValid({
        isValid: false,
        message: "Data deve ser maior que hoje",
      });
      invalid = true;
    }

    // if any error identified, cancel the method
    if (invalid) return;

    props.confirmRequest({
      id: props.task ? props.task.id : Date.now(),
      description: description,
      due: date,
      completed: completed,
    });

    setDescription("");
    setDate("");
    props.cancelRequest();
  };

  /** Handle the click over the cancel button
   * Clears the form and closes the modal
   */
  const cancelClickHandler = () => {
    setDescription("");
    setDate("");
    props.cancelRequest();
  };

  return (
    <form className={classes.addForm} onSubmit={submitHandler}>
      <div className={classes.inputWrapper}>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          rows="4"
          value={description}
          onChange={descriptionChangeHandler}
        />
        {!isDescriptionValid.isValid && (
          <p className={classes.errorMessage}>{isDescriptionValid.message}</p>
        )}
      </div>

      <div className={classes.inputWrapper}>
        <label htmlFor="date">Data limite</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={dateChangeHandler}
        />
        {!isDateValid.isValid && (
          <p className={classes.errorMessage}>{isDateValid.message}</p>
        )}
      </div>

      {props.task && (
        <Form.Check
          checked={completed}
          type="switch"
          id="switch-taskcompletition"
          label="Completa"
          onChange={completedCHangeHandler}
        />
      )}

      <div className={classes.buttonWrapper}>
        <Button
          background="rgb(224, 224, 224)"
          color="rgb(15,15,15)"
          onClick={cancelClickHandler}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          background="rgb(18, 95, 28)"
          color="rgb(255,255,255)"
        >
          {props.button2Text}
        </Button>
      </div>
    </form>
  );
}

export default AddForm;

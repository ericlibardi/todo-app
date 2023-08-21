import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/reducers/tasksreducer";

import Modal from "../UI/Modal";
import AddForm from "../Forms/AddForm";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import classes from "./Toolbar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";

const filterOptions = [
  "Todas as Tarefas",
  "Tarefas completas",
  "Tarefas pendentes",
];

function Toolbar() {
  const [filter, setFilter] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  /** Handle the selection of the Filter Dropdown
   *
   * @param {*} event - selection event of the Dropdown
   */
  const dropdownSelectionHandler = (event) => {
    setFilter(event);
  };

  const toggleModal = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  const addTaskHandler = (newTask) => {
    dispatch(addTask(newTask));
  };

  return (
    <article className={classes.toolbar}>
      <span className={classes.toolbar__item} onClick={toggleModal}>
        <FontAwesomeIcon icon={faPlus} className={classes.toolbar__icon} />
        <p>Adicionar Tarefa</p>
      </span>
      <span className={classes.toolbar__item}>
        <FontAwesomeIcon icon={faFilter} className={classes.toolbar__icon} />
        <DropdownButton
          align="end"
          id="DropDownFilter"
          size="sm"
          title={filterOptions[filter]}
          variant="white"
          onSelect={dropdownSelectionHandler}
        >
          <Dropdown.Item eventKey="0">{filterOptions[0]}</Dropdown.Item>
          <Dropdown.Item eventKey="1">{filterOptions[1]}</Dropdown.Item>
          <Dropdown.Item eventKey="2">{filterOptions[2]}</Dropdown.Item>
        </DropdownButton>
      </span>

      {showModal && (
        <Modal title="Adicionar Tarefa">
          <AddForm
            button2Text="Adicionar"
            cancelRequest={toggleModal}
            confirmRequest={addTaskHandler}
          />
        </Modal>
      )}
    </article>
  );
}

export default Toolbar;

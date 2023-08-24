import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/reducers/tasksreducer";
import { filterTasks, orderTasks } from "../../store/reducers/filterReducer";

import Modal from "../UI/Modal";
import AddForm from "../Forms/AddForm";

import Dropdown from "react-bootstrap/Dropdown";

import classes from "./Toolbar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faChevronDown,
  faCancel,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const filterOptions = [
  "Todas as Tarefas",
  "Tarefas completas",
  "Tarefas pendentes",
];

const filterOptionsReduced = ["Todas", "Completas", "Pendentes"];

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function Toolbar() {
  const [filter, setFilter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState(0);
  const [dimensions, setDimensions] = useState(window.innerWidth);

  const isMounted = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleREsize() {
      if (window.innerWidth !== dimensions) {
        setDimensions(window.innerWidth);
      }
    }, 50);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  useEffect(() => {
    if (isMounted) {
      dispatch(orderTasks(order));
    } else {
      isMounted.current = true;
    }
  }, [order, dispatch]);

  /** Handle the selection of the Filter Dropdown
   * set the current filter and dispatch to the reducer
   * @param {*} event - selection event of the Dropdown
   */
  const dropdownSelectionHandler = (event) => {
    setFilter(event);

    dispatch(filterTasks(event));
  };

  /** Handle the request to order the tasks
   *  set the current order
   */
  const orderRequestHandler = () => {
    setOrder((prevState) => {
      let currentOrder = 0;

      if (prevState < 2) currentOrder = prevState + 1;
      return currentOrder;
    });
  };

  /** Toggle current visibility of Modal
   *
   */
  const toggleModal = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  };

  /** Handle request to add new task
   * dispatch the new task to the reducer
   * @param {*} newTask - new Task defined by the user
   */
  const addTaskHandler = (newTask) => {
    dispatch(addTask(newTask));
  };

  return (
    <article className={classes.toolbar}>
      <span className={classes.toolbar__item} onClick={toggleModal}>
        <FontAwesomeIcon icon={faPlus} className={classes.toolbar__icon} />
        <p>{`Adicionar ${dimensions < 600 ? "" : "Tarefa"}`}</p>
      </span>
      <span className={classes.toolbar__item}>
        <Dropdown
          align="end"
          id="DropDownFilter"
          onSelect={dropdownSelectionHandler}
        >
          <Dropdown.Toggle variant="white" id="dropdown-basic">
            <FontAwesomeIcon
              icon={faFilter}
              className={classes.toolbar__icon}
            />
            {dimensions < 600
              ? filterOptionsReduced[filter]
              : filterOptions[filter]}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={classes.toolbar__iconchevron}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="0">{filterOptions[0]}</Dropdown.Item>
            <Dropdown.Item eventKey="1">{filterOptions[1]}</Dropdown.Item>
            <Dropdown.Item eventKey="2">{filterOptions[2]}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </span>
      <span className={classes.toolbar__item} onClick={orderRequestHandler}>
        <FontAwesomeIcon
          icon={order === 0 ? faCancel : order === 1 ? faArrowDown : faArrowUp}
          className={classes.toolbar__icon}
        />
        <p>{`Ordenar ${dimensions < 600 ? "" : "Tarefas"}`}</p>
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

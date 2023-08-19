import React, { useState } from "react";

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

  /** Handle the selection of the Filter Dropdown
   *
   * @param {*} event - selection event of the Dropdown
   */
  const dropdownSelectionHandler = (event) => {
    setFilter(event);
  };

  return (
    <article className={classes.toolbar}>
      <span className={classes.toolbar__item}>
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
    </article>

    // <Accordion className={classes.accordion}>
    //   <Accordion.Item eventKey="0">
    //     <Accordion.Header className={classes.accordion__header}>
    //       <span className="me-3">
    //         <FontAwesomeIcon icon={faScrewdriverWrench} />
    //       </span>
    //       Barra de Ações
    //     </Accordion.Header>
    //     <Accordion.Body>
    //       <FontAwesomeIcon icon={faPlus} />
    //       <p>Adicionar Tarefa</p>
    //     </Accordion.Body>
    //   </Accordion.Item>
    // </Accordion>
  );
}

export default Toolbar;

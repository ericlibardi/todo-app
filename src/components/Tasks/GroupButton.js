import React from "react";

import classes from "./GroupButton.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function GroupButton(props) {
  return (
    <div className={classes.groupButton}>
      <button onClick={props.onChangeCompletion}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button onClick={props.onEdit}>
        <FontAwesomeIcon icon={faPencil} />
      </button>
      <button onClick={props.onDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default GroupButton;

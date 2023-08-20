import React from "react";

import classes from "./GroupButton.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function GroupButton(props) {
  return (
    <div className={classes.groupButton}>
      <button>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button>
        <FontAwesomeIcon icon={faPencil} />
      </button>
      <button>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default GroupButton;

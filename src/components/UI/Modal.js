import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import classes from "./Modal.module.css";

function Backdrop() {
  return <div className={classes.backdrop}></div>;
}

function ModalContent(props) {
  return (
    <Card className={classes.modal}>
      <div className={classes.modal__title}>
        <h5>{props.title}</h5>
      </div>
      {props.children}
    </Card>
  );
}

function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <ModalContent title={props.title}> {props.children} </ModalContent>,
        document.getElementById("modal")
      )}
    </React.Fragment>
  );
}

export default Modal;

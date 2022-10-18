import React from "react";
import BsButton from "react-bootstrap/Button";
import BsModal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";

function ConfirmModal({ show, handleClose, modalData, onConfirmHandler }) {
  const questionMark = <FontAwesomeIcon icon={faCircleQuestion} />;
  const closeButton = <FontAwesomeIcon icon={faXmark} />;

  return (
    <BsModal show={show} onHide={handleClose} id="modal-confirm">
      <div className="modal-header">
        {modalData.header}
        <div className="gc-close" onClick={handleClose}>
          {closeButton}
        </div>
      </div>
      <div className="modal-body">
        <div className="modal-img">
          {questionMark}
          {modalData.body}
        </div>
        <div>
          <BsButton variant="lights" onClick={onConfirmHandler}>
            {modalData.confirmValue}
          </BsButton>
          <BsButton variant="lights" onClick={handleClose}>
            {modalData.cancelValue}
          </BsButton>
        </div>
      </div>
    </BsModal>
  );
}

export default ConfirmModal;

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationDialog({ show, handleClose, handleConfirm, message = "Are you sure you want to proceed?" }) {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            backdrop="static"
            keyboard={true}
            autoFocus={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="dialog-title">Confirm Action</Modal.Title>
            </Modal.Header>
            <Modal.Body id="dialog-description">{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} aria-label="Cancel">
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm} aria-label="Confirm">
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// Prop Types
ConfirmationDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    message: PropTypes.string,
};

export default ConfirmationDialog;
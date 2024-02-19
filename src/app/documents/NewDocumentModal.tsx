"use client"
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./modal.scss"


interface NewDocumentModalProps {
    show: boolean;
    onHide: () => void;
}
const NewDocumentModal: React.FC<NewDocumentModalProps> = ({ show, onHide }) => {
    return (
        <Modal
            className={show ? 'modal-container show col-3' : 'modal-container col-3'}
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create New Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Add form fields for document data */}
                    <Form.Group controlId="formOrderNumber">
                        <Form.Label>Order Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter order number" />
                    </Form.Group>
                    {/* Add more form fields for other document data */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary">Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewDocumentModal;

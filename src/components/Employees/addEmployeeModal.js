import axios from "axios";
import React, { useState, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";

const AddEmployeeModal = ({ isOpen, toggleModal, fetchAllEmployees }) => {
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    cin: "",
    email: "",
    phone: "",
  });

  const { token } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };
  const closeModal = () => {
    toggleModal();
    setNewEmployee({
      firstName: "",
      lastName: "",
      cin: "",
      email: "",
      phone: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "employee/add",
        newEmployee,
        config
      );
      toggleModal();
      fetchAllEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} modalClassName='bg-transparant'>
      <ModalHeader toggle={closeModal}>Ajouter employé </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='firstName'>Prénom</Label>
            <Input
              type='text'
              name='firstName'
              id='firstName'
              value={newEmployee.firstName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='lastName'>Nom</Label>
            <Input
              type='text'
              name='lastName'
              id='lastName'
              value={newEmployee.lastName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='cin'>CIN / Passport</Label>
            <Input
              type='text'
              name='cin'
              id='cin'
              value={newEmployee.cin}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              type='email'
              name='email'
              id='email'
              value={newEmployee.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='phone'>Phone</Label>
            <Input
              type='text'
              name='phone'
              id='phone'
              value={newEmployee.phone}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit}>
          Ajouter
        </Button>
        <Button color='secondary' onClick={closeModal}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEmployeeModal;

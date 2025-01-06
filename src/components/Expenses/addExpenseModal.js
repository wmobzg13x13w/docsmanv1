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

const AddExpenseModal = ({ isOpen, toggleModal, fetchExpenses }) => {
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    paymentType: "En Espèces",
    date: "",
  });

  const { token } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };
  const closeModal = () => {
    toggleModal();
    setNewExpense({
      title: "",
      amount: "",
      paymentType: "",
      date: "",
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
        process.env.REACT_APP_BASE_URL + "expense/add",
        newExpense,
        config
      );
      toggleModal();
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} modalClassName='bg-transparant'>
      <ModalHeader toggle={closeModal}>Ajouter Dépense </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='title'>Titre</Label>
            <Input
              type='text'
              name='title'
              id='title'
              value={newExpense.title}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='amount'>Montant</Label>
            <Input
              type='number'
              name='amount'
              id='amount'
              value={newExpense.amount}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for={`paymentType`}>Type du paiement</Label>
            <Input
              id={`paymentType`}
              name='paymentType'
              type='select'
              value={newExpense.paymentType}
              onChange={handleInputChange}
              required>
              <option value='En Espèces' selected={true}>
                En Espèces
              </option>
              <option value='Virement'>Virement</option>
              <option value='Chèque'>Chèque</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='date'>Date</Label>
            <Input
              type='date'
              name='date'
              id='date'
              value={newExpense.date}
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

export default AddExpenseModal;

import React, { useContext, useState, useEffect } from "react";
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
import axios from "axios";

const EditExpenseModal = ({
  isOpen,
  toggleModal,
  selectedExpense,
  fetchExpenses,
}) => {
  const { token } = useContext(AuthContext);
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    date: "",
    paymentType: "",
  });

  useEffect(() => {
    if (selectedExpense) {
      setExpense({
        title: selectedExpense.title,
        amount: selectedExpense.amount,
        date: selectedExpense.date.split("T")[0], // Extract the date part from the datetime string
        paymentType: selectedExpense.paymentType,
      });
    }
  }, [selectedExpense]);

  const handleInputChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}expense/${selectedExpense._id}`,
        {
          title: expense.title,
          amount: expense.amount,
          date: expense.date,
          paymentType: expense.paymentType,
        },
        config
      );

      toggleModal();
      fetchExpenses();
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Edit Expense</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='title'>Title</Label>
            <Input
              type='text'
              name='title'
              id='title'
              value={expense.title}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='amount'>Amount</Label>
            <Input
              type='number'
              name='amount'
              id='amount'
              value={expense.amount}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for={`paymentType`}>Type du paiement</Label>
            <Input
              id={`paymentType`}
              name='paymentType'
              type='select'
              value={expense.paymentType}
              onChange={handleInputChange}
              required>
              <option value='En Espèces' selected>
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
              value={expense.date}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit}>
          Save
        </Button>
        <Button color='secondary' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditExpenseModal;

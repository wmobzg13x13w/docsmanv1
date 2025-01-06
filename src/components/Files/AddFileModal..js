import axios from "axios";
import React, { useState, useContext, useEffect, useCallback } from "react";
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

const AddFileModal = ({ isOpen, toggleModal, allEmployees, fetchFiles }) => {
  const [newFile, setNewFile] = useState({
    file: null,
    name: "",
    assignedTo: "",
    payments: [],
    totalPrice: "",
    company: "",
    destination: "",
    post: "",
  });

  const { token } = useContext(AuthContext);

  const handleFileChange = (e) => {
    setNewFile({ ...newFile, file: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setNewFile({ ...newFile, [e.target.name]: e.target.value });
  };

  const handlePaymentInputChange = (index, e) => {
    const updatedPayments = [...newFile.payments];
    updatedPayments[index][e.target.name] = e.target.value;
    setNewFile({ ...newFile, payments: updatedPayments });
  };

  const handleAddPayment = () => {
    setNewFile({
      ...newFile,
      payments: [
        ...newFile.payments,
        { amount: "", paymentType: "En Espèces", date: "" },
      ],
    });
  };

  const handleRemovePayment = (index) => {
    const updatedPayments = [...newFile.payments];
    updatedPayments.splice(index, 1);
    setNewFile({ ...newFile, payments: updatedPayments });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", newFile.file);
      formData.append("name", newFile.file.name);
      formData.append("assignedTo", newFile.assignedTo);
      formData.append("totalPrice", newFile.totalPrice);
      formData.append("company", newFile.company);
      formData.append("destination", newFile.destination);
      formData.append("post", newFile.post);
      newFile.payments.forEach((payment, index) => {
        formData.append(`payments[${index}][amount]`, payment.amount);
        formData.append(`payments[${index}][paymentType]`, payment.paymentType);
        formData.append(`payments[${index}][date]`, payment.date);
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "files/add",
        formData,
        config
      );
      console.log(response.data);
      fetchFiles();
      toggleModal();
    } catch (error) {
      console.error("Error adding file:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} modalClassName='bg-transparant'>
      <ModalHeader toggle={toggleModal}>Ajouter Document</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='file'>Fichier</Label>
            <Input
              type='file'
              name='file'
              id='file'
              onChange={handleFileChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='assignedTo'>Assigned to</Label>
            <Input
              id='assignedTo'
              name='assignedTo'
              type='select'
              value={newFile.assignedTo}
              onChange={handleInputChange}
              required>
              <option value=''>Employé</option>
              {allEmployees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName + " " + employee.lastName}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for='totalPrice'>Montant Total</Label>
            <Input
              type='number'
              name='totalPrice'
              id='totalPrice'
              value={newFile.totalPrice}
              onChange={handleInputChange}
              required
              onWheel={(e) => e.target.blur()}
            />
          </FormGroup>
          <FormGroup>
            <Label for='company'>Société</Label>
            <Input
              type='text'
              name='company'
              id='company'
              value={newFile.company}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='post'>Post</Label>
            <Input
              type='text'
              name='post'
              id='post'
              value={newFile.post}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='destination'>Destination</Label>
            <Input
              type='text'
              name='destination'
              id='destination'
              value={newFile.destination}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          {newFile.payments.map((payment, index) => (
            <div key={index} className='border  border-primary rounded p-2'>
              <FormGroup>
                <Label for={`payments[${index}][amount]`}>Montant</Label>
                <Input
                  type='number'
                  name='amount'
                  id={`payments[${index}][amount]`}
                  value={payment.amount}
                  onChange={(e) => handlePaymentInputChange(index, e)}
                  required
                  onWheel={(e) => e.target.blur()}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`payments[${index}][paymentType]`}>
                  Type du paiement
                </Label>
                <Input
                  id={`payments[${index}][paymentType]`}
                  name='paymentType'
                  type='select'
                  value={payment.paymentType}
                  onChange={(e) => handlePaymentInputChange(index, e)}
                  required>
                  <option value='En Espèces'>En Espèces</option>
                  <option value='Virement'>Virement</option>
                  <option value='Chèque'>Chèque</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for={`payments[${index}][date]`}>Date</Label>
                <Input
                  type='date'
                  name='date'
                  id={`payments[${index}][date]`}
                  value={payment.date}
                  onChange={(e) => handlePaymentInputChange(index, e)}
                  required
                />
              </FormGroup>
              <Button
                color='danger'
                onClick={() => handleRemovePayment(index)}
                className='mb-3'>
                Supprimer Paiement
              </Button>
            </div>
          ))}
          <Button color='primary my-2' onClick={handleAddPayment}>
            Ajouter Paiement
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit}>
          Ajouter
        </Button>
        <Button color='secondary' onClick={toggleModal}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddFileModal;

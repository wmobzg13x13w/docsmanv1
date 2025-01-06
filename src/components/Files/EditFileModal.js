import { useCallback, useContext, useEffect, useState } from "react";
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

const EditFileModal = ({
  isOpen,
  toggleModal,
  selectedFile,
  updateFile,
  allEmployees,
  setSelectedFile,
  fetchFiles,
}) => {
  const { token } = useContext(AuthContext);

  const [file, setFile] = useState({
    name: "",
    assignedTo: "",
    totalPrice: "",
    company: "",
    destination: "",
    post: "",
    payments: [],
  });

  const [error, setError] = useState(null);

  const fetchFile = useCallback(async () => {
    if (!token || !selectedFile) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}files/${selectedFile}`,
        config
      );

      const fetchedFile = response.data;

      const updatedPayments = fetchedFile.payments.map((payment) => ({
        ...payment,
        date: payment.date
          ? new Date(payment.date).toISOString().split("T")[0]
          : "",
      }));

      setFile({ ...fetchedFile, payments: updatedPayments });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load file details. Please try again later.");
    }
  }, [token, selectedFile]);

  useEffect(() => {
    if (isOpen) fetchFile();
  }, [fetchFile, isOpen]);

  const handleInputChange = (e) => {
    setFile({ ...file, [e.target.name]: e.target.value });
  };

  const handlePaymentInputChange = (index, e) => {
    const updatedPayments = [...file.payments];
    updatedPayments[index][e.target.name] = e.target.value;
    setFile({ ...file, payments: updatedPayments });
  };

  const handleAddPayment = () => {
    setFile({
      ...file,
      payments: [
        ...file.payments,
        { amount: "", paymentType: "En Espèces", date: "" },
      ],
    });
  };

  const handleRemovePayment = (index) => {
    const updatedPayments = [...file.payments];
    updatedPayments.splice(index, 1);
    setFile({ ...file, payments: updatedPayments });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}files/${selectedFile}`,
        {
          assignedTo: file.assignedTo,
          totalPrice: file.totalPrice,
          company: file.company,
          destination: file.destination,
          post: file.post,
          payments: file.payments,
        },
        config
      );

      console.log(response.data);
      fetchFiles();
      toggleModal();
      setFile({
        name: "",
        assignedTo: "",
        totalPrice: "",
        company: "",
        destination: "",
        post: "",
        payments: [],
      });
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update file. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Edit File</ModalHeader>
      <ModalBody>
        {error && <p className='text-danger'>{error}</p>}
        <Form>
          <FormGroup>
            <p>
              <strong>Titre:</strong> {file.name}
            </p>
          </FormGroup>
          <FormGroup>
            <Label for='assignedTo'>Employé</Label>
            <Input
              id='assignedTo'
              name='assignedTo'
              type='select'
              value={file.assignedTo?._id || ""}
              onChange={handleInputChange}
              required>
              <option hidden>Employé</option>
              {allEmployees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='totalPrice'>Total Price</Label>
            <Input
              type='number'
              name='totalPrice'
              id='totalPrice'
              value={file.totalPrice}
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
              value={file.company}
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
              value={file.post}
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
              value={file.destination}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          {file.payments.map((payment, index) => (
            <div key={index} className='border border-primary rounded p-2'>
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
          Save
        </Button>
        <Button color='secondary' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditFileModal;

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
const EditEmployeeModal = ({
  isOpen,
  toggleModal,
  selectedEmployee,
  updateEmployee,
  allEmployees,
  setSelectedEmployee,
  fetchAllEmployees,
}) => {
  console.log(selectedEmployee);

  const { token } = useContext(AuthContext);

  const [employee, setemployee] = useState({
    firstName: "",
    lastName: "",
    cin: "",
    email: "",
    phone: "",
  });

  const fetchEmployee = useCallback(async () => {
    if (!token) {
      return; // Wait for the token to be initialized
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + `employee/${selectedEmployee}`,
        config
      );
      const employee = response.data;
      setemployee(employee);
    } catch (error) {
      console.error("Error fetching employee:", error);
      throw error;
    }
  }, [token]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleInputChange = (e) => {
    setemployee({ ...employee, [e.target.name]: e.target.value });
  };

  const toggletoggle = () => {
    toggleModal();
    setSelectedEmployee(null);
  };

  const handleSubmit = async () => {
    setSelectedEmployee(null);
    toggleModal();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}employee/${selectedEmployee}`,
        employee,
        config
      );
      console.log(response.data);
      toggleModal();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
    fetchAllEmployees();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggletoggle}
      modalClassName='bg-transparant'>
      <ModalHeader toggle={toggletoggle}>Edit Employee</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='firstName'>Prénom</Label>
            <Input
              type='text'
              name='firstName'
              id='firstName'
              value={employee.firstName}
              onChange={handleInputChange}
              required
              onWheel={(e) => e.target.blur()}
            />
          </FormGroup>
          <FormGroup>
            <Label for='lastName'>Nom</Label>
            <Input
              type='text'
              name='lastName'
              id='lastName'
              value={employee.lastName}
              onChange={handleInputChange}
              required
              onWheel={(e) => e.target.blur()}
            />
          </FormGroup>
          <FormGroup>
            <Label for='cin'>CIN/Passport</Label>
            <Input
              type='text'
              name='cin'
              id='cin'
              value={employee.cin}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              type='text'
              name='email'
              id='email'
              value={employee.email}
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
              value={employee.phone}
              onChange={handleInputChange}
              required
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
export default EditEmployeeModal;

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const DeleteEmployeeModal = ({
  isOpen,
  toggleModal,
  selectedEmployee,
  fetchAllEmployees,
  setAllEmployees,
}) => {
  const { token } = useContext(AuthContext);

  console.log(selectedEmployee);
  const handleDeleteEmployee = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}employee/delete/${selectedEmployee}`,
        config
      );

      // Update the employees state by filtering out the deleted employee
      setAllEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== selectedEmployee)
      );

      toggleModal();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} modalClassName='bg-transparant'>
      <ModalHeader toggle={toggleModal}>Delete Employee</ModalHeader>
      <ModalBody>Are you sure you want to delete this employee?</ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={handleDeleteEmployee}>
          Delete
        </Button>
        <Button color='secondary' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteEmployeeModal;

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const DeleteExpenseModal = ({
  isOpen,
  toggleModal,
  expense,
  fetchExpenses,
  setExpenses,
}) => {
  const { token } = useContext(AuthContext);

  const handleDeleteExpense = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}expense/${expense._id}`,
        config
      );

      // Update the expenses state by filtering out the deleted expense
      setExpenses((prevExpenses) =>
        prevExpenses.filter((exp) => exp._id !== expense._id)
      );

      toggleModal();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} modalClassName='bg-transparant'>
      <ModalHeader toggle={toggleModal}>Delete Expense</ModalHeader>
      <ModalBody>Are you sure you want to delete this expense?</ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={handleDeleteExpense}>
          Delete
        </Button>
        <Button color='secondary' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteExpenseModal;

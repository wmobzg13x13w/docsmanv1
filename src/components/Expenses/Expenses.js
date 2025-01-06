import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Alert,
} from "reactstrap";
//import EditFileModal from "./EditFileModal";
import { useCallback, useContext, useEffect, useState } from "react";
import AddExpenseModal from "./addExpenseModal";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import ExpenseItem from "./ExpenseItem";
import EditExpenseModal from "./EditExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";
//import DeleteFileModal from "./DeleteFileModal";
//import FileDetailsModal from "./FileDetailsModal";

const Expenses = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    toggleEditModal();
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const [selectedExpenseForDelete, setSelectedExpenseForDelete] =
    useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = (expense) => {
    setSelectedExpenseForDelete(expense);
    toggleDeleteModal();
  };

  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}expense/getall`,
          config
        );
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  return (
    <div>
      <Card>
        <CardBody>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <CardTitle tag='h5'>Mes Dépenses</CardTitle>
            <Button color='primary' onClick={() => toggleAddModal()}>
              Ajouter
            </Button>
          </div>
          {expenses.length === 0 ? (
            <Alert color='info' className='mt-3'>
              Vous n'avez pas encore de dépense à afficher.
            </Alert>
          ) : (
            expenses.map((expense, index) => (
              <ExpenseItem
                key={index} // Use a unique identifier for the key if available
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
                paymentType={expense.paymentType}
                onEdit={() => handleEditExpense(expense)}
                onDelete={() => handleDelete(expense)}
              />
            ))
          )}
          <AddExpenseModal
            isOpen={isAddModalOpen}
            toggleModal={toggleAddModal}
            fetchExpenses={fetchExpenses}
          />
          {selectedExpense && (
            <EditExpenseModal
              isOpen={isEditModalOpen}
              toggleModal={toggleEditModal}
              selectedExpense={selectedExpense}
              fetchExpenses={fetchExpenses}
            />
          )}
          {selectedExpenseForDelete && (
            <DeleteExpenseModal
              isOpen={isDeleteModalOpen}
              toggleModal={toggleDeleteModal}
              expense={selectedExpenseForDelete}
              fetchExpenses={fetchExpenses}
              setExpenses={setExpenses}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};
export default Expenses;

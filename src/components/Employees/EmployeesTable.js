import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Alert,
} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useCallback, useContext, useEffect, useState } from "react";
import AddEmployeeModal from "./addEmployeeModal.js";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext.js";
import DeleteEmployeeModal from "./DeleteEmployyeModal.js";
import EditEmployeeModal from "./EditEmployeeModal.js";

const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
];

const EmployeesTable = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditEmployee = (employee_id) => {
    setSelectedEmployee(employee_id);
    toggleEditModal();
  };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployeeForDelete, setSelectedEmployeeForDelete] =
    useState(null);

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  const handleDeleteEpmloyee = (employeeId) => {
    setSelectedEmployeeForDelete(employeeId);
    toggleDeleteModal();
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };
  const handleAddEmployee = () => {
    toggleAddModal();
  };

  const { token } = useContext(AuthContext);

  const [allEmployees, setAllEmployees] = useState([]);
  const fetchAllEmployees = useCallback(async () => {
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
        process.env.REACT_APP_BASE_URL + "employee/getall",
        config
      );
      const employees = response.data;
      setAllEmployees(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  }, [token]);

  useEffect(() => {
    fetchAllEmployees();
    console.log(allEmployees);
  }, [fetchAllEmployees]);
  return (
    <div>
      <Card>
        <CardBody>
          <div className='d-flex justify-content-between align-items-center'>
            <CardTitle tag='h5'>Mes employés</CardTitle>
            <Button color='primary' onClick={() => handleAddEmployee()}>
              Ajouter employé
            </Button>
          </div>
          {allEmployees.length === 0 ? (
            <Alert color='info' className='mt-3'>
              Vous n'avez pas encore d'employé à afficher.
            </Alert>
          ) : (
            <Table className='no-wrap mt-3 align-middle' responsive borderless>
              <thead>
                <tr>
                  <th>Nom et Prénom</th>
                  <th>CIN / Passport</th>

                  <th>Email</th>
                  <th>Num Tel</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map((tdata, index) => (
                  <tr key={index} className='border-top'>
                    <td>
                      <div className='d-flex align-items-center p-2'>
                        {/* <img
                        src={tdata.avatar}
                        className='rounded-circle'
                        alt='avatar'
                        width='45'
                        height='45'
                      /> */}
                        <div className='ms-3'>
                          <h6 className='mb-0'>
                            {tdata.firstName} {tdata.lastName}
                          </h6>
                          {/* <span className='text-muted'>{tdata.email}</span> */}
                        </div>
                      </div>
                    </td>
                    <td>{tdata.cin}</td>
                    <td>{tdata.email}</td>
                    <td>{tdata.phone}</td>
                    <div className='d-flex gap-2'>
                      <Button
                        className='btn'
                        outline
                        color='primary'
                        onClick={() => handleEditEmployee(tdata._id)}>
                        <i className='bi bi-pencil-square'></i>
                      </Button>
                      <Button
                        className='btn'
                        outline
                        color='danger'
                        onClick={() => handleDeleteEpmloyee(tdata._id)}>
                        <i className='bi bi-trash'></i>
                      </Button>
                    </div>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <AddEmployeeModal
            isOpen={isAddModalOpen}
            toggleModal={toggleAddModal}
            fetchAllEmployees={fetchAllEmployees}
          />
        </CardBody>
      </Card>
      {selectedEmployeeForDelete && (
        <DeleteEmployeeModal
          isOpen={isDeleteModalOpen}
          toggleModal={toggleDeleteModal}
          selectedEmployee={selectedEmployeeForDelete}
          fetchAllEmployees={fetchAllEmployees}
          setAllEmployees={setAllEmployees}
        />
      )}

      {selectedEmployee && (
        <EditEmployeeModal
          isOpen={isEditModalOpen}
          toggleModal={toggleEditModal}
          selectedEmployee={selectedEmployee}
          fetchAllEmployees={fetchAllEmployees}
          allEmployees={allEmployees}
          setSelectedEmployee={setSelectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeesTable;

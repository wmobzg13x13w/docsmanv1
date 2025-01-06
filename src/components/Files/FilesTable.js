import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Alert,
} from "reactstrap";
import EditFileModal from "./EditFileModal";
import { useCallback, useContext, useEffect, useState } from "react";
import AddFileModal from "./AddFileModal.";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import DeleteFileModal from "./DeleteFileModal";
import FileDetailsModal from "./FileDetailsModal";

const FilesTable = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFileForDelete, setSelectedFileForDelete] = useState(null);

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteFile = (fileId) => {
    setSelectedFileForDelete(fileId);
    toggleDeleteModal();
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleEditFile = (file_id) => {
    setSelectedFile(file_id);
    toggleEditModal();
  };

  const [isFileDetailsModalOpen, setIsFileDetailsModalOpen] = useState(false);
  const [selectedFileForDetails, setSelectedFileForDetails] = useState(null);

  const toggleFileDetailsModal = () => {
    setIsFileDetailsModalOpen(!isFileDetailsModalOpen);
  };

  const handleViewFileDetails = (fileData) => {
    setSelectedFileForDetails(fileData);
    toggleFileDetailsModal();
  };

  const { token } = useContext(AuthContext);
  const [files, setFiles] = useState([]);

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
  }, [fetchAllEmployees]);

  const fetchFiles = async () => {
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}files/getall`,
          config
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [token]);

  return (
    <div>
      <Card>
        <CardBody>
          <div className='d-flex justify-content-between align-items-center'>
            <CardTitle tag='h5'>Mes Documents</CardTitle>
            <Button color='primary' onClick={() => toggleAddModal()}>
              Ajouter
            </Button>
          </div>
          {files.length === 0 ? (
            <Alert color='info' className='mt-3'>
              Vous n'avez pas encore de documents à afficher.
            </Alert>
          ) : (
            <div className='row'>
              {files.map((tdata, index) => (
                <div className='col-md-6 col-lg-4 mb-3' key={index}>
                  <Card>
                    <CardBody>
                      <div className='d-flex align-items-center justify-content-between'>
                        <h6 className='mb-0'>
                          <a
                            href={
                              process.env.REACT_APP_BASE_URL +
                              "uploads/" +
                              tdata.name
                            }
                            download={tdata.name}
                            className='text-decoration-none'>
                            {tdata.name}
                          </a>
                        </h6>
                        <i className='bi bi-download'></i>
                      </div>
                      <CardSubtitle tag='h6' className='mb-2 text-muted'>
                        {tdata.assignedTo.firstName +
                          " " +
                          tdata.assignedTo.lastName}
                      </CardSubtitle>
                      {/* <p className='mb-1'>
                        Type de Paiement: {tdata.}
                      </p> */}
                      <p className='mb-1'>
                        Avance:{" "}
                        {tdata.payments.reduce((total, payment) => {
                          return total + payment.amount;
                        }, 0)}
                        DT
                      </p>
                      <p className='mb-1'>
                        Montant Total: {tdata.totalPrice} DT
                      </p>
                      <p className='mb-1'>
                        Reste à Payer:{" "}
                        {tdata.totalPrice -
                          tdata.payments.reduce((total, payment) => {
                            return total + payment.amount;
                          }, 0)}{" "}
                        DT
                      </p>
                      <p className='mb-1'>Société: {tdata.company}</p>
                      <div className='d-flex gap-2'>
                        <Button
                          className='btn'
                          outline
                          color='primary'
                          onClick={() => handleEditFile(tdata._id)}>
                          <i className='bi bi-pencil-square'></i>
                        </Button>
                        <Button
                          className='btn'
                          outline
                          color='danger'
                          onClick={() => handleDeleteFile(tdata._id)}>
                          <i className='bi bi-trash'></i>
                        </Button>
                        <Button
                          className='btn'
                          outline
                          color='info'
                          onClick={() => handleViewFileDetails(tdata)}>
                          <i className='bi bi-info-circle'></i>
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
      <AddFileModal
        isOpen={isAddModalOpen}
        toggleModal={toggleAddModal}
        fetchFiles={fetchFiles}
        allEmployees={allEmployees}
      />
      {selectedFile && (
        <EditFileModal
          isOpen={isEditModalOpen}
          toggleModal={toggleEditModal}
          selectedFile={selectedFile}
          fetchFiles={fetchFiles}
          allEmployees={allEmployees}
          setSelectedFile={setSelectedFile}
        />
      )}

      {selectedFileForDelete && (
        <DeleteFileModal
          isOpen={isDeleteModalOpen}
          toggleModal={toggleDeleteModal}
          selectedFile={selectedFileForDelete}
          fetchFiles={fetchFiles}
          setFiles={setFiles}
        />
      )}
      {selectedFileForDetails && (
        <FileDetailsModal
          isOpen={isFileDetailsModalOpen}
          toggleModal={toggleFileDetailsModal}
          file={selectedFileForDetails}
        />
      )}
    </div>
  );
};
export default FilesTable;

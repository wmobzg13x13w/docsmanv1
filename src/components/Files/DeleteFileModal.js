import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const DeleteFileModal = ({
  isOpen,
  toggleModal,
  selectedFile,
  fetchFiles,
  setFiles,
}) => {
  const { token } = useContext(AuthContext);

  const handleDeleteFile = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}files/delete/${selectedFile}`,
        config
      );

      // Update the files state by filtering out the deleted file
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file._id !== selectedFile)
      );

      toggleModal();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} modalClassName='bg-transparant'>
      <ModalHeader toggle={toggleModal}>Delete File</ModalHeader>
      <ModalBody>Are you sure you want to delete this file?</ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={handleDeleteFile}>
          Delete
        </Button>
        <Button color='secondary' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteFileModal;

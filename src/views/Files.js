import { Row, Col } from "reactstrap";
import FilesTable from "../components/Files/FilesTable";

const Files = () => {
  return (
    <Row>
      <Col lg='12'>
        <FilesTable />
      </Col>
    </Row>
  );
};

export default Files;

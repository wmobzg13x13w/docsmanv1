import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import EmployeesTable from "../components/Employees/EmployeesTable";

const Employees = () => {
  return (
    <Row>
      <Col lg='12'>
        <EmployeesTable />
      </Col>
    </Row>
  );
};

export default Employees;

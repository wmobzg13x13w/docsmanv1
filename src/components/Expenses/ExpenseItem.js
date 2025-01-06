import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";

const ExpenseItem = ({
  title,
  amount,
  date,
  paymentType,
  onEdit,
  onDelete,
}) => {
  const fullDate = new Date(date);

  return (
    <Card className='mb-3 shadow-sm'>
      <CardBody>
        <Row className='align-items-center'>
          {/* Date Section */}
          <Col xs={3} md={2} className='text-center'>
            <div className='bg-primary text-white rounded py-2'>
              <div className='fw-bold' style={{ fontSize: "0.9rem" }}>
                {fullDate.toLocaleString("fr-FR", { month: "long" })}
              </div>
              <div style={{ fontSize: "0.9rem" }}>{fullDate.getFullYear()}</div>
              <div className='fw-bold' style={{ fontSize: "1.5rem" }}>
                {fullDate.toLocaleString("fr-FR", { day: "2-digit" })}
              </div>
            </div>
          </Col>

          {/* Description Section */}
          <Col xs={9} md={10}>
            <Row className='align-items-center'>
              <Col xs={4} md={6}>
                <CardTitle tag='h5' className='mb-1 text-dark'>
                  {title}
                </CardTitle>
              </Col>
              <Col xs={4} md={3}>
                <div className='d-flex flex-column align-items-center'>
                  <CardText className='mb-1 text-dark'>{paymentType}</CardText>
                  <div
                    className='bg-primary text-white rounded px-3 py-1 fw-bold'
                    style={{ fontSize: "1.1rem" }}>
                    {amount} DT
                  </div>
                </div>
              </Col>
              <Col xs={4} md={3}>
                <div className='d-flex justify-content-end'>
                  <Button
                    className='btn me-2'
                    outline
                    color='primary'
                    onClick={onEdit}>
                    <i className='bi-pencil-square'></i>
                  </Button>
                  <Button
                    className='btn'
                    outline
                    color='danger'
                    onClick={onDelete}>
                    <i className='bi-trash'></i>
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ExpenseItem;

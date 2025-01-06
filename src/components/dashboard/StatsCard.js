import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

const StatsCard = ({ value, title, icon }) => {
  return (
    <Card className='mb-3 shadow-sm'>
      <CardBody>
        <Row className='align-items-center'>
          <Col xs={4} className='text-center'>
            <div
              className='bg-primary text-white rounded p-3'
              style={{ fontSize: "2rem" }}>
              <i className={icon} />
            </div>
          </Col>
          <Col xs={8}>
            <div className='d-flex flex-column align-items-end'>
              <div className='fw-bold text-dark' style={{ fontSize: "1.5rem" }}>
                {value}
              </div>
              <div className='text-muted' style={{ fontSize: "1rem" }}>
                {title}
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;

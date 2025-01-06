import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CardTitle, Col, Row } from "reactstrap";
import FilesChart from "../components/dashboard/FilesChart";
import { AuthContext } from "../contexts/AuthContext";
import ArcChart from "../components/dashboard/ArcChart";
import "../assets/scss/styles.css";
import StatsCard from "../components/dashboard/StatsCard";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [files, setFiles] = useState([]);

  const [paymentsTotalAmount, setPaymentsTotalAmount] = useState(0);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}payment/totalamount`
        );
        setPaymentsTotalAmount(response.data.totalAmount);
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    fetchTotalAmount();
  }, [token]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      if (token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}files/totalamount`,
            config
          );
          setTotalAmount(response.data.totalAmount);
        } catch (error) {
          console.error("Error fetching total amount:", error);
        }
      }
    };

    fetchTotalAmount();
  }, [token]);

  const [expensesTotalAmount, setExpensesTotalAmount] = useState(0);

  useEffect(() => {
    const fetchExpensesTotalAmount = async () => {
      if (token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}expense/total`,
            config
          );
          setExpensesTotalAmount(response.data.totalAmount);
        } catch (error) {
          console.error("Error fetching total amount:", error);
        }
      }
    };

    fetchExpensesTotalAmount();
  }, [token]);

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

  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}payment/getall`,
          config
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [token]);
  return (
    <>
      <Row>
        <CardTitle tag='h5'>Statistiques de ce mois</CardTitle>
        <Col md={4}>
          <StatsCard
            value={paymentsTotalAmount + " DT"}
            title='Total Paiments'
            icon='bi bi-cash'
          />
        </Col>
        <Col md={4}>
          <StatsCard
            value={totalAmount + " DT"}
            title='Montan Total Ducuments'
            icon='bi bi-file'
          />
        </Col>
        <Col md={4}>
          <StatsCard
            value={expensesTotalAmount + " DT"}
            title='Total dèpenses'
            icon='bi bi-cash-coin'
          />
        </Col>
      </Row>
      <div className='payment-status-section'>
        <Row className='charts-row'>
          <Col sm='6' lg='6' xl='7' xxl='8' className='chart-col'>
            <FilesChart files={files} />
          </Col>
          <Col sm='6' lg='6' xl='5' xxl='4' className='chart-col'>
            <ArcChart files={files} payments={payments} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;

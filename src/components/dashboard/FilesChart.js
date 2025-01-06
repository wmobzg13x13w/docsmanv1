import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Alert } from "reactstrap";

const PaymentStatusChart = ({ files }) => {
  // Register the necessary chart components
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  console.log(files);

  // Calculate the number of paid and not paid files
  const paidFiles = files.filter((file) => {
    const totalPayments = file.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    return totalPayments === file.totalPrice;
  });

  const notPaidFiles = files.filter((file) => {
    const totalPayments = file.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    return totalPayments !== file.totalPrice;
  });

  // Prepare the chart data
  const data = {
    labels: ["Payé", "Non Payé"],
    datasets: [
      {
        label: "Documents",
        data: [Math.round(paidFiles.length), Math.round(notPaidFiles.length)],
        backgroundColor: ["#26c6da", "#FF6384"],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Mes documents",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value.toFixed(0); // Display y-axis ticks as whole numbers
          },
        },
      },
    },
  };

  if (files.length === 0) {
    return (
      <Alert color='info' className='mt-3'>
        Aucun document trouvé.
      </Alert>
    );
  }

  return <Bar data={data} options={options} />;
};

export default PaymentStatusChart;

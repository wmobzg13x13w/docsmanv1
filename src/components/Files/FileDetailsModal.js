import React, { useEffect, useRef } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import logo from "./../../assets/images/logos/lps_black.png";

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
  },
  invoice: {
    fontFamily: "Helvetica",
  },
  logo: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 100,
    height: "auto",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

// InvoiceDocument component
const InvoiceDocument = ({ file }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <Image src={logo} style={styles.logo} />
      <View style={styles.section}>
        <Text style={styles.invoice}>LPS Consulting</Text>
      </View>

      <View style={styles.section}>
        <Text>Facturé à:</Text>
        <Text>
          {file.assignedTo.firstName} {file.assignedTo.lastName}
        </Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Date de Paiement</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Montant</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Type de Paiement</Text>
          </View>
        </View>

        {file.payments.map((payment) => (
          <View style={styles.tableRow} key={payment._id}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {new Date(payment.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{payment.amount} DT</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{payment.paymentType}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text>Total: {file.totalPrice} DT</Text>
        <Text>
          Total Payé: {file.payments.reduce((sum, p) => sum + p.amount, 0)} DT
        </Text>
        <Text>
          Reste à Payer:{" "}
          {file.totalPrice -
            file.payments.reduce((sum, p) => sum + p.amount, 0)}{" "}
          DT
        </Text>
      </View>
    </Page>
  </Document>
);

// FileDetailsModal component
const FileDetailsModal = ({ isOpen, toggleModal, file }) => {
  const downloadLinkRef = useRef(null);

  useEffect(() => {
    if (isOpen && downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Facture</ModalHeader>
      <ModalBody>
        <Button color='primary'>
          <PDFDownloadLink
            document={<InvoiceDocument file={file} />}
            fileName={`invoice_${file.assignedTo.lastName}.pdf`}
            ref={downloadLinkRef} // Attach ref here
            className='text-decoration-none text-white'>
            {({ loading }) =>
              loading ? "Loading document..." : "Télércharger"
            }
          </PDFDownloadLink>
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggleModal}>
          Fermer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FileDetailsModal;

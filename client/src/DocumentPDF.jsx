import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyDocument from "./Document";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Skeleton } from "@mui/material";

const DocumentPDF = () => {
  const { id } = useParams();
  const [contract, setcontract] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getContract = async () => {
      await axios
        .get(`http://localhost:5000/contract/getcontract/${id}`)
        .then((res) => {
          setcontract(res.data);
          setloading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getContract();
  }, []);
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <PDFViewer style={{ width: "100%", height: "1000px" }}>
          <MyDocument c={contract} />
        </PDFViewer>
      )}
    </>
  );
};

export default DocumentPDF;

/* i need help
i want to make a statistics page i know how to make diagrammes
what info should i display */

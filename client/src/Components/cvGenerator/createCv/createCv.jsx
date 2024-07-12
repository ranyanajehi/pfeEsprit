// src/App.js
import React, { useEffect, useState, useRef } from "react";
import PrintComponent from "./PrintComponent.jsx";
import CV from "./CV.jsx";
import { Container, CircularProgress, Button } from "@mui/material";
import ReactToPrint from "react-to-print";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import "./CreateCv.css";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CreateCv() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getSections", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    const printElement = printRef.current;
    console.log("printElement", printElement);
    const html = printElement.innerHTML;
    const pdfMakeContent = htmlToPdfmake(html);
    const documentDefinition = { content: pdfMakeContent };
    pdfMake.createPdf(documentDefinition).download("cv.pdf");
  };

  return (
    <div className="contain">
      <Container>
        {data ? (
          <>
            <CV data={data} />
            <ReactToPrint
              trigger={() => (
                <Button variant="contained" color="primary">
                  Print CV
                </Button>
              )}
              content={() => printRef.current}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
            <div style={{ display: "none" }}>
              <PrintComponent ref={printRef} data={data} />
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </div>
  );
}

export default CreateCv;

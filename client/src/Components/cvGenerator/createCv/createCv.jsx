import React, { useEffect, useState, useRef } from "react";
import PrintComponent from "./PrintComponent.jsx";
import Resume from "./CV.jsx";
import { Container, CircularProgress, Button, Box } from "@mui/material";
import ReactToPrint from "react-to-print";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import juice from "juice";
import "./CreateCv.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CreateCv() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [binaryImg, setBinaryImg] = useState("");
  const printRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getSections", {
          withCredentials: true,
        });
        setData(response.data);
        if (
          response.data &&
          response.data.user &&
          response.data.user.studentAvatar
        ) {
          const avatarBase64 = await convertImageToBase64(
            `http://localhost:4000/uploads/${response.data.user.studentAvatar}`
          );
          setBinaryImg(avatarBase64);
        }
      } catch (error) {
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const convertImageToBase64 = (url) => {
    return axios
      .get(url, {
        responseType: "blob",
      })
      .then((response) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(response.data);
        });
      });
  };
  const handleDownloadPDF = async () => {
    const printElement = printRef.current;
    const html = printElement.innerHTML;

    // Add FontAwesome CSS to the HTML
    const fontAwesomeCss = `
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
      </style>
    `;
    const htmlWithFontAwesome = fontAwesomeCss + html;

    // Inline CSS using juice
    const inlinedHtml = juice(htmlWithFontAwesome);

    const pdfMakeContent = htmlToPdfmake(inlinedHtml);
    const documentDefinition = { content: pdfMakeContent };

    // Convert images to Base64 and update the document definition

    pdfMake.createPdf(documentDefinition).download("cv.pdf");
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
      }}
    >
      {data ? (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
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
          </Box>
          <Resume data={data} />
          <div style={{ display: "none" }}>
            <PrintComponent ref={printRef} binaryImg={binaryImg} data={data} />
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

export default CreateCv;

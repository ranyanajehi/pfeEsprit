import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import img from "../../images/pdf.png";
// Specify the URL for the worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfPreview = ({ pdfUrl, cancelFileUpload }) => {
  console.log("pdfUrl", pdfUrl);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageImages, setPageImages] = useState([]);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    const promises = [];
    for (let i = 1; i <= numPages; i++) {
      promises.push(getPageAsImage(pdfUrl, i));
    }
    Promise.all(promises)
      .then((images) => {
        setPageImages(images);
      })
      .catch((error) => {
        console.error("Error converting PDF pages to images:", error);
      });
  };

  const getPageAsImage = async (pdfUrl, pageNumber) => {
    if (!pdfUrl) {
      console.error("PDF URL is missing or invalid.");
      return;
    }

    try {
      const pdf = await pdfjs.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(pageNumber);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      return canvas.toDataURL("image/jpeg");
    } catch (error) {
      console.error("Error converting PDF pages to images:", error);
      return null;
    }
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading document:", error);
    setError("Failed to load PDF file. Please check the file and try again.");
  };

  return (
    <div className="pdf_holder">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading="Loading PDF..."
      >
        <div>
          <img
            src={img}
            alt=""
            style={{ width: "100px", height: "150px", margin: "20px" }}
          />
          <p className="pdf_name">{pdfUrl.name}</p>
          <button className="close-button" onClick={cancelFileUpload}>
            ×
          </button>
        </div>
      </Document>
    </div>
  );
};

export default PdfPreview;

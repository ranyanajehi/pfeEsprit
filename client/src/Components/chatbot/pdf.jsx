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

  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    const promises = [];
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

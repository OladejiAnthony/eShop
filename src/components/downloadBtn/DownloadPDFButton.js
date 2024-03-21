import React from "react";
import html2pdf from "html2pdf.js";

const DownloadPDFButton = ({ contentToConvert, name }) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById(contentToConvert);
    html2pdf().from(element).save(name);
    //console.log("pdf downloaded")
  };

  return (
    <button 
      onClick={handleDownloadPDF} 
      className="--btn --btn-danger"
    >
      Download as PDF
    </button>
  );
};

export default DownloadPDFButton;

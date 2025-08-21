import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PortfolioForm from "./components/PortfolioForm";
import ResumePreview from "./components/ResumePreview";
import Footer from "./components/Footer";
import ResumePDF from "./components/ResumePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function App() {
  const [formData, setFormData] = useState(null);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div className="main-section">
        <PortfolioForm onSubmit={setFormData} />
        {formData && <ResumePreview data={formData} />}
      </div>
      {formData && (
        <div className="pdf-download-container">
          <PDFDownloadLink
            document={<ResumePDF data={formData} />}
            fileName="My_Resume.pdf"
            className="btn download"
          >
            {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
          </PDFDownloadLink>
        </div>
      )}
      <Footer />
    </div>
  );
}


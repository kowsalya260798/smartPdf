import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./SmartPdfPageCss.css";
import SmartDraggableDiv from "./PdfEditor/SmartDraggableDiv";
import SmartPdfAcroField from "./PdfEditor/SmartPdfAcroField";

const SmartPdfPages = ({ pdfFile, fields, saveTemplate }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageDimensions, setPageDimensions] = useState([]);
  const [itemField, setItemField] = useState(null);
  const [pdfFields, setFields] = useState(fields);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = (page) => {
    const { width, height } = page.getViewport({ scale: 1 });
    //  console.log("width ", width, " height ", height);
    setPageDimensions((prevDimensions) => [
      ...prevDimensions,
      { width, height },
    ]);
  };


  console.log(pdfFile);

  useEffect(() => {
    // Manually set the worker source
    pdfjs.GlobalWorkerOptions.workerSrc = `js/pdf.worker.js`;
  }, []);
  //
  const fieldRect = ["200.88", "441.48", "539.52", "478.7998"];
  //
  const get_page_snippets = () => {
    return [...Array(numPages)].map((_, index) => (
      <Page
        key={`page_${index + 1}`}
        pageNumber={index + 1}
        renderTextLayer={false}
        scale={0.3}
        onLoadSuccess={onPageLoadSuccess}
        width={pageDimensions[index]?.width || 0}
        height={pageDimensions[index]?.height || 0}
        renderAnnotations={false}
        onClick={() => setPageNumber(index + 1)}
      ></Page>
    ));
  };

  const addItem = (type) => {
    let updatedData = [...pdfFields]
    let singlePageData = updatedData[pageNumber - 1];
    let item = type == "checkbox" ? getCheckBoxItem() : getDummyItem();
    singlePageData.push(item);
    updatedData[pageNumber - 1] = singlePageData;
    setFields([...updatedData]);
  }

  const getDummyItem = () => {
    return {
      height: "37.4400",
      left: "200.88",
      name: 'dummy',
      rect: [],
      stype: "",
      top: "40",
      type: "/Tx",
      value: "newsoft",
      width: "338.64"
    }
  }

  const getCheckBoxItem = () => {
    return {
      height: "37.4400",
      left: "200.88",
      name: 'dummy',
      rect: [],
      stype: "",
      top: "40",
      type: "checkbox",
      value: "newsoft",
      width: "338.64"
    }
  }

  const saveTemplateData = () => {
    //console.log("PDF Fields " , pdfFields);
    //console.log("tempalte " , pdfFile)
    saveTemplate(pdfFields)
  }

  const parentRef = React.createRef();

  return (
    <>
      <div className="columns">
        <div className="column">
          <span className="icon" onClick={() => addItem("text")}>
            <i className="fa fa-text-width"></i>
          </span>
          <span className="icon" onClick={() => addItem("checkbox")}>
            <i className="fa fa-check"></i>
          </span>
        </div>
        <div className="column has-text-right">
          <button className="button is-link" onClick={saveTemplateData}>
            <span className="icon">
              <i className="fa fa-github"></i>
            </span>
            <span>Generate Template</span>
          </button>        
        </div>
      </div>
      <div className="smart-pdf-box">
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <div className="columns">
            <div className="column is-3 smart-pdf-pages-short">
              {get_page_snippets()}
            </div>
            <div className="column is-9">
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                scale={1}
                onLoadSuccess={onPageLoadSuccess}
                renderAnnotations={false}
                ref={parentRef}
              >
                <SmartPdfAcroField pageNumber={pageNumber} pdfFields={pdfFields} setFields={setFields} />
              </Page>
            </div>
          </div>
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>

      </div>
    </>
  );
};

export default SmartPdfPages;

//   {itemField && <SmartPdfAcroField itemField={itemField} setItemField={setItemField} />}
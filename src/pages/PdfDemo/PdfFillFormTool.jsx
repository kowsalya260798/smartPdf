import { useState } from "react";
import "./MergePdfToolStyle.css";
import { useSiteContext } from "../../contexts/SiteProvider";
import { showNotification } from "../../services/notifyService";
import { post } from "../../services/smartApiService";
import { DownLoadPdf, FormatFileSize } from "../../services/fileService";
import SmartCodeDisplay from "../../components/core/general/SmartCodeDisplay";
import SmartPdfViewer from "../../components/core/general/SmartPdfViewer";
import SmartPdfPages from "../../components/core/general/SmartPdfPages";

const PdfFillFormTool = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState(null);
  const [fields, setFields] = useState([]);
  const [result, setResult] = useState(false);
  const [content, setContent] = useState("");
  const { setLoading } = useSiteContext();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      //const newInput = { file: selectedFile };
    
      //setData([newInput]);    
      handleMergeClick(selectedFile);
      //
    } else {
      showNotification(
        "error",
        "File size exceeds 10MB limit. Please select a smaller file"
      );
      //alert("File size exceeds 2MB limit. Please select a smaller file.");
    }
  };

  const handleMergeClick = async (selectedFile) => {
    //let fileDataArray = [];
    let pdf_content = await readFileContent(selectedFile);
    sendMergeRequest({ pdf_data: [pdf_content] },selectedFile);
    /*
    // console.log("data ", data);
    if (data.length >= 1) {
      for (let i = 0; i < data.length; i++) {
        let pdf_content = await readFileContent(data[i].file);
        fileDataArray.push(pdf_content);
      }
      console.log("file data ", fileDataArray);
      // sendMergeRequest({ compress_data: fileDataArray });
    } else {
      // console.log("No files uploaded yet.");
      showNotification("error", "Please upload the file to compress");
    }*/
  };

  const sendMergeRequest = (data_post,selectedFile) => {
    setLoading(true, "Compressing Please Wait....");
    const subscription = post("pdfform/get_fields", data_post).subscribe(
      (response) => {
        setLoading(false);
        setFields(response.data.data);  
      //  showNotification("success", "Compressed Successfully");
        setInput(selectedFile);
      //  setResult(true);
       // setContent(response.data.data);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  };

  const downLoadMergePdf = () => {
    DownLoadPdf(content, "compressed.pdf");
  };

  const readFileContent = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Content = reader.result.split(",")[1]; // Base64 content
        resolve(base64Content);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size <= 2 * 1024 * 1024) {
        const newInput = { file };
        setData((prevData) => [...prevData, newInput]);
      } else {
        alert(
          `File ${file.name} size exceeds 2MB limit. Please select a smaller  file.`
        );
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDelete = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const row = data.map((item, index) => {
    return (
      <tr key={index}>
        <td className="name">{item.file.name}</td>
        <td className="size">{FormatFileSize(item.file.size)}</td>
        <td className="remove">
          <button
            type="button"
            onClick={() => handleDelete(index)}
            className="btn"
          >
          jytjyv
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    );
  });

  const saveFieldsRequest = async(pdfFields) => {
    let pdf_content = await readFileContent(input);
    let data_post = {template:pdf_content,fields:pdfFields};
   // console.log("data _post " , data_post);
    setLoading(true, "Generating Template Please Wait....");
    const subscription = post("pdfform/generate_template", data_post).subscribe(
      (response) => {
        setLoading(false);
        setResult(true);
        setContent(response.data.data)
        // setFields(response.data.data);  
        // showNotification("success", "Compressed Successfully");
        // setInput(selectedFile);
        // setResult(true);
        // setContent(response.data.data);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  };

  const uploadCard = () => {
    return (
      <div class="card">
        <div className="card-upload">
          <header className="card-header">
            <div className="">
              <table className="table">
                <tbody>{row}</tbody>
              </table>
            </div>
          </header>
          <div className="file-upload">
            <label
              htmlFor="file-upload"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="button"
            >
              <div>
                <p>Drop the files here or Click to Upload</p>
                <p className="bold">browse the files</p>
              </div>
              <input id="file-upload" type="file" onChange={handleFileChange} />
            </label>
          </div>
        </div>
        {input && <SmartPdfPages pdfFile={input} fields={fields} saveTemplate={saveFieldsRequest} />}
      </div>
    );
  };

  const pdfView = () => {
    return <div></div>;
  };

  const clearResult = () => {
    setData([]);
    setResult(false);
  };

  const resultCard = () => {
  //  const length_content = content.length; 
    return (
      <div className="card smart-pdf-result-card">
        <header class="card-header">
          <p class="card-header-title">Template Generated Successfully</p>
          <button class="card-header-icon" aria-label="more options">
            <span class="icon" onClick={() => clearResult()}>
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </span>
          </button>
          <button class="card-header-icon" aria-label="more options">
            <span class="icon" onClick={downLoadMergePdf}>
              <i class="fa fa-download" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div class="card-content">          
          <div class="content">
            <SmartPdfViewer content={content} />
          </div>
        </div>
      </div>
    );
  };

  const dispalyUploadCard = () => {
    // console.log("upload card",uploadCard());
    return (
      <div className="columns">
        <div className="column is-12 card">{uploadCard()}</div>
      </div>
    );
  };

  return (
    <>
      {result == false && dispalyUploadCard()}
      {result && resultCard()}
    </>
  );
};

export default PdfFillFormTool;

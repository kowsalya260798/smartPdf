import { useState } from "react";
import "./MergePdfToolStyle.css";
import { useSiteContext } from '../../contexts/SiteProvider';
import { showNotification } from "../../services/notifyService";
import { post } from '../../services/smartApiService';
import { DownLoadPdf, FormatFileSize } from "../../services/fileService";
import SmartCodeDisplay from "../../components/core/general/SmartCodeDisplay";
import SmartPdfViewer from "../../components/core/general/SmartPdfViewer";
const CompressTool = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({ file: "" });
  const [result, setResult] = useState(false);
  const [content, setContent] = useState("");
  const { setLoading } = useSiteContext();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 20 * 1024 * 1024) {
      const newInput = { file: selectedFile };
      //setInput(newInput);
      setData([newInput]);
      //setData((prevData) => [...prevData, newInput]);
    } else {
      showNotification("error","File size exceeds 20MB limit. Please select a smaller file")
      //alert("File size exceeds 2MB limit. Please select a smaller file.");
    }
  };


  const handleMergeClick = async () => {
    let fileDataArray = [];
    // console.log("data ", data);
    if (data.length >= 1) {
      for (let i = 0; i < data.length; i++) {
        let pdf_content = await readFileContent(data[i].file);
        fileDataArray.push(pdf_content);
      }
      console.log("file data ", fileDataArray);
      sendMergeRequest({ compress_data: fileDataArray });
    } else {
     // console.log("No files uploaded yet.");
     showNotification("error","Please upload the file to compress")
    }
  };

  const sendMergeRequest = (data_post) => {
    setLoading(true, 'Compressing Please Wait....');
    const subscription = post('pdf/compress_pdf', data_post).subscribe((response) => {
      setLoading(false);
      showNotification("success", "Compressed Successfully");
      setResult(true);
      setContent(response.data.data)
    });
    return () => {
      subscription.unsubscribe();
    };
  }

  const downLoadMergePdf=()=>{
    DownLoadPdf(content,"compressed.pdf"); 
  }

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
          `File ${file.name} size exceeds 2MB limit. Please select a smaller file.`
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
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    );
  });

  const uploadCard = () => {
    return (
      <div class="card">
        <div className="card-upload">
          <header className="card-header">
            <div className="table-style">
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
          <footer className="card-footer">
            <div className="merge-button">
              <button onClick={handleMergeClick} className="button">
                Compress
              </button>
            </div>
          </footer>
        </div>
      </div>
    )
  }

  const clearResult=()=>{
    setData([]);
    setResult(false);
  }

  const resultCard = () => {
    const length_content = atob(content).length;
   // console.log( "data = ",data)
    const result_size = FormatFileSize(length_content);
    const orginal_size = data[0].file.size;

    const reduction = ((orginal_size - length_content ) / orginal_size ) * 100;
    return (
      <div className="card smart-pdf-result-card">
        <header class="card-header">
          <p class="card-header-title">
            Compressed Successfully
          </p>
          <button class="card-header-icon" aria-label="more options">
            <span class="icon"  onClick={() => clearResult()}>
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
             <table>
                <tr><th>Uploaded File Size</th><td>{FormatFileSize(orginal_size)}</td></tr>
                <tr><th>Compressed File Size</th><td>{FormatFileSize(length_content)}</td></tr>
                <tr><th>Reduction (%)</th><td>{reduction.toFixed(2)} %</td></tr>
             </table>
          </div>
          <div class="content">
            <SmartPdfViewer content={content} />
          </div>
        </div>
      </div>

    )
  }

  const dispalyUploadCard=()=>{   

    const apiSyntax = `{
      "method": "POST",
      "url": "pdf/compress_data",
      "headers": {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN", 
        "Content-Type": "application/json"
      },     
      "body": {
        compress_data:[
          "JVBERi0xLjcNCiW1tbW1DQoxIDAgb2JqDQo8PC9UeXBlL0Nhd", // base 64 content of pdf content of pdf-1
        ]
      }
    }`;
    return (
      <div className="columns">
          <div className="column is-6 card">{uploadCard()}</div>
          <div className="column is-6 card">
            <p>API Request :</p>
            <SmartCodeDisplay type="json" data={apiSyntax} />
          </div>
      </div>
    )
  }

  return (
    <>
      {result == false && dispalyUploadCard()}
      {result && resultCard()}
    </>
  );
};

export default CompressTool;

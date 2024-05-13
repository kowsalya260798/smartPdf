import { useState } from "react";
import "./MergePdfToolStyle.css";
import { useSiteContext } from '../../contexts/SiteProvider';
import { showNotification } from "../../services/notifyService";
import { post } from '../../services/smartApiService';
const SplitPdfTool = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({ file: "" });
  const [result, setResult] = useState(false);
  const { setLoading } = useSiteContext();

  const [rows, setRows] = useState([{ id: 1, data: 'File-1' }]);

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, data: `File ${rows.length + 1}` }]);
  };

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
      const newInput = { file: selectedFile };
      setInput(newInput);
      setData((prevData) => [...prevData, newInput]);
    } else {
      alert("File size exceeds 2MB limit. Please select a smaller file.");
    }
  };

  const formatFileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = parseInt(Math.floor(Math.log(size) / Math.log(k)));
    return Math.round(size / Math.pow(k, i), 2) + " " + sizes[i];
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
        <td className="size">{formatFileSize(item.file.size)}</td>
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

  const uploadCard=()=>{
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
         
          <div className="container mt-5">
      <table className="table is-bordered is-fullwidth">
        <thead>
          <tr>
            <th>files</th>
        </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.data}
           <span className="input-box"> <input type="box " className="inner-inputbox " /></span>
             <span className="add-button-out">
              <button className="add-button" onClick={addRow}>
                  +
                </button></span>
               <span className="del-button-out"><button className="del-button " onClick={() => deleteRow(row.id)}>
                  -
                </button></span> 
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>

          <footer className="card-footer">
            <div className="merge-button">
              <button className="button1">
                split
              </button>
            </div>
          </footer>
        </div>
      </div>
     )
  }

  const resultCard=()=>{
    return (
      <div className="card">
        <p>Merge Process Completed Successfully</p>
           <button className="button is-danger"> click Here to Download Pdf</button>
      </div>
     
    )
  }

  return (
    <>
       {result==false && uploadCard()}
       {result && resultCard()}
    </>
  );
};

export default SplitPdfTool;

import React,{useState,useEffect} from 'react';


const SmartPdfViewer = ({ content }) => {
    const [pdfBlob, setPdfBlob] = useState(null);

    useEffect(() => {
      // Convert base64 to Blob
      const binaryData = atob(content);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
  
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
  
      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      setPdfBlob(blob);
    }, [content]);
  
    return (
      <div>
        {pdfBlob && (
          <iframe
            title="PDF Viewer"
            width="100%"
            height="500px"
            src={URL.createObjectURL(pdfBlob)}
            frameBorder="0"
          ></iframe>
        )}
      </div>
    );
};

export default SmartPdfViewer;
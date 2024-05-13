const DownLoadPdf = async (base64EncodedPdf,fileName) => {
    try {
      // Convert the base64 string to a Uint8Array
    const pdfData = Uint8Array.from(atob(base64EncodedPdf), (c) => c.charCodeAt(0));

    // Create a Blob from the Uint8Array
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });

    // Create a link element
    const downloadLink = document.createElement('a');

    // Set the href attribute with the Blob data
    downloadLink.href = window.URL.createObjectURL(pdfBlob);

    // Set the download attribute with the desired filename
    downloadLink.download = fileName;

    // Append the link to the document body
    document.body.appendChild(downloadLink);

    // Trigger a click on the link to start the download
    downloadLink.click();

    // Remove the link from the document
    document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error fetching or downloading PDF:', error);
    }
  };

  const FormatFileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = parseInt(Math.floor(Math.log(size) / Math.log(k)));
    return Math.round(size / Math.pow(k, i), 2) + " " + sizes[i];
  };

  export {
    DownLoadPdf,
    FormatFileSize
  }
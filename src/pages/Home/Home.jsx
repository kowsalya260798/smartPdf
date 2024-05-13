import React, { useEffect, useState } from "react";
import { useSiteContext } from "../../contexts/SiteProvider";
import PdfCard from "../../components/site/Cards/PdfCard";
import IMAGES from "./../../config/SiteImages";

import "./Home.css";
import sample from "../../assets/videos/test.mp4";
import MergePdfTool from "../PdfDemo/MergePdfTool";
import CompressTool from "../PdfDemo/CompressTool";
import SplitPdfTool from "../PdfDemo/SplitPdfTool";
import OverlayPdfTool from "../PdfDemo/OverlayPdfTool";
import WaterMarkTool from "../PdfDemo/WaterMarkTool";
import HtmlToPdfTool from "../PdfDemo/HtmlToPdfTool";
import PdfFillFormTool from "../PdfDemo/PdfFillFormTool";
import SmartInput from "../../components/core/forms/SmartInput";
import { ALLOW_FLOAT, ALLOW_FLOAT_DYNAMIC, ALLOW_NUMERIC } from "../../services/PatternSerivce";

const Home = () => {
  const { setLoading, openModal, closeModal } = useSiteContext();
  const [formData, setFormData] = useState({});
  
  const [inputOneDisabled, setDisabled] = useState(false);
  let input_disabled = false;

  const getFormValue = () => {

  }

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculate_sum = () => {
    let one_value = parseInt(formData.input_one);
    let two_value = parseInt(formData.input_three);
    // console.log("one_value " ,  one_value , " two value " , two_value);
    let total = one_value + two_value;
    if (isNaN(total)) {
      total = 0;
    }
    return total;
    // setFormData((prev) => ({ ...prev, input_two: total }));
  }

  const onBlur = (value) => {
    const timeoutId = setTimeout(() => {
      // Update the value using the previous state
      handleInputChange("input_three", 30)
    }, 2000);

    // Clean up the timeout when the component unmounts or when the value is updated
    return () => clearTimeout(timeoutId);
  }

  const disabledFucntion = (value) => {
    if (formData.input_one == "yes") {
      return true;
    }
    // console.log("outside the function ", inputOneDisabled)
    return false;
  }

  useEffect(() => {
    setLoading(true, "Please wait until the results loaded");
    // Simulate asynchronous data loading
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
      setLoading(false);
    };
    fetchData();
  }, []);

  const merge_content = <p> Effortlessly merge multiple PDFs into a single document with our user-friendly
    PDF Merging Tool. Drag and drop files, preview pages, and
    click Merge for quick consolidation</p>

  const compress_content = <p>Compress PDF files effortlessly with our intuitive PDF
    Compression Tool. Upload your PDF, optimize file size,
    and download the compressed document instantly.
  </p>

  const overlay_content = <p> Effortlessly overlay one PDF onto another, preserving the original's header and footer,
    ensuring a consistent and branded document experience. Try it using our online demo</p>



  const homeCards = [
    {
      action: "merge",
      title: "Merge PDF Tool",
      contents: merge_content,
      image: IMAGES.CARDMERGE,
    },
    {
      action: "compress",
      title: "Compress PDF Tool",
      contents: compress_content,
      image: IMAGES.IMAGE_COMPRESS,
    },
    {
      action: "overlay",
      title: "Overlay PDF Tool",
      contents: overlay_content,
      image: IMAGES.IMAGE_SPLIT,
    },
    {
      action: "watermark",
      title: "Water Mark PDF Tool",
      contents: overlay_content,
      image: IMAGES.IMAGE_SPLIT,
    },
    {
      action: "pdfform",
      title: "PDF Form",
      contents: overlay_content,
      image: IMAGES.IMAGE_SPLIT,
    },
    /*
    {
      action:"splitpdf",
      title: "Split PDF Tool",
      contents: overlay_content,
      image: IMAGES.IMAGE_SPLIT,
    },
    {
      action:"htmltopdf",
      title: "HTML to PDF Tool",
      contents: overlay_content,
      image: IMAGES.IMAGE_SPLIT,
    },
    {
      action:"docxtopdf",
      title: "DOCX to PDF Tool",
      contents: overlay_content,
      image: IMAGES.IMAGE_SPLIT,
    },
    {
      action:"pptxtopdf",
      title: "PPTX to PDF Tool",
      contents: overlay_content,
      image: IMAGES.IMAGE_SPLIT,
    },
    */
    /*
    {
      action:"split",
      title: "Split Pdf",
      contents: "Tesing the merge pdf",
      image: IMAGES.IMAGE_MERGE,
    },*/
  ];
  const showDemo = (action) => {
    const title = homeCards.find((item) => item.action == action)?.title;
    openMyModal(title, action);
  };

  const showLive = (demoName) => {
    openLiveMyModal("Merge Pdf ");
  };

  const MyModalContent = (action) => {
    switch (action) {
      case "merge": return <MergePdfTool />
      case "split": return <SplitPdfTool />
      case "compress": return <CompressTool />
      case "overlay": return <OverlayPdfTool />
      case "watermark": return <WaterMarkTool />
      case "htmltopdf": return <HtmlToPdfTool />
      case "pdfform": return <PdfFillFormTool />
      default: return <MergePdfTool />
    }
  };

  const MyLiveModalContent = () => {
    return (
      <div>
        <video src={sample} autoPlay="true" controls></video>
      </div>
    );
  };

  const openLiveMyModal = (title, action) => {
    let modalObject = { title: title, body: MyModalContent(action), bodyClose: false };
    openModal(modalObject);
  };

  const openMyModal = (title, action) => {
    let modalObject = {
      title: title, body: MyModalContent(action), bodyClose: false,
      modalClass: "smart-modal-80"
    };
    openModal(modalObject);
  };

  const numericValidations = [
    {
      type: "required",
      msg: "Numeric Value is Required"
    },
    {
      type: "pattern",
      msg: "Please Enter Correct Numeric Value",
      pattern: '[0-9]+'
    }
  ];

  const displayCards = () => {
    return (
      <div className="columns is-multiline">
        {homeCards.map((item) => {
          return (
            <div className="column is-3">
              <PdfCard
                title={item.title}
                content={item.contents}
                imgName={item.image}
                demoEvent={() => showDemo(item.action)}
                liveEvent={showLive}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return <div>{displayCards()}</div>;
};

export default Home;

import { Link } from "react-router-dom";
//import pic from "../../../assets/images/size.png";
import "./pdfcard.css";
const PdfCards = ({ title, content, imgName,demoEvent ,liveEvent }) => {
  const cardHeader = () => {
    return (
      <header className="card-header">
        <p className="card-header-title pdf-card-header">{title}</p>
      </header>
    );
  };
  const cardBody = () => {
    return (
      <div className="card-content">
        <div className="content">{content}</div>
      </div>
    );
  };

  const cardImage = () => {
    return (
      <div className="card-image">
        <figure className="image is-2by1">
          <img src={imgName} alt="Placeholder image" />
        </figure>
      </div>
    );
  };

  const cardFooter = () => {
    return (
      <footer className="card-footer">
      {/*   <a href="#" className="card-footer-item smart-justify-left ">
          <button class="button pdfcard-live-button" onClick={liveEvent}>
            <span className="icon">
              <i class="fa fa-play" aria-hidden="true"></i>
            </span>
            <span>Live</span>
          </button>
        </a> */}
        <a href="#" className="card-footer-item smart-justify-right ">
          <button class="button pdfcard-demo-button" onClick={demoEvent}>
            <span className="icon">
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            </span>
            <span>Demo</span>
          </button>
        </a>
      </footer>
    );
  };

  return (
    <div className="card smart-pdf-card">
      {cardHeader()}
      {cardImage()}
      {cardBody()}
      {cardFooter()}
    </div>
  );
};

export default PdfCards;

{
  /*
<div className="card-sample">
  <header className="card-header">
    <p className="card-header-title">{title}</p>
  </header>
  <div className="card-image">
    <figure className="image is-2by1">
      <img src={pic} alt="Placeholder image" />
    </figure>
  </div>
  <div className="card-content">
    <div className="content">{content}</div>
  </div>
  <div className="card-footer">
    <Link to={path} id="first" className="button">
      <i id="icno" class="fa fa-play" aria-hidden="true"></i>
      <span id="name">live</span>
    </Link>
    <Link to={path1} className="button">
      <i id="icno" class="fa fa-file-pdf-o" aria-hidden="true"></i>
      <span id="name">demo</span>
    </Link>
  </div>
</div>
*/
}

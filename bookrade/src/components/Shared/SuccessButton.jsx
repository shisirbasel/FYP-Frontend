import "../../css/successbutton.css";

const SuccessButton = ({ value, newstyle="" ,click}) => {
  return (
    <>
    <button onClick={(e)=>{e.preventDefault(); click;}} className={`success-btn ${newstyle}`}>{value}</button>
    </>


  );
};

export default SuccessButton;

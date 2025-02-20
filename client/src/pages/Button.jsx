import "./Button.css";

const Button = ({ id, text, type, className, onClick }) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`Button Button_${type}`}
    >
      {text}
    </button>
  );
};

export default Button;
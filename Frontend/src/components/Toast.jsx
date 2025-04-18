const Toast = ({ message, type = "success" }) => {
    return (
      <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md ${type === "error" ? "bg-red-500" : "bg-green-500"} text-white`}>
        {message}
      </div>
    );
  };
  
  export default Toast;
  
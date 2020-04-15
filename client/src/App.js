import React from "react";
import axios from "axios";

const wrapperStyles = {
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "15vw",
};

const buttonStyles = {
  borderRadius: "15vw",
  paddingLeft: "5vw",
  paddingRight: "5vw",
};

const api = axios.create({
  baseURL: "http://192.168.1.32:8080/onair",
});

function App() {
  const [status, setStatus] = React.useState();

  React.useEffect(() => {
    api.get("/status").then((response) => {
      setStatus(response.data);
    });
  }, []);

  function handleToggle(callback) {
    api.post("/toggle").then((response) => {
      setStatus(response.data);
    });
  }

  return (
    <div style={wrapperStyles}>
      {status ? (
        <button
          className="btn danger"
          onClick={handleToggle}
          style={buttonStyles}
        >
          On Air
        </button>
      ) : (
        <button
          className="btn secondary"
          onClick={handleToggle}
          style={buttonStyles}
        >
          Go On Air
        </button>
      )}
    </div>
  );
}

export default App;

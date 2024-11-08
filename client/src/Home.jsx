import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleQuizButtonClick = () => {
    // This will navigate to the /quiz page
    navigate("/quiz");
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button 
        onClick={handleQuizButtonClick} 
        className="btn btn-primary"
      >
        Quiz
      </button>
    </div>
  );
}

export default Home;

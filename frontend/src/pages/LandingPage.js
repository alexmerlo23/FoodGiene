import React from "react";
import "../index.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
    <div className="Welcome">
        <h1>Hungry?</h1>
        <p>Time to make some food!</p>
    </div>
      <div className="group-members">
        <p><strong>Group Members:</strong> James Archibald, Don Chen, Patricia Calica, Alexander Merlo</p>
      </div>
      <button
        className="enter-button"
        onClick={() => (window.location.href = "/home")}
      >
        Enter
      </button>
    </div>
  );
};

export default LandingPage;

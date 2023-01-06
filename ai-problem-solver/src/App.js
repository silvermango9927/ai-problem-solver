import "./App.css";
import React, { useState } from "react";
import DragAndDropImage from "./components/DragAndDropImage";
import Solution from "./components/Solution";
import "dotenv/config";

function App() {
  const [imageData, setImageData] = useState(null);
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleImageDrop = (imageData) => {
    setImageData(imageData);
  };

  const handleTextExtracted = (text) => {
    console.log(text);
    setText(text);
  };

  const handleSolution = (response) => {
    console.log(response);
    setResponse(response);
  };
  return (
    <div className="App">
      <h1 className="heading">Answerer</h1>
      <h3 className="subtitle">
        Doubt with problems ? Struggling with exams ?{" "}
      </h3>
      {imageData ? (
        <img className="image" src={imageData} alt="" />
      ) : (
        <DragAndDropImage
          className="draganddrop"
          onImageDrop={handleImageDrop}
          onTextExtracted={handleTextExtracted}
        />
      )}

      <p>{text}</p>

      <Solution onSolution={handleSolution} text={text} />
      <p className="answer">{response}</p>
    </div>
  );
}

export default App;

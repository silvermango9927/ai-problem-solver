import React, { useRef } from "react";
import Tesseract from "tesseract.js";
import "./DragAndDropImage.css";

function DragAndDropImage(props) {
  const fileInputRef = useRef(null);
  // const [text, setText] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the dropped file
    const file = e.dataTransfer.files[0];

    // Create a new FileReader instance
    const fileReader = new FileReader();

    // Set the onload handler for the FileReader
    fileReader.onload = () => {
      // Get the image data from the file reader
      const imageData = fileReader.result;
      console.log(imageData);

      // Call the onImageDrop prop function with the image data
      props.onImageDrop(imageData);
      console.log(typeof imageData);

      // const data = Ocrad.recognize(fileReader.result);
      if (imageData.startsWith("data:")) {
        // The imageData is a valid data URL
        Tesseract.recognize(imageData, "eng", {
          logger: (m) => console.log(m),
        }).then(({ data: { text } }) => {
          console.log(text);
          // setText(text);
          props.onTextExtracted(text);
        });
      } else {
        console.log("Try something else !");
      }
    };

    // Read the file as a data URL
    fileReader.readAsDataURL(file);
  };

  return (
    <div onDragOver={handleDrag} onDrop={handleDrop} className="draganddrop">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleDrop}
        className="btn"
      />
      <p>Drop an image file here</p>
    </div>
  );
}

export default DragAndDropImage;

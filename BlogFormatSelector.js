import React, { useState } from "react";
import "../styles/BlogFormatSelector.css";

const BlogFormatSelector = () => {
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleSubmit = () => {
    // Handle the selection (e.g., navigate to the selected format's editor)
    console.log("Selected Format:", selectedFormat);
  };

  return (
    <div>
      <h2>Select Blog Format</h2>
      <div>
        <label>
          <input
            type="radio"
            value="standard"
            checked={selectedFormat === "standard"}
            onChange={handleFormatChange}
          />
          Standard
        </label>
        <label>
          <input
            type="radio"
            value="list"
            checked={selectedFormat === "list"}
            onChange={handleFormatChange}
          />
          List
        </label>
        <label>
          <input
            type="radio"
            value="gallery"
            checked={selectedFormat === "gallery"}
            onChange={handleFormatChange}
          />
          Gallery
        </label>
      </div>
      <button onClick={handleSubmit} disabled={!selectedFormat}>
        Continue
      </button>
    </div>
  );
};

export default BlogFormatSelector;

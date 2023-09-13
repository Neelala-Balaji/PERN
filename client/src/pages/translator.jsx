import React, { useState } from "react";
import axiosInstance from "../axios";

function Translation() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const translateText = async () => {
    try {
      const response = await axiosInstance.post("/translate", {
        text: inputText,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Translate to English</h1>
      <div className="formcss">
        <input
          type="text"
          placeholder="Enter text to translate"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="submit noradius" onClick={translateText}>
          Translate
        </button>
      </div>

      {translatedText && <p>Translated: {translatedText}</p>}
    </div>
  );
}

export default Translation;

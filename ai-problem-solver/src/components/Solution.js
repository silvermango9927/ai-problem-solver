import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";
import "./Solution.css";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Solution = ({ text }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // if (text === "") {
  //   setAnswer("Please upload an image with a question on it.");
  // }

  useEffect(() => {
    const generateAnswer = async () => {
      setLoading(true);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Answer this question with a reasonable and understandable explanation : ${text}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setAnswer(response.data.choices[0].text);
      console.log(response.data.choices[0].text);
      setLoading(false);
    };
    if (text !== "") {
      generateAnswer();
    }
  }, [text]);
  return (
    <div>
      <h1>Solution</h1>
      {loading ? <p>Loading...</p> : <p>{answer}</p>}
    </div>
  );
};

export default Solution;

import { useState } from "react";
import "./App.css";
import axios from "axios";
import pushicon from "./assets/application.png";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take upto 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setQuestion("");
      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-3xl font-medium font-poppins">Chatbot with Gemini AI</p>
        <div className="h-96 w-1/2 my-5 bg-slate-50 p-3 rounded-md font-medium overflow-y-auto">
          {answer}
        </div>
        <form onSubmit={generateAnswer} className="w-96 flex justify-center items-center gap-1">
          <input required value={question}
            onChange={(e) => setQuestion(e.target.value)} type="text" placeholder="Ask anything..." className="w-full rounded bg-gray-50 p-2 outline-none" />
          <button type="submit" disabled={generatingAnswer} className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"><img src={pushicon} alt="" className="w-5" /></button>
        </form>
      </div>
    </>
  );
}

export default App;

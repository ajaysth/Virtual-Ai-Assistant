import userModel from "../models/user.model.js";
import geminiResponse from "../gemini.js";
import moment from "moment";

const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await userModel.findById(req.user.userId);
    const userName = user?.name;
    const assistantName = user?.assistantName;

    const response = await geminiResponse(command, assistantName, userName);

    const jsonMatch = response.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch response from assistant",
      });
    }

    const jsonString = jsonMatch[0];
    const parsedJSON = JSON.parse(jsonString);

    const type = parsedJSON.type;

    switch (type) {
      case "get-date":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: `${parsedJSON.response}, Today is ${moment().format("MMMM Do YYYY")}`,
        });
      case "get-time":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: `${parsedJSON.response}, The current time is ${moment().format("h:mm:ss a")}`,
        });
      case "get-day":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: `${parsedJSON.response}, Today is ${moment().format("dddd")}`,
        });
      case "get-month":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: `${parsedJSON.response}, The current month is ${moment().format("MMMM")}`,
        });

      case "calculator-open":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: parsedJSON.response,
        });

      case "get-weather":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: parsedJSON.response,
        });

      case "google-search":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: parsedJSON.response,
        });

      case "youtube-search":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: parsedJSON.response,
        });

      case "youtube-play":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: parsedJSON.response,
        });

      case "open-instagram":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: parsedJSON.response,
        });
      case "open-facebook":
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: parsedJSON.response,
        });

      default:
        return res.json({
          type,
          userInput: parsedJSON.userInput,
          response: parsedJSON.response,
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch response from assistant",
      error: error.message,
    });
  }
};

export default askToAssistant;

//4:36

import { generate, generateFromDocs, setConfiguration } from "../../api/api";
import { ConfigSettingsProps, GenerateFromDocsProps, GenerateProps } from "../../api/types";

export const generateFromPDF = async (question: number, startPage: number, endPage: number) => {
    const generateConfig: GenerateFromDocsProps = {
      nbQuestions: question,
      pageStart: startPage,
      pageEnd: endPage,
    };

    console.log("Generate Config PDF");
    console.log("Number of questions: " + generateConfig.nbQuestions);
    console.log("Page Start: " + generateConfig.pageStart);
    console.log("Page End: " + generateConfig.pageEnd);

    return generateFromDocs(generateConfig)
  };


  export const generateFromTopic = async (topic: string, nbQuestions: number) => {
    const generateConfig: GenerateProps = {
      topic: topic,
      nbQuestions: nbQuestions,
    };
    console.log("Generate Config Topic: ");
    console.log("Topic: " + generateConfig.topic);
    console.log("Number of questions: " + generateConfig.nbQuestions);

    return await generate(generateConfig)
  };


export const configureSettings = async (language: string, languageStyle: string, creativity: number, difficulty: string) => {
    const config: ConfigSettingsProps = {
      language: language,
      languageLevel: languageStyle,
      temperature: creativity,
      difficulty: difficulty,
    };
    console.log("Config");
    console.log("Language: " + config.language);
    console.log("Language Level: " + config.languageLevel);
    console.log("Temperature: " + config.temperature);
    console.log("Difficulty: " + config.difficulty);

    return await setConfiguration(config);
  };
import { addQuestionsPDF, addQuestionsTopic, generate, generateFromDocs, setConfiguration } from "../../api/api";
import { AddQuestionsPDFProps, AddQuestionsTopicProps, ConfigSettingsProps, GenerateFromDocsProps, GenerateProps } from "../../api/types";

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
    console.log("Config configureSettings");
    console.log("Language: " + config.language);
    console.log("Language Level: " + config.languageLevel);
    console.log("Temperature: " + config.temperature);
    console.log("Difficulty: " + config.difficulty);

    return await setConfiguration(config);
};


export const addQuestionsFromTopic = async (topic: string, nbQuestions: number, userId: number) => {
    const generateConfig: AddQuestionsTopicProps = {
        topic: topic,
        nbQuestions: nbQuestions,
        userId: userId
    };
    console.log("Config addQuestionsFromTopic");
    console.log("Topic: " + generateConfig.topic);
    console.log("Number of questions: " + generateConfig.nbQuestions);
    console.log("User ID: " + generateConfig.userId);

    return await addQuestionsTopic(generateConfig);
};

export const addQuestionsFromPDF = async (topic: string, pageEnd: number, pageStart: number, nbQuestions: number) => {
    const generateConfig: AddQuestionsPDFProps = {
        topic: topic,
        pageEnd: pageEnd,
        pageStart: pageStart,
        nbQuestions: nbQuestions
    };
    console.log("Config addQuestionsFromPDF");
    console.log("Topic: " + generateConfig.topic);
    console.log("Number of questions: " + generateConfig.nbQuestions);
    console.log("Page Start: " + generateConfig.pageStart);
    console.log("Page End: " + generateConfig.pageEnd);

    return await addQuestionsPDF(generateConfig);
};
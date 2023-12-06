import {
  Label,
  Button,
  Text,
  ScrollView,
  YStack,
  XStack,
  Input,
  ToggleGroup,
} from "tamagui";
import { DocumentSelect } from "../../components/DocumentSelect/DocumentSelect";
import { atom, useAtom } from "jotai";
import { endPageAtom, filesAtom, startPageAtom } from "../../components/DocumentSelect/atoms";
import {
  creativityAtom,
  languageAtom,
  languageStyleAtom,
  questionAtom,
  difficultyAtom,
  topicAtom,
} from "./atoms";
import { SaveAreaView } from "../../components/SafeAreaView";
import {
  GenerateProps,
  ConfigSettingsProps,
  GenerateFromDocsProps,
} from "../../api/types";
import { generate, generateFromDocs, setConfiguration } from "../../api/api";
import { ConfiguratorSettings } from "./ConfiguratorSettings";

const selectedValueAtom = atom("Topic");

export function Configurator() {
  const [question] = useAtom(questionAtom);
  const [language] = useAtom(languageAtom);
  const [languageStyle] = useAtom(languageStyleAtom);
  const [creativity] = useAtom(creativityAtom);
  const [difficulty] = useAtom(difficultyAtom);
  const [topic, setTopic] = useAtom(topicAtom);
  const [startPage] = useAtom(startPageAtom);
  const [endPage] = useAtom(endPageAtom);

  const [selectedValue, setSelectedValue] = useAtom(selectedValueAtom);

  const configureSettings = async () => {
    const config: ConfigSettingsProps = {
      language: language,
      languageLevel: languageStyle,
      temperature: creativity,
      difficulty: difficulty,
    };
    console.log("Config");
    console.log(config.language);
    console.log(config.languageLevel);
    console.log(config.temperature);
    console.log(config.difficulty); 

    const response = await setConfiguration(config);
    if (!response) console.log("No response, could not configure");
    return response?.data;
  };

  const generateFromTopic = async () => {
    const generateConfig: GenerateProps = {
      topic: topic,
      nbQuestions: Number(question),
    };
    console.log("Generate Config Topic: " + generateConfig);

    const response = await generate(generateConfig);
    if (!response) console.log("No response, could not generate");
    return response?.data;
  };

  const generateFromPDF = async () => {
    const generateConfig: GenerateFromDocsProps = {
      nbQuestions: Number(question),
      pageStart: Number(startPage),
      pageEnd: Number(endPage),
    };
    console.log("Generate Config PDF");
    console.log("Number of questions: " + generateConfig.nbQuestions);
    console.log("Page Start: " + generateConfig.pageStart);
    console.log("Page End: " + generateConfig.pageEnd);

    await generateFromDocs(generateConfig)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const configureAndGenerate = async () => {
    if (!validate()) return;
    const response = await configureSettings();
    console.log("Response: from Config: " + response);

    if (selectedValue === "Topic") {
      const response = await generateFromTopic();
      console.log("Response from Topic generate: " + response);
    } else {
      await generateFromPDF();
    }
  };

  function validate(): boolean {
    if (startPage > endPage) {
      alert("Start page must be smaller than end page")
      return false;
    }
    return true;
  }

  return (
    <ScrollView>
      <SaveAreaView>
        <XStack display="flex" justifyContent="center">
          <ToggleGroup
            type="single"
            value={selectedValue}
            onValueChange={(val) => {val && setSelectedValue(val)}}
          >
            <ToggleGroup.Item value="Topic">
              <Text>Choose Topic</Text>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="Files">
              <Text>Upload PDF</Text>
            </ToggleGroup.Item>
          </ToggleGroup>
        </XStack>
        <YStack paddingTop={30} paddingBottom={20}>

          {selectedValue === "Topic" ? (
            <>
              <Label paddingBottom={10}>Topic</Label>
              <Input size="$4" borderWidth={2} placeholder="e.g. Javascript" height={70} onChangeText={setTopic}
              />
            </>
          ) : (
            <DocumentSelect />
          )}
        </YStack>

        <ConfiguratorSettings />

        <Button size="$6" theme="active" marginVertical={30} onPress={configureAndGenerate} >
          Generate
        </Button>
      </SaveAreaView>
    </ScrollView>
  );
}
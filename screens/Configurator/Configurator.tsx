import {
  Label,
  Button,
  Text,
  ScrollView,
  YStack,
  XStack,
  Input,
  ToggleGroup,
  Spinner,
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
import { set } from "react-hook-form";

const selectedValueAtom = atom("Topic");
const loadingAtom = atom(false);

export function Configurator({ navigation }) {
  const [question] = useAtom(questionAtom);
  const [language] = useAtom(languageAtom);
  const [languageStyle] = useAtom(languageStyleAtom);
  const [creativity] = useAtom(creativityAtom);
  const [difficulty] = useAtom(difficultyAtom);
  const [topic, setTopic] = useAtom(topicAtom);
  const [startPage, setStartPage] = useAtom(startPageAtom);
  const [endPage, setEndPage] = useAtom(endPageAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [files, setFiles] = useAtom(filesAtom);

  const [selectedValue, setSelectedValue] = useAtom(selectedValueAtom);

  const configureSettings = async () => {
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

  const generateFromTopic = async () => {
    const generateConfig: GenerateProps = {
      topic: topic,
      nbQuestions: Number(question),
    };
    console.log("Generate Config Topic: ");
    console.log("Topic: " + generateConfig.topic);
    console.log("Number of questions: " + generateConfig.nbQuestions);

    return await generate(generateConfig)
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

    return generateFromDocs(generateConfig)
  };

  const configureAndGenerate = async () => {
    setLoading(true);
    if (!validate()) return;
    let configureSuccess = false;

    await configureSettings()
      .then((res) => {
        console.log("Response from configure: " + res.message);
        configureSuccess = true;
      })
      .catch((error) => {
        console.log(error);
        alert("Could not configure settings, please try again");
      });

    if (configureSuccess) {
      if (selectedValue === "Topic") {
        await generateFromTopic()
          .then((res) => {
            console.log("Response from Topic generate: " + res.message);
            navigation.navigate("TopicsOverview");
          }
          ).catch((error) => {
            console.log(error);
            alert("Could not generate questions, please try again");
          })
          .finally(() => setLoading(false));
      } else {
        await generateFromPDF()
          .then((res) => {
            console.log("Response from PDF generate: " + res);
            navigation.navigate("TopicsOverview");
          }
          ).catch((error) => {
            console.log(error);
            alert("Could not generate questions, please try again");
          })
          .finally(() => {
            setLoading(false);
            setFiles([]);
            setStartPage("1");
            setEndPage("1");
          });
      };
    }
  }

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
        <XStack justifyContent="center">
          <ToggleGroup
            type="single"
            value={selectedValue}
            onValueChange={(val) => { val && setSelectedValue(val) }}
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
              <Input size="$4" borderWidth={2} placeholder="e.g. Javascript" height={70} onChangeText={(text) => { setTopic(text); console.log(topic) }} />
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
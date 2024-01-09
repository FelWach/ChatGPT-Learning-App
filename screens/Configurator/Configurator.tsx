import {
  Button,
  ScrollView,
  YStack,
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
  selectedValueAtom,
} from "./atoms";
import { SaveAreaView } from "../../components/SafeAreaView";
import {
  GenerateProps,
  ConfigSettingsProps,
  GenerateFromDocsProps,
} from "../../api/types";
import { generate, generateFromDocs, setConfiguration } from "../../api/api";
import { ConfiguratorSettings } from "./ConfiguratorSettings";
import { TopicField } from "./TopicField";
import { useQueryClient } from "@tanstack/react-query";
import { topicAtom } from "../../state/atoms";
import { TopicUploadSwitcher } from "./TopicUploadSwitcher";
import { resetAtoms } from "./helper";

const loadingAtom = atom(false);

export function Configurator(props: { navigation }) {
  const navigation = props.navigation;

  const [loading, setLoading] = useAtom(loadingAtom);

  const [question] = useAtom(questionAtom);
  const [language] = useAtom(languageAtom);
  const [languageStyle] = useAtom(languageStyleAtom);
  const [creativity] = useAtom(creativityAtom);
  const [difficulty] = useAtom(difficultyAtom);
  const [topic] = useAtom(topicAtom);
  const [startPage] = useAtom(startPageAtom);
  const [endPage] = useAtom(endPageAtom);
  const [selectedValue] = useAtom(selectedValueAtom);

  console.log("Topic in Configurator: " + topic);

  const queryClient = useQueryClient()

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
    if (!validatePagesInput()) return;
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
          .then(async (res) => {
            console.log("Response from Topic generate: " + res);
            resetAtoms();
            await queryClient.invalidateQueries({ queryKey: ['topics'] });
            navigation.navigate("TopicsOverview");
          }
          ).catch((error) => {
            console.log(error);
            alert("Could not generate questions, please try again");
          }).finally(() => {
            setLoading(false);
          })
      } else {
        await generateFromPDF()
          .then(async (res) => {
            console.log("Response from PDF generate: " + res);
            //resetAtoms();
            await queryClient.invalidateQueries({ queryKey: ['topics'] });
            navigation.navigate("TopicsOverview");
          }
          ).catch((error) => {
            console.log(error);
            alert("Could not generate questions, please try again");
          }).finally(() => {
            setLoading(false);
          })
      };
    }
  }

  function validatePagesInput(): boolean {
    if (startPage > endPage) {
      alert("Start page must be smaller than end page")
      return false;
    }
    return true;
  }

  return (
    <ScrollView>
      <SaveAreaView>
        <TopicUploadSwitcher />
        <YStack paddingTop={30} paddingBottom={20}>
          {selectedValue === "Topic" ? (
            <TopicField />
          ) : (
            <DocumentSelect />
          )}
        </YStack>
        <ConfiguratorSettings />

        {loading && <Spinner />}

        <Button size="$6" theme="active" marginVertical={30} onPress={configureAndGenerate} >
          Generate
        </Button>

      </SaveAreaView>
    </ScrollView>
  );
}
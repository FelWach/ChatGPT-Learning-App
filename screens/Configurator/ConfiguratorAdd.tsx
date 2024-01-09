import {
  Button,
  ScrollView,
  YStack,
  Spinner,
  H2,
  Label,
  Input,
} from "tamagui";
import { atom, useAtom } from "jotai";
import {
  creativityAtom,
  languageAtom,
  languageStyleAtom,
  questionAtom,
  difficultyAtom,
} from "./atoms";
import { SaveAreaView } from "../../components/SafeAreaView";
import {
  ConfigSettingsProps,
  AddQuestionsProps,
} from "../../api/types";
import { generate, setConfiguration } from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { topicAtom, userAtom } from "../../state/atoms";
import { ConfiguratorSettings } from "./ConfiguratorSettings";

const loadingAtom = atom(false);

export function ConfiguratorAdd(props: { navigation }) {
  const navigation = props.navigation;

  const [question, setQuestions] = useAtom(questionAtom);
  const [language] = useAtom(languageAtom);
  const [languageStyle] = useAtom(languageStyleAtom);
  const [creativity] = useAtom(creativityAtom);
  const [difficulty] = useAtom(difficultyAtom);
  const [topic, setTopic] = useAtom(topicAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [user] = useAtom(userAtom);
  const [, setFiles] = useAtom(userAtom);

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

  const resetAtoms = () => {
    setTopic("");
    setQuestions("1");
  }

  const addQuestions = async () => {
    const generateConfig: AddQuestionsProps = {
      topic: topic,
      nbQuestions: Number(question),
      userId: Number(user.id),
    };
    console.log("Generate Config Topic: ");
    console.log("Topic: " + generateConfig.topic);
    console.log("Number of questions: " + generateConfig.nbQuestions);

    return await generate(generateConfig)
  };

  const configureAndGenerate = async () => {
    setLoading(true);
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
      await addQuestions()
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
        });
    };
  }

  return (
    <ScrollView>
      <SaveAreaView>
        <H2>Add Questions</H2>
        {/*<TopicUploadSwitcher />*/}
        <YStack paddingTop={30} paddingBottom={20} style={{ opacity: 0.6 }}>
          {/*selectedValue === "Topic" ? (*/}
          <Label paddingBottom={10}>Topic</Label>
          <Input size="$4" borderWidth={2} placeholder={topic} height={70} disabled />
          {/*) : (
            <DocumentSelect />
          )*/}
        </YStack>
        <ConfiguratorSettings />

        {loading && <Spinner />}

        <Button size="$6" theme="active" marginVertical={30} onPress={configureAndGenerate} >
          Generate
        </Button>

      </SaveAreaView>
    </ScrollView >
  );
}
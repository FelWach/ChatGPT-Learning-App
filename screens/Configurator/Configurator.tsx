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
  languageAtom,
  languageStyleAtom,
  questionAtom,
  difficultyAtom,
  selectedValueAtom,
} from "./atoms";
import { SafeAreaView } from "../../components/SafeAreaView";
import { ConfiguratorSettings } from "./ConfiguratorSettings";
import { TopicField } from "./TopicField";
import { useQueryClient } from "@tanstack/react-query";
import { topicAtom, userAtom } from "../../state/atoms";
import { TopicUploadSwitcher } from "./TopicUploadSwitcher";
import { addQuestionsFromPDF, addQuestionsFromTopic, configureSettings, generateFromPDF, generateFromTopic } from "./generateHelper";

const loadingAtom = atom(false);

export function Configurator({ navigation, route }) {

  const addQuestionsClicked = route.params.addQuestionsClicked; // this is how props can be passed to components using the React Native Navigator

  const [loading, setLoading] = useAtom(loadingAtom);

  const [question, setQuestions] = useAtom(questionAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const [languageStyle, setLanguageStyle] = useAtom(languageStyleAtom);
  const [difficulty, setDifficulty] = useAtom(difficultyAtom);
  const [topic, setTopic] = useAtom(topicAtom);
  const [startPage, setStartPage] = useAtom(startPageAtom);
  const [endPage, setEndPage] = useAtom(endPageAtom);
  const [selectedValue] = useAtom(selectedValueAtom);
  const [, setFiles] = useAtom(filesAtom);
  const [user] = useAtom(userAtom);

  const queryClient = useQueryClient()

  const configureAndGenerate = async () => {
    setLoading(true);
    if (selectedValue === "PDF" && !validatePagesInput()) return;
    if (selectedValue === "Topic" && !validateTopicInput()) return;
    let configureSuccess = false;

    await configureSettings(language, languageStyle, difficulty)
      .then((res) => {
        console.log("Response from configure: " + res.message);
        configureSuccess = true;
      })
      .catch((error) => {
        console.log(error);
        alert("Could not configure settings, please try again");
      });

    if (configureSuccess) {
      try {
        let res = null;
        if (!addQuestionsClicked) {
          if (selectedValue === "Topic") {
            await generateFromTopic(topic, Number(question))
          } else {
            await generateFromPDF(Number(question), Number(startPage), Number(endPage));
          }
        } else {
          if (selectedValue === "Topic") {
            await addQuestionsFromTopic(topic, Number(question), user.id);
          } else {
            console.log("addQuestionsFromPDF !!!!!!!!!!!");
            await addQuestionsFromPDF(topic, Number(endPage), Number(startPage), Number(question));
          }
        }
        console.log(`Response from ${selectedValue} generate: ` + res);
        resetAtoms();
        await queryClient.invalidateQueries({ queryKey: ['topics'] });
        navigation.navigate("TopicsOverview");
      } catch (error) {
        console.log(error);
        alert("Could not generate questions, please try again");
      } finally {
        setLoading(false);
      }
    }
  }

  function validatePagesInput(): boolean {
    if (Number(startPage) > Number(endPage)) {
      alert("Start page must be smaller than end page")
      setLoading(false);
      return false;
    }
    return true;
  }

  function validateTopicInput(): boolean {
    if (topic.trim() === "") {
      alert("Please enter a topic");
      setLoading(false);
      return false;
    }
    return true;
  }

  const resetAtoms = () => {
    setTopic("");
    setQuestions("10");
    setFiles([]);
    setLanguageStyle("normal");
    setLanguage("en");
    setDifficulty("normal");
    setStartPage("1");
    setEndPage("1");
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <TopicUploadSwitcher />
        <YStack paddingTop={30} paddingBottom={20}>
          {selectedValue === "Topic" ? (
            <TopicField addQuestionsClicked={addQuestionsClicked} />
          ) : (
            <DocumentSelect />
          )}
        </YStack>
        <ConfiguratorSettings />
        {loading && <Spinner />}
        <Button size="$5" width="75%" theme="active" alignSelf="center" marginVertical="$5" onPress={configureAndGenerate} >
          Generate
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}
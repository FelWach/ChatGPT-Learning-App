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
import { configureSettings, generateFromPDF, generateFromTopic } from "./generateHelper";

const loadingAtom = atom(false);

export function Configurator({ navigation, route }) {
  console.log("addQuestionsClicked: " +  route.params.addQuestionsClicked); // this is how props can be passed to components using the React Native Navigator

  const addQuestionsClicked = route.params.addQuestionsClicked;

  const [loading, setLoading] = useAtom(loadingAtom);

  const [question, setQuestions] = useAtom(questionAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const [languageStyle, setLanguageStyle] = useAtom(languageStyleAtom);
  const [creativity] = useAtom(creativityAtom);
  const [difficulty, setDifficulty] = useAtom(difficultyAtom);
  const [topic, setTopic] = useAtom(topicAtom);
  const [startPage, setStartPage] = useAtom(startPageAtom);
  const [endPage, setEndPage] = useAtom(endPageAtom);
  const [selectedValue] = useAtom(selectedValueAtom);
  const [, setFiles] = useAtom(filesAtom);

  const queryClient = useQueryClient()

  const configureAndGenerate = async () => {
    setLoading(true);
    if (!validatePagesInput()) return;
    let configureSuccess = false;

    await configureSettings(language, languageStyle, creativity, difficulty)
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
        selectedValue === "Topic" ? res = await generateFromTopic(topic, Number(question)) : res = await generateFromPDF(Number(question), Number(startPage), Number(endPage));
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
    if (startPage > endPage) {
      alert("Start page must be smaller than end page")
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
      <SaveAreaView>
        <TopicUploadSwitcher />
        <YStack paddingTop={30} paddingBottom={20}>
          {selectedValue === "Topic" ? (
            <TopicField addQuestionsClicked={addQuestionsClicked}/>
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
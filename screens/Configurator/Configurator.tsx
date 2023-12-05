import {
  Label,
  Slider,
  Button,
  Text,
  ScrollView,
  YStack,
  XStack,
  Input,
  ToggleGroup,
} from "tamagui";
import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";
import { DocumentSelect } from "../../components/DocumentSelect/DocumentSelect";
import { atom, useAtom } from "jotai";
import { filesArray } from "../../components/DocumentSelect/atoms";
import {
  creativityAtom,
  languageAtom,
  languageStyleAtom,
  questionAtom,
  dropdownMenuLanguageAtom,
  dropdownMenuLanguageStyleAtom,
  dropdownMenuQuestionAtom,
  difficultyAtom,
  dropdownMenuDifficultyAtom,
  topicAtom,
} from "./atoms";
import { Lock, Brush } from "@tamagui/lucide-icons";
import { SaveAreaView } from "../../components/SafeAreaView";
import {
  GenerateProps,
  ConfigSettingsProps,
  UploadProps,
} from "../../api/types";
import { generate, setConfiguration, upload } from "../../api/api";

const selectedValueAtom = atom("Topic");

export function Configurator() {
  const [files, setFiles] = useAtom(filesArray);

  const [question, setQuestion] = useAtom(questionAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const [languageStyle, setLanguageStyle] = useAtom(languageStyleAtom);
  const [creativity, setCreativity] = useAtom(creativityAtom);
  const [difficulty, setDifficulty] = useAtom(difficultyAtom);
  const [topic, setTopic] = useAtom(topicAtom);

  const [selectedValue, setSelectedValue] = useAtom(selectedValueAtom);

  const configureSettings = async () => {
    const config: ConfigSettingsProps = {
      language: language,
      languageLevel: languageStyle,
      temperature: creativity,
      difficulty: difficulty,
    };
    console.log(config);

    const response = await setConfiguration(config);
    if (!response) console.log("No response, could not configure");
    return response?.data;
  };

  const generateFromTopic = async () => {
    const generateConfig: GenerateProps = {
      topic: topic,
      nbQuestions: Number(question),
    };
    console.log(generateConfig);

    const response = await generate(generateConfig);
    if (!response) console.log("No response, could not generate");
    return response?.data;
  };

  // const generateFromPDF = async () => {
  //     console.log("Generate from PDF");

  //     const generateConfig: UploadProps = {
  //         uri: files[0].uri,
  //         name: files[0].name,
  //         size: Number(files[0].size),
  //     };
  //     console.log(generateConfig);

  //     const response = await upload(generateConfig);
  //     // need to add generate after upload works
  //     if (!response) console.log("No response from upload call");
  //     return response?.data;
  // };

  // const generateFromPDF = async () => {
  //     try {
  //       const docRes = await DocumentPicker.getDocumentAsync({
  //         type: "audio/*",
  //       });

  //       const formData = new FormData();
  //       const assets = docRes.assets;
  //       if (!assets) return;

  //       const file = assets[0];

  //       const audioFile = {
  //         name: file.name.split(".")[0],
  //         uri: file.uri,
  //         type: file.mimeType,
  //         size: file.size,
  //       };

  //       formData.append("audioFile", audioFile as any);

  //       const { data } = await axios.post(apiUrl, formData, {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       console.log(data);
  //     } catch (error) {
  //       console.log("Error while selecting file: ", error);
  //     }
  //   };

  const configureAndGenerate = async () => {
    //const response = await configureSettings();
    //console.log("Response: " + response);

    if (selectedValue === "Topic") {
      const response = await generateFromTopic();
      console.log("Response: " + response);
    } else {
      //const response = await generateFromPDF();
      //console.log("Response: " + response);
    }
  };

  return (
    <ScrollView>
      <SaveAreaView>
        <XStack display="flex" justifyContent="center">
          <ToggleGroup
            type="single"
            value={selectedValue}
            onValueChange={setSelectedValue}
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
              <Input
                size="$4"
                borderWidth={2}
                placeholder="e.g. Javascript"
                height={70}
                onChangeText={setTopic}
              />
            </>
          ) : (
            <DocumentSelect />
          )}
        </YStack>
        <ConfiguratorBasis />
        <Button
          size="$6"
          theme="active"
          marginVertical={30}
          onPress={configureAndGenerate}
        >
          Generate
        </Button>
      </SaveAreaView>
    </ScrollView>
  );
}

function ConfiguratorBasis() {
  const [questions] = useAtom(dropdownMenuQuestionAtom);
  const [languages] = useAtom(dropdownMenuLanguageAtom);
  const [difficulties] = useAtom(dropdownMenuDifficultyAtom);
  const [languageStyles] = useAtom(dropdownMenuLanguageStyleAtom);
  const [accurateness, setAccurateness] = useAtom(creativityAtom);

  return (
    <YStack space>
      <YStack space={10}>
        <Label>Questions</Label>
        <DropdownMenu
          items={questions}
          label={"Number of Questions"}
          atom={questionAtom}
        />
      </YStack>
      <YStack space={10}>
        <Label>Language</Label>
        <DropdownMenu
          items={languages}
          label={"Language"}
          atom={languageAtom}
        />
      </YStack>
      <YStack space={10}>
        <Label>Language Style</Label>
        <DropdownMenu
          items={languageStyles}
          label={"Language style"}
          atom={languageStyleAtom}
        />
      </YStack>
      <YStack space={10}>
        <Label>Difficulty</Label>
        <DropdownMenu
          items={difficulties}
          label={"Language style"}
          atom={difficultyAtom}
        />
      </YStack>
      <YStack paddingTop={20}>
        <Label>Creativity</Label>
        <YStack paddingTop={30}>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            onValueChange={(value) => setAccurateness(value[0])}
          >
            <Slider.Track>
              <Slider.TrackActive />
            </Slider.Track>
            <Slider.Thumb index={0} circular elevate />
          </Slider>
        </YStack>
        <XStack
          paddingTop={20}
          paddingHorizontal={5}
          display="flex"
          justifyContent="space-between"
        >
          <YStack space="$2">
            <Lock size="$1" />
            <Text fontSize="$1">Stick to the topic</Text>
          </YStack>
          <YStack alignItems="flex-end" space="$2">
            <Brush size="$1" />
            <Text fontSize="$1">Get creative</Text>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
}
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
  import { endPageAtom, filesAtom, startPageAtom } from "../../components/DocumentSelect/atoms";
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
  } from "./atoms";
  import { Lock, Brush } from "@tamagui/lucide-icons";

export function ConfiguratorSettings() {
    const [questions] = useAtom(dropdownMenuQuestionAtom);
    const [languages] = useAtom(dropdownMenuLanguageAtom);
    const [difficulties] = useAtom(dropdownMenuDifficultyAtom);
    const [languageStyles] = useAtom(dropdownMenuLanguageStyleAtom);
    const [, setAccurateness] = useAtom(creativityAtom);
  
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
              onValueChange={(value) => setAccurateness(value[0]/100)}
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
  
  
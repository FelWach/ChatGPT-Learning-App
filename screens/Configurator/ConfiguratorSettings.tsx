import {
    Label,
    YStack,
  } from "tamagui";
  import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";
  import { useAtom } from "jotai";
  import {
    languageAtom,
    languageStyleAtom,
    questionAtom,
    dropdownMenuLanguageAtom,
    dropdownMenuLanguageStyleAtom,
    dropdownMenuQuestionAtom,
    difficultyAtom,
    dropdownMenuDifficultyAtom,
  } from "./atoms";

export function ConfiguratorSettings() {
    const [questions] = useAtom(dropdownMenuQuestionAtom);
    const [languages] = useAtom(dropdownMenuLanguageAtom);
    const [difficulties] = useAtom(dropdownMenuDifficultyAtom);
    const [languageStyles] = useAtom(dropdownMenuLanguageStyleAtom);

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
        <YStack space={10} paddingBottom={20}>
          <Label>Difficulty</Label>
          <DropdownMenu
            items={difficulties}
            label={"Language style"}
            atom={difficultyAtom}
          />
        </YStack>
      </YStack>
    );
  }
  
  
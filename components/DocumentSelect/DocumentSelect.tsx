import { Upload, X } from "@tamagui/lucide-icons";
import * as DocumentPicker from "expo-document-picker";
import { Button, Card, Input, Spinner, Text, View, XStack } from "tamagui";
import { atom, useAtom } from "jotai";
import { endPageAtom, filesAtom, startPageAtom } from "./atoms";
import { PDFFile } from "./types";
import { upload } from "../../api/api";
import { NumbersDropdownMenu } from "../DropdownMenu/NumbersDropdownMenu";

const showSpinner = atom(false);
const possiblePages = atom(0);

export function DocumentSelect() {
  const [files, setFiles] = useAtom(filesAtom);
  const [spinner, setSpinner] = useAtom(showSpinner);
  const [startPage, setStartPage] = useAtom(startPageAtom);
  const [endPage, setEndPage] = useAtom(endPageAtom);
  const [possiblePagesNumber, setPossiblePagesNumber] = useAtom(possiblePages);

  const deleteFile = (index: number) => () => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    console.log(newFiles);
  };

  const pickPdf = async () => {
    try {
      setSpinner(true);
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      const formData = new FormData();
      const assets = docRes.assets;
      if (!assets) return;

      const file = assets[0];
      const pdfFile: PDFFile = {
        name: file.name.split(".")[0],
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      formData.append("pdfFile", pdfFile as any);
      
      const response = await upload(formData);

      if (response.status === 200) {
        console.log("File uploaded successfully: ", response.data);
        setFiles([...files, pdfFile]);
        setPossiblePagesNumber(response.data.pages);
      }

    } catch (error) {
      console.log("Error while selecting file: ", error);
      alert('Oopsi! An Error occurred while uploading the file. Please try again.')

    } finally {
      setSpinner(false);
    }
  };

  const uploadButton = () => {
    return (
      <Button
        onPress={pickPdf}
        icon={<Upload size={20} />}
        size="$5"
        variant="outlined"
        height="$7"
      >
        Pick a PDF
      </Button>
    )
  }

  const addButton = () => {
    return (
      <Button
        onPress={pickPdf}
        icon={<Upload size={20} />}
        size="$3"
        variant="outlined"
        height="$5"
      >
        Add More
      </Button>
    )
  }

  return (
    <View space="$3" marginBottom="$3">
      {files.length < 1 ? uploadButton() : null}
      {files.map((file, index) => {
        return (
          <Card  key={index} padding="$3" bordered space>
            <XStack alignItems="center" justifyContent="space-between" space>
              <Text width={250} fontSize="$5">
                {file.name}
              </Text>
              <Button icon={X} width="$3" height="$3" onPress={deleteFile(index)} />
            </XStack>
            <Text fontSize="$4">{possiblePagesNumber} possible Pages were found.</Text>
            <XStack justifyContent="space-between" space alignItems="center">
              <Text fontSize="$4">From Page</Text>
              <NumbersDropdownMenu label="From Page" maxNumber={possiblePagesNumber} atom={startPageAtom}  />
              <Text fontSize="$4">to</Text>
              <NumbersDropdownMenu label="To Page" maxNumber={possiblePagesNumber} atom={endPageAtom} />
            </XStack>
          </Card>
        );
      })}
      {spinner && <Spinner size="large" color="$blue10" />}
    </View >
  );
}

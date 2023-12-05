import { Upload, X } from "@tamagui/lucide-icons";
import * as DocumentPicker from "expo-document-picker";
import { Button, Card, Input, Spinner, Text, View, XStack } from "tamagui";
import { atom, useAtom } from "jotai";
import { filesArray } from "./atoms";
import { PDFFile } from "./types";
import { upload } from "../../api/api";

const showSpinner = atom(false);

export function DocumentSelect() {
  const [files, setFiles] = useAtom(filesArray);
  const [spinner, setSpinner] = useAtom(showSpinner);

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
      console.log(formData);

      const response = await upload(formData);
      console.log(response.data);
      if (response.status === 200) {
        setFiles([...files, pdfFile]);
      }
      setSpinner(false);

    } catch (error) {
      console.log("Error while selecting file: ", error);
      alert('Oopsi! An Error occurred while uploading the file. Please try again.')
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
          <Card padding="$3" bordered space>
            <XStack key={index} alignItems="center" justifyContent="space-between" space>
              <Text width={250} fontSize="$5">
                {file.name}
              </Text>
              <Button icon={X} width="$3" height="$3" onPress={deleteFile(index)} />
            </XStack>
            <XStack justifyContent="space-between" space alignItems="center">
              <Text fontSize="$4">From Page</Text>
              <Input placeholder="1" width={80} />
              <Text fontSize="$4">to</Text>
              <Input placeholder="50" width={80} />
            </XStack>
          </Card>
        );
      })}
      {spinner && <Spinner size="large" color="$blue10" />}
    </View >
  );
}

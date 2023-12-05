import { Upload, X } from "@tamagui/lucide-icons";
import * as DocumentPicker from "expo-document-picker";
import { Button, Spinner, Text, View, XStack } from "tamagui";
import { atom, useAtom } from "jotai";
import { filesArray } from "./atoms";
import { PDFFile } from "./types";

import axios from "axios";

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

  // const pickPdf = async () => {
  //     try {
  //         setSpinner(true);
  //         const docRes = await DocumentPicker.getDocumentAsync({
  //             type:
  //                 "application/pdf"
  //         });
  //         setSpinner(false);
  //         const assets = docRes.assets;
  //         if (!assets) return;

  //         const file = assets[0];
  //         const pdfFile: PDFFile = {
  //             uri: file.uri,
  //             name: file.name,
  //             type: file.mimeType,
  //             size: file.size,
  //         };

  //         setFiles([...files, pdfFile]);
  //         console.log(pdfFile);

  //     } catch (err) {
  //         console.log(err);
  //     }
  // }

  const pickPdf = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      const formData = new FormData();
      const assets = docRes.assets;
      if (!assets) return;

      const file = assets[0];

      const pdfFile = {
        name: file.name.split(".")[0],
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      formData.append("pdfFile", pdfFile as any);

      const { data } = await axios.post(
        "http://10.0.2.2:3000/upload",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  return (
    <View space="$3" marginBottom="$3">
      {files.length < 1 ? (
        <Button
          onPress={pickPdf}
          icon={<Upload size={20} />}
          size="$5"
          variant="outlined"
          height="$7"
        >
          Pick a PDF
        </Button>
      ) : (
        <Button
          onPress={pickPdf}
          icon={<Upload size={20} />}
          size="$3"
          variant="outlined"
          height="$5"
        >
          Add More
        </Button>
      )}
      {files.map((file, index) => {
        return (
          <XStack
            key={index}
            alignItems="center"
            justifyContent="space-between"
            space
          >
            <Text width={250} fontSize="$5">
              {file.name}
            </Text>
            <Button
              icon={X}
              width="$3"
              height="$3"
              onPress={deleteFile(index)}
            />
          </XStack>
        );
      })}
      {spinner && <Spinner size="large" color="$blue10" />}
    </View>
  );
}

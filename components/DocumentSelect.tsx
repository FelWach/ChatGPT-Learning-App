import { Upload, X } from '@tamagui/lucide-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { Button, Text, View, XStack } from 'tamagui';
import { useAtomValue, useSetAtom, atom, useAtom, PrimitiveAtom } from "jotai";
import { filesArray } from './atoms';

export function DocumentSelect() {
    const [files, setFiles] = useAtom(filesArray);

    const deleteFile = (index: number) => () => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        console.log(newFiles);
    }

    const pickPdf = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type:
                    "application/pdf"
            });
            const assets = docRes.assets;
            if (!assets) return;

            const file = assets[0];
            const pdfFile: PDFFile = {
                uri: file.uri,
                name: file.name,
                type: file.mimeType,
                size: file.size,
            };

            setFiles([...files, pdfFile]);
            console.log(pdfFile);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View space="$3" marginBottom="$3">
            <Button onPress={pickPdf} icon={<Upload size={20} />} size="$5" variant='outlined' height="$7">Pick a PDF</Button>
            {files.map((file, index) => {
                return (
                    <XStack key={index} alignItems='center' justifyContent='space-between' space>
                        <Text width={250}>{file.name}</Text>
                        <Button icon={X} width="$3" height="$3" onPress={deleteFile(index)} />
                    </XStack>
                )
            }
            )}
        </View>
    )
}


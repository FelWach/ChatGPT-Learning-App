import { Upload } from '@tamagui/lucide-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { Button, Text, View } from 'tamagui';

export function DocumentSelect() {
    const [uploaded, setUploaded] = useState("false");
    const pickPdf = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type:
                    "application/pdf"
            });
            const formData = new FormData();
            const assets = docRes.assets;
            if (!assets) return;

            const file = assets[0];
            const pdfFile: Blob = new Blob([file.uri], { type: file.mimeType });

            formData.append("pdfFile", pdfFile);
            setUploaded("true");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View>
            <Button onPress={pickPdf} icon={<Upload size={20} />} size="$5" variant='outlined' height="$7">Pick a PDF</Button>
            <Text>{uploaded}</Text>
        </View>
    )
}


import { atom } from "jotai";
import { PDFFile } from "./types";

export const filesArray = atom<PDFFile[]>([]);

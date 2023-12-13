import { atom } from "jotai";
import { PDFFile } from "./types";

export const filesAtom = atom<PDFFile[]>([]);
export const startPageAtom = atom<string>('1');
export const endPageAtom = atom<string>('1');
//export const filesAtom = atom<PDFFile[]>([]);

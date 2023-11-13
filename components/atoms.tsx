import { PrimitiveAtom, atom } from "jotai";
import { PDFFile } from "./types";

export const filesArray = atom<PrimitiveAtom<PDFFile>[]>([]);

import { useAtom } from "jotai";
import { topicAtom } from "../../state/atoms";
import { endPageAtom, filesAtom, startPageAtom } from "../../components/DocumentSelect/atoms";

const [, setTopic] = useAtom(topicAtom);
const [, setStartPage] = useAtom(startPageAtom);
const [, setEndPage] = useAtom(endPageAtom);
const [, setFiles] = useAtom(filesAtom);

export const resetAtoms = () => {
  setTopic("");
  setStartPage("1");
  setEndPage("1");
  setFiles([]);
}
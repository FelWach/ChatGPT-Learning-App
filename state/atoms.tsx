import { PrimitiveAtom, atom, splitAtom  } from 'jotai'
import { atomWithStorage, atomWithReducer } from 'jotai/utils'
import { UserEntriesProps } from '../screens/TopicsOverview/types'

type UserProps = {
    name: string;
    email: string;
    id: string;
}

export const userAtom = atomWithStorage<UserProps>('user', {
    name: '',
    email: '',
    id: '',
});

// global atom of fetched userEntries
// TODO: add trigger, when User generates new Q&As
export const userEntriesAtom = atomWithStorage<UserEntriesProps[]>('userEntries', []);
import { PrimitiveAtom, atom, splitAtom  } from 'jotai'
import { atomWithStorage, atomWithReducer } from 'jotai/utils'
import { UserEntriesProps } from '../screens/TopicsOverview/types'

export const userAtom = atom<string>('');
export const passwordAtom = atom<string>('');
export const emailAtom = atom<string>('');
export const repeatPasswordAtom = atom<string>('');

export const userIdAtom = atom<number>(1);

// global atom of fetched userEntries
export const userEntriesAtom = atomWithStorage<UserEntriesProps>([]);

import { PrimitiveAtom, atom, splitAtom  } from 'jotai'
import { atomWithStorage, atomWithReducer } from 'jotai/utils'
import { UserEntriesProps } from '../screens/TopicsOverview/types'


export const userIdAtom = atomWithStorage<string>('id', '');

// global atom of fetched userEntries
export const userEntriesAtom = atomWithStorage<UserEntriesProps>([]);
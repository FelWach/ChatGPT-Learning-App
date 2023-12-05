import { PrimitiveAtom, atom, splitAtom  } from 'jotai'
import { atomWithStorage, atomWithReducer } from 'jotai/utils'
import { UserProps } from './types'
import { UserEntriesProps } from '../screens/TopicsOverview/types'

export const userAtom = atomWithStorage<UserProps>('user', {
    name: '',
    email: '',
    id: '',
});

// global atom of fetched userEntries
// TODO: add trigger, when User generates new Q&As
export const userEntriesAtom = atomWithStorage<UserEntriesProps[]>('userEntries', []);
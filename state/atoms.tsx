import { PrimitiveAtom, atom, splitAtom } from 'jotai'
import { atomWithStorage, createJSONStorage, atomWithReducer } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserProps } from './types'
import { UserEntriesProps } from '../screens/TopicsOverview/types'

const userStorage = createJSONStorage(() => AsyncStorage)
const userContent: UserProps = {
    id: '',
    name: '',
    email: '',
}

export const userAtom = atomWithStorage('user', userContent, userStorage);

// global atom of fetched userEntries
// TODO: add trigger, when User generates new Q&As
export const userEntriesAtom = atomWithStorage<UserEntriesProps[]>('userEntries', []);
import { PrimitiveAtom, atom, splitAtom  } from 'jotai'
import { atomWithStorage, atomWithReducer } from 'jotai/utils'

export const usernameOrEmailAtom = atom<string>('');
export const passwordAtom = atom<string>('');

export const userIdAtom = atomWithStorage<string>('id', '');
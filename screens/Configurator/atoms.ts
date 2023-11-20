import {atom} from 'jotai';
import { DropdownMenuItem } from '../../components/DropdownMenu/types';

export const accuratenessAtom = atom<number>(50);
export const questionAtom = atom<string>('10');
export const languageAtom = atom<string>('en');
export const languageStyleAtom = atom<string>('normal');

// read-only atoms
export const dropdownMenuLanguageAtom = atom<DropdownMenuItem[]>((get) =>[
        { value: 'en', name: 'English', id: 'en' },
        { value: 'de', name: 'German', id: 'de' },
        { value: 'fr', name: 'French', id: 'fr' },
])
export const dropdownMenuLanguageStyleAtom = atom<DropdownMenuItem[]>((get) => [
        { value: 'normal', name: 'Normal', id: 'normal' },
        { value: 'academic', name: 'Academic', id: 'academic' },
        { value: 'elementary', name: 'Elementary', id: 'elementary' },
        { value: 'simplified', name: 'Simplified', id: 'simplified' },
])
export const dropdownMenuQuestionAtom = atom<DropdownMenuItem[]>((get) =>[
        { value: '1', name: '1', id: '1' },
        { value: '2', name: '2', id: '2' },
        { value: '3', name: '3', id: '3' },
        { value: '4', name: '4', id: '4' },
        { value: '5', name: '5', id: '5' },
        { value: '6', name: '6', id: '6' },
        { value: '7', name: '7', id: '7' },
        { value: '8', name: '8', id: '8' },
        { value: '9', name: '9', id: '9' },
        { value: '10', name: '10', id: '10' },
        { value: '11', name: '11', id: '11' },
        { value: '12', name: '12', id: '12' },
        { value: '13', name: '13', id: '13' },
        { value: '14', name: '14', id: '14' },
        { value: '15', name: '15', id: '15' },
        { value: '16', name: '16', id: '16' },
        { value: '17', name: '17', id: '17' },
        { value: '18', name: '18', id: '18' },
        { value: '19', name: '19', id: '19' },
        { value: '20', name: '20', id: '20' },
        { value: '21', name: '21', id: '21' },
        { value: '22', name: '22', id: '22' },
        { value: '23', name: '23', id: '23' },
        { value: '24', name: '24', id: '24' },
        { value: '25', name: '25', id: '25' },
        { value: '26', name: '26', id: '26' },
        { value: '27', name: '27', id: '27' },
        { value: '28', name: '28', id: '28' },
        { value: '29', name: '29', id: '29' },
        { value: '30', name: '30', id: '30' }
])

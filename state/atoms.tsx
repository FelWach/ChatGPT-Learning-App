import { PrimitiveAtom, atom, useAtom } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'
import { getEntriesWithTopic, getTopics } from '../api/api';
import { TopicCardProps } from '../components/TopicCards/types';
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserProps } from './types'
import { QuestionsAnswersData } from '../screens/Learning/types';

const userStorage = createJSONStorage(() => AsyncStorage)
const userContent: UserProps = {
    id: '',
    name: '',
    email: '',
}

export const userAtom = atomWithStorage('user', userContent, userStorage);

// TODO: optimize error handling -> will show "No Learnsets text' also if there was an error
export const [topicCardAtom] = atomsWithQuery<TopicCardProps[]>((get) => ({
    queryKey: ['topics', get(userAtom)],
    queryFn: async ({ queryKey: [, user] }) => {
        try {
            console.log("User in atoms: ");
            console.log(user);
            console.log("fetching");
            console.log(user.id);
            const response = await getTopics(Number(user.id));
            const topicCards: TopicCardProps[] = [];
            for (let i = 0; i < response.length; i++) {
                topicCards.push({ headline: response[i].topic, numberOfLearncards: response[i].count });
            }
            console.log("Fetched data:");
            console.log(topicCards);
            return topicCards;
        }
        catch (error) {
            console.log("Error:" + error);
            return [];
        }
    }
}));

export const dataLoadingAtom = atom(false);

export const emailAtom = atomWithStorage<string>('email', '');
export const passwordAtom = atomWithStorage<string>('password', '');

export const topicAtom = atom<string>('');

export const [questionsAnswersAtom] = atomsWithQuery<QuestionsAnswersData[]>((get) => ({
    queryKey: ['questionsAnswers', get(userAtom), get(topicAtom)],
    queryFn: async ({ queryKey: [, user, topic] }) => {
        try {
            const response = await getEntriesWithTopic(Number(user.id), String(topic));
            
            const questions: QuestionsAnswersData[] = [];
            for (let i = 0; i < response.length; i++) {
                questions.push({ id: response[i].id, Q: response[i].Q, A: response[i].A });
            }
            
            return questions;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
}));
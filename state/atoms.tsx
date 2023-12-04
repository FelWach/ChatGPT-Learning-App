import { PrimitiveAtom, atom, useAtom } from 'jotai'
import { atomWithStorage, atomWithReducer } from 'jotai/utils'
import { atomsWithQuery } from 'jotai-tanstack-query'
import { getEntriesWithTopic, getTopics } from '../api/api';
import { TopicCardProps } from '../components/TopicCards/types';
import { QuestionsAnswersData } from '../screens/Learning/types';
import { AxiosResponse } from 'axios';

export const userIdAtom = atomWithStorage<string>('id', '');

// TODO: optimize error handling -> will show "No Learnsets text' also if there was an error
export const [topicCardAtom] = atomsWithQuery<TopicCardProps[]>((get) => ({
    queryKey: ['topics', get(userIdAtom)],
    queryFn: async ({ queryKey: [, id] }) => {
        try {
            const response = await getTopics(Number(id));
            const topicCards: TopicCardProps[] = [];
            for (let i = 0; i < response.length; i++) {
                topicCards.push({ headline: response[i].topic, numberOfLearncards: response[i].count });
            }
            console.log(topicCards);
            return topicCards;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
}));

export const emailAtom = atomWithStorage<string>('email', '');
export const passwordAtom = atomWithStorage<string>('password', '');

export const topicAtom = atom<string>('');

export const [questionsAnswersAtom] = atomsWithQuery<QuestionsAnswersData[]>((get) => ({
    queryKey: ['questionsAnswers', get(userIdAtom), get(topicAtom)],
    queryFn: async ({ queryKey: [, id, topic] }) => {
        try {
            const response = await getEntriesWithTopic(Number(id), String(topic));
            
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
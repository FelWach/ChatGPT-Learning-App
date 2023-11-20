export interface UserProps {
    name: string;
    email: string;
    password: string;
}

export interface LoginProps {
    usernameOrEmail: string;
    password: string;
}

export interface GenerateProps {
    topic: string,
    nbQuestions: number
}

export interface ConfigSettingsProps {
    language: string,
    languageLevel: string,
    difficulty: string,
    temperature: number
}


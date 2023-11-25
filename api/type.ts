export interface UserProps {
    name: string;
    email: string;
    password: string;
}

export interface UpdatedUserProps {
    name?: string;
    email?: string;
    password?: string;
    oldPassword?: string;
}

export interface LoginProps {
    usernameOrEmail: string;
    password: string;
}

export interface GenerateProps {
    topic: string;
    nbQuestions: number;
}

export interface GenerateFromDocsProps {
    nbQuestions: number;
    pageStart?: number;
    pageEnd?: number;
}

export interface ConfigSettingsProps {
    language: string;
    languageLevel: string;
    difficulty: string;
    temperature: number;
}

export interface UploadProps {
    uri: string;
    name: string;
    size: number;
}


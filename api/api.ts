import axios from 'axios'
// .env variables
const localhost = process.env.EXPO_PUBLIC_IP_ADDRESS;
const port = process.env.EXPO_PUBLIC_PORT;

// type interfaces
import { UserProps, UpdatedUserProps, LoginProps, GenerateProps, GenerateFromDocsProps, ConfigSettingsProps, UploadProps } from "./type"

// base URL
const baseUrl = `http://${localhost}:${port}`


// USER ROUTES
// post addUser: for registration process
export async function addUser(data: UserProps) {
    try {
        const response = await axios.post(`${baseUrl}/addUser`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}

// get users: for getting all users
export async function users() {
    try {
        const response = await axios.get(`${baseUrl}/users`,  {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}

// delete user: for deleting a user
export async function deleteUser(id: number) {
    try {
        const response = await axios.delete(`${baseUrl}/deleteUser/${id}`, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}

// post login: for login
export async function login(data: LoginProps) {
    try {
        const response = await axios.post(`${baseUrl}/login`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}

// post register: for registration
export async function register(data: UserProps) {
    try {
        const response = await axios.post(`${baseUrl}/register`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}

// put updateUser: for updating a user
export async function updateUser(id: number, data: UpdatedUserProps) {
    try {
        const response = await axios.put(`${baseUrl}/updateUser/${id}`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error: any) {
        throw error.response.data
    }
}

// LANGCHAIN ROUTES
// post upload: to upload the pdf, returns the number of pages
export async function upload(data: UploadProps) {
    try {
        const response = await axios.post(`${baseUrl}/upload`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch (error: any) {
        throw error.response.data
    }
}

// post generateFromDocs: for generating Q&As after uploading a pdf
export async function generateFromDocs(uploadData: UploadProps, data: GenerateFromDocsProps) {

    try {
        const response =  await upload(uploadData);
        console.log(response.message)
    }
    catch(error: any){
        console.log(error.error)
    }

    try {
        const response = await axios.post(`${baseUrl}/generateFromDocs`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch (error: any) {
        throw error.response.data
    }
}


// post generate: generates Q&As and saves them in the database (currently only for 'user 1'), needs topic in request body
export async function generate(data: GenerateProps) {
    try {
        const response = await axios.post(`${baseUrl}/generate`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch(error) {
        throw 'Error occured while generating Q&As'
    }
}

// post generate: generates Q&As and saves them in the database (currently only for 'user 1'), needs topic as url param
export async function generate2(topic: string) {
    try{
        const response = await axios.post(`${baseUrl}/generate`,  {params: {topic: topic}}, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch(error) {
        throw 'Error occured while generating Q&As'
    }
}

// post setConfigurations: saves the configurator settings
export async function setConfiguration(settings: ConfigSettingsProps ) {
    try {
        const response = await axios.post(`${baseUrl}/setConfiguration`, settings, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw 'Error occured while generating Q&As'
    }
}

// ENTRY ROUTES
// get entries: returns all Q&As with id and topic
export async function getEntries() {
    try {
        const response = await axios.get(`${baseUrl}/entries`, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}

// get entries: returns all Q&As from a user
export async function getUserEntries(userId: number) {
    try {
        const response = await axios.get(`${baseUrl}/entries`, {params: {userId: userId}}, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}

// get entries: returns all Q&As from a user for a specific topic
export async function getEntriesWithTopic(userId: number, topic: string) {
    try {
        const response = await axios.get(`${baseUrl}/entries`, {params: {userId: userId, topic: topic}}, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}

// get entry: returns a specific Q&A
export async function getEntry(id: number) {
    try {
        const response = await axios.get(`${baseUrl}/entry/${id}`, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}

// delete entry: deletes a specific Q&A
export async function deleteEntry(id: number) {
    try {
        const response = await axios.delete(`${baseUrl}/deleteEntry/${id}`, {headers: { 'Content-Type': 'application/json'}});
        return response.data
    }
    catch(error) {
        throw error.response.data
    }
}
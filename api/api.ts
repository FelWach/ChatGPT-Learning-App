import axios from 'axios'

// .env variables
const openaiApiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const localhost = process.env.EXPO_PUBLIC_IP_ADDRESS;
const port = process.env.EXPO_PUBLIC_PORT;

// type interfaces
import { UserProps } from "./type"

// base URL
const baseUrl = `http://${localhost}:${port}`

// post addUser
export async function addUser(data: UserProps) {
    try{
        const response = await axios.post(`${baseUrl}/addUser`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

// get entries
export async function entries(id: number) {
    try{
        const response = await axios.get(`${baseUrl}/entries`, {params: {userId: id}, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

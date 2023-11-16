import axios from 'axios'
// .env variables
const openaiApiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const localhost = process.env.EXPO_PUBLIC_IP_ADDRESS;
const port = process.env.EXPO_PUBLIC_PORT;

// type interfaces
import { UserProps } from "./type"

// base URL
const baseUrl = `http://${localhost}:${port}`

// post addUser: for registration process
export async function addUser(data: UserProps) {
    try{
        const response = await axios.post(`${baseUrl}/addUser`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

// post generate: generates Q&As and saves them in the database (currently only for 'user 1'), needs topic in request body
export async function generate(data: UserProps) {
    try{
        const response = await axios.post(`${baseUrl}/addUser`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

// post generate: generates Q&As and saves them in the database (currently only for 'user 1'), topic as url param
export async function generate(topic: string) {
    try{
        const response = await axios.post(`${baseUrl}/addUser`,  data, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

// post setConfigurations: saves the configurator settings
export async function setConfigurations(settings: ) {
    try{
        const response = await axios.get(`${baseUrl}/entries`, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

// get entries: returns all Q&As with id and topic
export async function entries() {
    try{
        const response = await axios.get(`${baseUrl}/entries`, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

// get entries: returns all Q&As from a user
export async function entries(id: number) {
    try{
        const response = await axios.get(`${baseUrl}/entries`, {params: {id: id}, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

// get entries: returns all Q&As from a user for a specific topic
export async function entries(id: number, topic: string) {
    try{
        const response = await axios.get(`${baseUrl}/entries`, {params: {userId: id}, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

// get entry: returns a specific Q&A
export async function entry(id: number) {
    try{
        const response = await axios.get(`${baseUrl}/entries`, {params: {userId: id}, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}

// delete entry: deletes a specific Q&A
export async function deleteEntry(id: number) {
    try{
        const response = await axios.get(`${baseUrl}/entries`, {params: {userId: id}, {headers: { 'Content-Type': 'application/json'}});
        return response
    }
    catch (error) {
        console.log('Error: ' + error)
    }
}
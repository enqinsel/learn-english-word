import axios from "axios";

export const httpServiceMeans = axios.create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en/'
})

export const httpServiceWords = axios.create({
  baseURL: 'https://random-word-api.herokuapp.com/word'
  })
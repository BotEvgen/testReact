import axios from 'axios'

const TestApi = axios.create({
  baseURL: process.env.REACT_APP_TEST  || '',
})

export default TestApi


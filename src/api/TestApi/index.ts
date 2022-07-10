import axios from 'axios'

const MetroApi = axios.create({
  baseURL: process.env.REACT_APP_TEST  || '',
})

export default MetroApi


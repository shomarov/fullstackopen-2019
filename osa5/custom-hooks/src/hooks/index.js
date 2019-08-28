import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return {
    input: {
      type,
      value,
      onChange
    },
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getAll = () => {
      const request = axios.get(baseUrl)
      request.then(response => setResources(response.data))
    }
    getAll()
  }, [baseUrl])

  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, resource, config)
    const newResource = response.data
    setResources(resources.concat(newResource))
    return newResource
  }

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl} /${id}`, newObject)
    return response.data
  }


  const service = {
    create, update, setToken
  }

  return [
    resources, service
  ]
}
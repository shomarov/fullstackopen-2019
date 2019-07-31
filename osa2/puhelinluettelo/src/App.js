import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if ((persons.some(person => person.name === newName))) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number
      with a new one?`)) {
        return
      }

      const personToUpdate = persons.find(person => person.name === newName)
      const updatedPerson = { ...personToUpdate, number: newNumber }

      personService
        .update(updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== returnedPerson.id
              ? person : returnedPerson))
          setNotificationMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${updatedPerson.name} has already
            been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== updatedPerson.id))
        })


      setNewNumber('')
      setNewName('')

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })

    setNewNumber('')
    setNewName('')

  }

  const handleRemoveButtonClick = (personToDelete) => {
    if (!window.confirm(`Delete ${personToDelete.name}?`)) {
      return
    }

    personService
      .remove(personToDelete.id)
      .then(setPersons(persons.filter(person => person.id !== personToDelete.id)))
      .then(
        setNotificationMessage(`Deleted ${personToDelete.name}`))
      .then(
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000))
      .catch(error => {
        setErrorMessage(`Information of ${personToDelete.name} has already
          been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter onFilterChange={handleFilterChange} filter={newFilter} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} onNameChange={handleNameChange}
        nameValue={newName} onNumberChange={handleNumberChange} numberValue={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter}
        handleRemoveButtonClick={handleRemoveButtonClick} />
    </div>
  )

}

export default App
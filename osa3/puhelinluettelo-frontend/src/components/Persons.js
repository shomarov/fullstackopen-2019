import React from 'react'
import Person from './Person'

const filteredPersons = (persons, filter) => persons.filter(person =>
    person.name.toLowerCase().includes(filter.trim().toLocaleLowerCase()))

const Persons = ({ persons, filter, handleRemoveButtonClick }) => {

    const personsToShow = filter.trim() === ''
        ? persons : filteredPersons(persons, filter)

    return (
        personsToShow.map(person =>
            <div key={person.name}>
                <Person person={person}
                handleRemoveButtonClick={handleRemoveButtonClick} />
            </div>
        )
    )
}

export default Persons
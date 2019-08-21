import React from 'react'

const Person = ({ person, handleRemoveButtonClick }) => (
    <div>{person.name} {person.number}
        <button onClick={() => handleRemoveButtonClick(person)}>delete</button>
    </div>
)

export default Person
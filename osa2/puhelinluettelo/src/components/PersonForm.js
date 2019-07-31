import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input onChange={props.onNameChange} value={props.nameValue} /><br />
        number: <input onChange={props.onNumberChange} value={props.numberValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
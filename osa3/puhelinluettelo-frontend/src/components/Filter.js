import React from 'react'

const Filter = ({onFilterChange, filter}) => (
    <div>
        filter shown with <input onChange={onFilterChange} value={filter} />
    </div>
)

export default Filter
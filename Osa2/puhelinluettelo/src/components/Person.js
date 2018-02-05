import React from 'react'

const Person = (props) => {
  console.log(props)
  return (
    <div>{props.person.name} {props.person.number} <button onClick={props.removePerson}>poista</button></div>
  )
}

export default Person

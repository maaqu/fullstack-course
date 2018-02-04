import React from 'react'

const Osa = (props) => {
  return(
    <div>
      <p>{props.kurssi.nimi} {props.kurssi.tehtavia}</p>
    </div>
  )
}

export default Osa

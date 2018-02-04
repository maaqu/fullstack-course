import React from 'react'

const Yhteensa = (props) => {

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const yhteensa = props.kurssi.osat.map(x => x.tehtavia).reduce(reducer)

  return(
    <div>
      yhteensa {yhteensa} tehtävää
    </div>
  )
}

export default Yhteensa

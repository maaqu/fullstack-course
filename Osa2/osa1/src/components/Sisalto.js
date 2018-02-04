import React from 'react'
import Osa from './Osa'

const Sisalto = (props) => {

  const kurssit = props.kurssi.osat

  return(
    <div>
      {kurssit.map(kurssi => <Osa key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )
}

export default Sisalto

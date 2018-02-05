import React from 'react'
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }
  addPerson = (event) => {
    event.preventDefault()

    const names = this.state.persons.map(person => person.name)
    if (names.indexOf(this.state.newName) > -1) {
      alert("Name already added")
      this.setState({
        newName: '',
        newNumber: ''
      })
    } else {
    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const persons = this.state.persons.concat(nameObject)

    this.setState({
      persons,
      newName: '',
      newNumber: ''
    })
  }
  }

  render() {

    const namesToShow =
    this.state.filter.length === 0 ?
      this.state.persons :
      this.state.persons.filter(person =>
        (person.name.toLowerCase().indexOf(this.state.filter) > -1)
      )

    return (
      <div>
        <div>
          debug: {this.state.filter} {this.namesToShow}
        </div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä<input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          <div>
            numero: <input
            value={this.state.newNumber}
            onChange={this.handleNumberChange}/>
          </div>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {namesToShow.map(person => <Person key={person.name} person={person} />)}
      </div>
    )
  }
}

export default App

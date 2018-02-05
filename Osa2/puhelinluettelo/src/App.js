import React from 'react'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
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
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    personService
    .create(personObject)
    .then(newPerson => {
      this.setState({
      persons: this.state.persons.concat(newPerson),
      newName: '',
      newNumber: '',
      message: `Lisättiin '${newPerson.name}' onnistuneesti`
    })
    setTimeout(() => {
            this.setState({message: null})
          }, 5000)
  })
  }
  }

  removePerson = (id) => {
    console.log("removePerson id")
    const person = this.state.persons.find(p => p.id === id)

    return () => {
      personService
        .remove(id)
        .then(removedPerson => {
          console.log(removedPerson)
          const persons = this.state.persons.filter(n => n.id !== id)
          this.setState({
            persons: persons,
            message: `Poistettiin '${person.name}' onnistuneesti`
          })
          setTimeout(() => {
                  this.setState({message: null})
                }, 5000)
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
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.message}/>
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
        {namesToShow.map(person => <Person key={person.id} person={person} removePerson={this.removePerson(person.id)}/>)}
      </div>
    )
  }
}

export default App

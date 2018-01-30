import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {
  return(
    <div>
      <div>{props.anecdotes[props.highest]}</div>
      <div>has {props.highestp} votes</div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: new Array(this.props.anecdotes.length).fill(0)
    }
  }

  arvoAnekdootti = (size) => {
     return () => {
       this.setState({selected: Math.floor(Math.random() * size)})
     }
  }

  voteAnekdootti = (number) => {
    return () => {
      const kopio = [...this.state.pisteet]
      kopio[number] += 1
      this.setState({
        pisteet: kopio
      })
    }
  }

  render() {
    const kopio = [...this.state.pisteet]
    const highest = kopio.indexOf(Math.max(...kopio))
    return (
      <div>
      <div>
        {this.props.anecdotes[this.state.selected]}
      </div>
      <div>has {this.state.pisteet[this.state.selected]} votes</div>
      <div>
        <button onClick={this.voteAnekdootti(this.state.selected)}>vote</button>
        <button onClick={this.arvoAnekdootti(this.props.anecdotes.length)}>next anecdote</button>
      </div>
      <h1>anecdote with most votes:</h1>
      <Anecdote highest={highest} anecdotes={this.props.anecdotes} highestp={this.state.pisteet[highest]}/>
    </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

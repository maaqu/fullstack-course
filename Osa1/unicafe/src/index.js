import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return(
      <button onClick={props.handleClick}>{props.name}</button>
  )
}

const Statistics = (props) => {
  if (props.stats[5].value === 0) {
    return(
      <div>ei yhtään palautetta annettu</div>
    )
  }
  return(
    <table>
      <tbody>
        <Statistic stat={props.stats[0]}/>
        <Statistic stat={props.stats[1]}/>
        <Statistic stat={props.stats[2]}/>
        <Statistic stat={props.stats[3]}/>
        <Statistic stat={props.stats[4]}/>
      </tbody>
    </table>
  )
}

const Statistic = (props) => {
  return(
    <tr>
      <td>{props.stat.name}</td>
      <td>{props.stat.value}</td>
    </tr>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      summa: 0
    }
  }

  kasvataArvoa = (nimi) => {
    return() => {
      this.setState({
        [nimi]: this.state[nimi] + 1,
        summa: this.state.summa + 1})
    }
  }

  render() {
    const stats = [
        {name: "hyvä", value: this.state.hyva},
        {name: "neutraali", value: this.state.neutraali},
        {name: "huono", value: this.state.huono},
        {name: "keskiarvo", value: parseFloat((this.state.hyva-this.state.huono)/this.state.summa).toFixed(2)},
        {name: "positiivisia", value: parseFloat((this.state.hyva/this.state.summa)*100).toFixed(1) + "%"},
        {name: "summa", value: this.state.summa}
    ]

    return (
      <div>
        <h1>anna palautetta</h1>
        <div>
        <Button name="hyvä" handleClick={this.kasvataArvoa("hyva")}/>
        <Button name="neutraali" handleClick={this.kasvataArvoa("neutraali")}/>
        <Button name="huono" handleClick={this.kasvataArvoa("huono")}/>
        </div>
        <h1>statistiikka</h1>
        <Statistics stats={stats}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

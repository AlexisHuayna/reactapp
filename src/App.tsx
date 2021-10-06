import React from 'react';
import './App.css';

type SquareProps = {
  value: string;
  inRow: boolean;
  onClick: () => void;
}

type BoardProps = {
  squares: string[];
  winnerRow: number[] | null;
  onClick: (i: number) => void;
}

type GameState = {
  history: { squares: string [], move: number }[];
  xIsNext: boolean;
  stepNumber: number;
  back: boolean;
}

const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

const Square = ({value, inRow, onClick}: SquareProps) => {
  return (
    <button
      className={"square " + (inRow ? "text-red-600" : "")}
      onClick={onClick}>
        {value}
    </button>
  );
};

const Board = (props  : BoardProps) => {

  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  return (
    <div>
      {
        rows.map((r) => {
          const row = cols.map((col) => {
            const i = (r * 3) + col;
            return (
              <Square
                key={i}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
                inRow={props.winnerRow && props.winnerRow.includes(i) ? true : false}/>
            );
          });

          return (
            <div key={r} className="board-row">
              {row}
            </div>
          );
        })
      }
    </div>
  );
  
}

class Game extends React.Component<{}, GameState> {
  state: GameState = {
    history: [ { squares: Array(9).fill(null), move: -1 } ],
    xIsNext: true,
    stepNumber: 0,
    back: false
  }

  handleClick = (i: number) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    if(winner || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        move: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      back: false
    });
  }

  jumpTo(step: number){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 ) === 0,
      back: true
    })
  }

  getCoordinate(position: number){
    if(position === 8){
      return [3, 3]
    } else if(position === 7) {
      return [2, 3]
    } else if(position === 6) {
      return [1, 3]
    } else if(position === 5) {
      return [3, 2]
    } else if(position === 4) {
      return [2, 2]
    } else if(position === 3) {
      return [1, 2]
    } else if(position === 2) {
      return [3, 1]
    } else if(position === 1) {
      return [2, 1]
    } else {
      return [1, 1]
    }
  }

  reorder() {
    const history = this.state.history;
    
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const position = this.getCoordinate(step.move);
      const desc = move ?
        'Go to move #' + move  + ' last play in (' + position[0] + ' - ' + position[1] + ')':
        'GO to game start';

      return (
        <li key={move}>
          <button
            className={this.state.stepNumber === move  && this.state.back? 'text-red-700' : ''}
            onClick={()=> this.jumpTo(move)}>
              {desc}
          </button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = 'Winner: ' + current.squares[winner[0]];
    } else {
      if(this.state.stepNumber === 9) {
        status = 'Draw';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }



    return (
      <div className="game container">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winnerRow={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button
            onClick={() => this.reorder()}>Change</button>
        </div>
      </div>
    );
  }
}

const App = () => {
  return (
    <Game />
  );
}

export default App;

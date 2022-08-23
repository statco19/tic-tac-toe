import React from "react";
import ReactDOM from "react-dom/client";
import Switch from "./components/Switch";
import "./index.scss";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    var divs = [];
    for (let i = 0; i < 3; ++i) {
      var elements = [];
      for (let j = 0; j < 3; ++j) {
        elements.push(this.renderSquare(i * 3 + j));
      }
      divs.push(
        <div key={i} className="board-row">
          {elements}
        </div>
      );
    }
    return <div>{divs}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          clickedSquare: [0, 0],
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      isChecked: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? "X" : "O";
    // if(this.state.isChecked) {
    //   i = history.length
    // }
    this.setState({
      history: history.concat([
        {
          squares: squares,
          clickedSquare: [Math.floor(i / 3 + 1), Math.floor((i % 3) + 1)], // (row, col)
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleToggle() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    const active = {
      fontWeight: "bold",
    };

    const inactive = {
      fontWeight: "normal",
    };

    var history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    /* 
      if set to descending order, history is reversed
     */
    if (this.state.isChecked) {
      history = history.slice().reverse();
    }

    const moves = history.map((step, move) => {
      const clickedSquare = step.clickedSquare;

      var desc;
      var key;
      if (this.state.isChecked) {
        // descending order
        key = this.state.stepNumber - move;
        desc =
          move === this.state.stepNumber
            ? `Go to game start`
            : `Move #${key} - (${clickedSquare[0]},${clickedSquare[1]})`;
      } else {
        // ascending order
        key = move;
        desc = move
          ? `Move #${key} - (${clickedSquare[0]},${clickedSquare[1]})`
          : `Go to game start`;
      }

      return (
        <li key={key}>
          <button
            style={this.state.stepNumber === key ? active : inactive}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <Switch
            isChecked={this.state.isChecked}
            handleToggle={() => this.handleToggle()}
          />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

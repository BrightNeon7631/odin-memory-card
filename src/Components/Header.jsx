export default function Header(props) {
    return (
      <header>
        <div>Memory Game</div>
        <div className="header--score">
            <div>
                Score: {props.score}
            </div>
            <div>
                Best score: {props.bestScore}
            </div>
        </div>
      </header>
    );
}
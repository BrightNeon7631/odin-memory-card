export default function Card(props) {
    return (
        <div className="card" onClick={() => props.handleClick(props.id)}>
            <div className="card--kanji">
                {props.kanji}
            </div>
            <div className="card--translation">
                {props.translation}
            </div>
        </div>
    )
}
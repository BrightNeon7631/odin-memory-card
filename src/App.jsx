import { 
  useState, 
  useEffect 
} from 'react';
import kanjiArray from './kanjiData';
import Header from './Components/Header';
import Card from './Components/Card';

const fisherYates = (toShuffle = []) => {
  for (let i = (toShuffle.length - 1); i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [toShuffle[i], toShuffle[randomIndex]] = [toShuffle[randomIndex], toShuffle[i]];
  }
  return toShuffle;
};

function App() {
  const [kanjiData, setKanjiData] = useState(kanjiArray);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const maxClicks = Math.max(...kanjiData.map(element => element.timesClicked));

    if (maxClicks === 2) {
      // saves the best score and resets the game if some item was clicked twice
      setBestScore(prevState => {
        return prevState < score - 1 ? score - 1 : prevState
      });
      setScore(0);
      setKanjiData(kanjiArray);
    } else {
      // shuffles items
      setKanjiData(prevState => fisherYates(prevState));
    }
  }, [kanjiData]);

  function handleClick(id) {
    setKanjiData((prevState) => {
      return prevState.map((element) => {
        return element.id === id ? {...element, timesClicked: element.timesClicked + 1} : element
      })
    });
    setScore(prevState => prevState + 1);
  }
  
  const cardsElement = kanjiData.map((element) => {
    return (
      <Card 
        key={element.id}
        id={element.id}
        kanji={element.kanji}
        translation={element.translation}
        handleClick={handleClick}
      />
    )
  });

  return (
    <div>
      <Header 
        score={score}
        bestScore={bestScore}
      />
      <div className='cards--container'>
        {cardsElement}
      </div>
    </div>
  )
}

export default App;
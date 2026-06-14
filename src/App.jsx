// src/App.jsx
import { useState } from 'react';
import Flashcard from './components/Flashcard'; // Import your new component
import './App.css';
import armo from './assets/armo.jpg';
import axo from './assets/axo.jpg'
import capy from './assets/capy.jpg'
import hedge from './assets/hedge.jpg'
import koala from './assets/koala.jpg'
import komodo from './assets/komodo.jpg'
import oran from './assets/oran.webp'
import redp from './assets/redp.jpeg'
import sbs from './assets/sbs.jpeg'
import tree from './assets/tree.webp'

const ANIMAL_DATA = [
  { id: 1, image:armo, answer:"Armadillo" },
  { id: 2, image:axo, answer:"Axolotl" },
  { id: 3, image:capy, answer:"Capybara" },
  { id: 4, image:hedge, answer:"Hedgehog" },
  { id: 5, image:koala, answer:"Koala" },
  { id: 6, image:komodo, answer:"Komodo Dragon" },
  { id: 7, image:oran, answer:"Orangutan" },
  { id: 8, image:redp, answer:"Red Panda" },
  { id: 9, image:sbs, answer:"Shoebill Stork" },
  { id: 10, image:tree, answer:"Tree Frog" }
];

// Fisher–Yates shuffle: returns a new randomly-ordered copy
const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const App = () => {
  // Shuffle once when the component first mounts (lazy initializer)
  const [deck, setDeck] = useState(() => shuffle(ANIMAL_DATA));
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = deck[currentIndex];

  const handleShuffle = () => {
    setDeck(shuffle(ANIMAL_DATA));
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % deck.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + deck.length) % deck.length);
  };

  return (
    <div className="jungle-bg">
      <div className="content">
        <h1>Name The Animal</h1>
        <h3>Meet the planet's wildest residents. Test your memory, learn new species, and master the animal kingdom one card at a time</h3>

        <Flashcard
          image={currentCard.image}
          answer={currentCard.answer}
          currentIndex={currentIndex}
        />

        <div>
          <button onClick={handlePrev} className="nav-btn">← Prev</button>
          <span className="card-counter">{currentIndex + 1} / {deck.length}</span>
          <button onClick={handleNext} className="nav-btn">Next →</button>
        </div>

        <button onClick={handleShuffle} className="nav-btn">Shuffle</button>

      </div>
    </div>
  );
};

export default App;
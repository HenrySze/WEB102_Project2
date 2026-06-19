// src/App.jsx
import { useState } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';
import armo from './assets/armo.jpg';
import axo from './assets/axo.jpg';
import capy from './assets/capy.jpg';
import hedge from './assets/hedge.jpg';
import koala from './assets/koala.jpg';
import komodo from './assets/komodo.jpg';
import oran from './assets/oran.webp';
import redp from './assets/redp.jpeg';
import sbs from './assets/sbs.jpeg';
import tree from './assets/tree.webp';

const ANIMAL_DATA = [
  { id: 1, image: armo, answer: "Armadillo" },
  { id: 2, image: axo, answer: "Axolotl" },
  { id: 3, image: capy, answer: "Capybara" },
  { id: 4, image: hedge, answer: "Hedgehog" },
  { id: 5, image: koala, answer: "Koala" },
  { id: 6, image: komodo, answer: "Komodo Dragon" },
  { id: 7, image: oran, answer: "Orangutan" },
  { id: 8, image: redp, answer: "Red Panda" },
  { id: 9, image: sbs, answer: "Shoebill Stork" },
  { id: 10, image: tree, answer: "Tree Frog" }
];

const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const App = () => {
  // --- State ---
  const [deck, setDeck] = useState(() => shuffle(ANIMAL_DATA));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState(""); // "", "correct", or "incorrect"
  
  // Streak States
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  
  // Mastered Cards Tracking (stores card IDs)
  const [masteredIDs, setMasteredIDs] = useState([]);

  // --- Derived State ---
  // Filter out cards that the user has mastered
  const activeDeck = deck.filter(card => !masteredIDs.includes(card.id));
  const currentCard = activeDeck[currentIndex];

  // --- Actions & Handlers ---
  const resetGuessState = () => {
    setUserGuess("");
    setFeedback("");
  };

  const handleShuffle = () => {
    setDeck(shuffle(ANIMAL_DATA));
    setCurrentIndex(0);
    resetGuessState();
  };

  const handleNext = () => {
    if (currentIndex < activeDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetGuessState();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetGuessState();
    }
  };

  const handleCheckGuess = (e) => {
    e.preventDefault();
    if (!currentCard) return;

    // Loose string matching: lowercased and trimmed of whitespace
    const normalizedGuess = userGuess.trim().toLowerCase();
    const normalizedAnswer = currentCard.answer.trim().toLowerCase();

    if (normalizedGuess === normalizedAnswer) {
      setFeedback("correct");
      const nextStreak = currentStreak + 1;
      setCurrentStreak(nextStreak);
      if (nextStreak > longestStreak) {
        setLongestStreak(nextStreak);
      }
    } else {
      setFeedback("incorrect");
      setCurrentStreak(0);
    }
  };

  const handleMasterCard = () => {
    if (!currentCard) return;
    
    // Add current card ID to mastered list
    setMasteredIDs([...masteredIDs, currentCard.id]);
    resetGuessState();
    
    // Adjust index if we are removing the last card in the deck
    if (currentIndex >= activeDeck.length - 1 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetPool = () => {
    setMasteredIDs([]);
    setCurrentIndex(0);
    resetGuessState();
  };

  // --- Render Helpers ---
  if (activeDeck.length === 0) {
    return (
      <div className="jungle-bg">
        <div className="content">
          <h1> 🎉 Congratulations! 🎉</h1>
          <h3>You have mastered all the animals in the jungle!</h3>
          <button onClick={handleResetPool} className="nav-btn">Reset Deck</button>
        </div>
      </div>
    );
  }

  return (
    <div className="jungle-bg">
      <div className="content">
        <h1>Name The Animal</h1>
        <h3>Meet the planet's wildest residents. Test your memory, learn new species, and master the animal kingdom one card at a time</h3>

        {/* Streak Counters */}
        <div className="streak-container">
          <p>Current Streak: <strong>{currentStreak}</strong></p>
          <p>Longest Streak: <strong>{longestStreak}</strong></p>
        </div>

        <Flashcard
          image={currentCard.image}
          answer={currentCard.answer}
          currentIndex={currentIndex}
          feedback={feedback} 
        />

        {/* Form Input for guessing */}
        <form onSubmit={handleCheckGuess} className="guess-form">
          <input
            type="text"
            placeholder="Place your guess here..."
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className={`guess-input ${feedback}`}
            disabled={feedback === "correct"}
          />
          <button type="submit" className="submit-btn">Submit Guess</button>
        </form>

        {/* Navigation Controls */}
        <div className="nav-controls">
          <button 
            onClick={handlePrev} 
            className="nav-btn" 
            disabled={currentIndex === 0}
          >
            ← Prev
          </button>
          
          <span className="card-counter">
            {currentIndex + 1} / {activeDeck.length}
          </span>
          
          <button 
            onClick={handleNext} 
            className="nav-btn" 
            disabled={currentIndex === activeDeck.length - 1}
          >
            Next →
          </button>
        </div>

        {/* Utility Buttons */}
        <div className="utility-controls">
          <button onClick={handleShuffle} className="nav-btn">Shuffle Deck</button>
          <button onClick={handleMasterCard} className="master-btn">⭐ Mark as Mastered</button>
        </div>

      </div>
    </div>
  );
};

export default App;
import { useState } from 'react';
import Flashcard from './Flashcard';
import { flashcards } from '../data/flashcards';

function FlashcardList() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setIndex(randomIndex);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Brazilian Portuguese Flashcards</h1>
      <p>Here's your favorite study buddy to learn common words and phrases</p>
      <p>Total number of cards: {flashcards.length}</p>

      <Flashcard card={flashcards[index]} />

      <button onClick={handleNext} style={{
        marginTop: "10px",
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer"
      }}>
        Next Card
      </button>
    </div>
  );
}

export default FlashcardList;

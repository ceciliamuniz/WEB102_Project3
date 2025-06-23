import { useState } from 'react';
import Flashcard from './Flashcard';
import { flashcards } from '../data/flashcards';

function FlashcardList() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < flashcards.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Brazilian Portuguese Flashcards</h1>
      <p>Here's your favorite study buddy to learn common words and phrases</p>
      <p>Total number of cards: {flashcards.length}</p>

      <Flashcard card={flashcards[index]} />

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handlePrevious}
          disabled={index === 0}
          style={{
            ...buttonStyle,
            opacity: index === 0 ? 0.5 : 1,
            cursor: index === 0 ? "not-allowed" : "pointer"
          }}
        >
          Previous Card
        </button>

        <button
          onClick={handleNext}
          disabled={index === flashcards.length - 1}
          style={{
            ...buttonStyle,
            marginLeft: "10px",
            opacity: index === flashcards.length - 1 ? 0.5 : 1,
            cursor: index === flashcards.length - 1 ? "not-allowed" : "pointer"
          }}
        >
          Next Card
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "5px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none"
};

export default FlashcardList;

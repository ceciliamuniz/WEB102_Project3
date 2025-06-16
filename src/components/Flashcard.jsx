import { useState, useEffect } from 'react';


function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[a.length][b.length];
}

function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setFlipped(false);       
    setUserAnswer('');       
    setIsCorrect(null);      
  }, [card]);


  const checkAnswer = () => {
    const correct = card.back.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const user = userAnswer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const distance = levenshtein(correct, user);
    setIsCorrect(distance <= 2); 
  };


  return (
    <div>
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          cursor: "pointer",
          padding: "40px",
          margin: "20px auto",
          border: "1px solid #ccc",
          width: "300px",
          textAlign: "center",
          borderRadius: "10px",
          backgroundColor: "#fefefe",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          fontSize: "24px",
        }}
      >
        {flipped ? card.back : card.front}
      </div>

      <input
        type="text"
        placeholder="Type your answer here"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginTop: "10px",
          fontSize: "16px"
        }}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={checkAnswer} style={buttonStyle}>Check</button>
      </div>

      {isCorrect !== null && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: isCorrect ? "green" : "red" }}>
          {isCorrect ? "Correct! 🎉" : "Wrong! Try again."}
        </p>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer"
};

export default Flashcard;

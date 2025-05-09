
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type MemoryCard = {
  id: number;
  widgetName: string;
  matched: boolean;
  flipped: boolean;
};

const widgetPairs = [
  'Container',
  'Card',
  'FloatingActionButton',
  'BottomNavigationBar',
  'AppBar',
  'Drawer',
  'AlertDialog',
  'TabBar'
];

const FlutterUIMemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  // Initialize game
  const initializeGame = () => {
    const duplicatedWidgets = [...widgetPairs, ...widgetPairs];
    
    // Shuffle array
    const shuffledWidgets = duplicatedWidgets.sort(() => Math.random() - 0.5);
    
    // Create cards
    const newCards = shuffledWidgets.map((widget, index) => ({
      id: index,
      widgetName: widget,
      matched: false,
      flipped: false
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameCompleted(false);
    setGameStarted(true);
  };
  
  // Handle card flip
  const handleCardFlip = (cardId: number) => {
    // Do nothing if same card is clicked
    if (flippedCards.includes(cardId)) return;
    
    // Do nothing if two cards are already flipped
    if (flippedCards.length === 2) return;
    
    // Update the flipped state of the clicked card
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, flipped: true } : card
    );
    
    setCards(updatedCards);
    setFlippedCards([...flippedCards, cardId]);
  };
  
  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);
      
      // Check if cards match
      if (firstCard && secondCard && firstCard.widgetName === secondCard.widgetName) {
        // Match found
        const updatedCards = cards.map(card => 
          card.id === firstCardId || card.id === secondCardId
            ? { ...card, matched: true }
            : card
        );
        
        setCards(updatedCards);
        setFlippedCards([]);
        setMatchedPairs(matchedPairs + 1);
        
        // Check if game is completed
        if (matchedPairs + 1 === widgetPairs.length) {
          setGameCompleted(true);
        }
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          const updatedCards = cards.map(card => 
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, flipped: false }
              : card
          );
          
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matchedPairs, moves]);
  
  // Calculate score
  const calculateScore = () => {
    const maxMoves = widgetPairs.length * 2;
    const perfectScore = 100;
    const score = Math.max(0, perfectScore - (moves - widgetPairs.length) * 5);
    return Math.min(perfectScore, score);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Flutter UI Memory Game</h3>
        {gameStarted && !gameCompleted && (
          <div className="flex justify-center gap-6 mt-2">
            <p>Moves: {moves}</p>
            <p>Matches: {matchedPairs}/{widgetPairs.length}</p>
          </div>
        )}
      </div>
      
      {!gameStarted ? (
        <div className="text-center py-10">
          <h4 className="text-lg font-medium mb-4">Match Flutter Widget Cards</h4>
          <p className="text-muted-foreground mb-6">
            Test your memory by matching pairs of Flutter widget cards. Try to complete the game in as few moves as possible!
          </p>
          <Button onClick={initializeGame}>Start Game</Button>
        </div>
      ) : gameCompleted ? (
        <div className="text-center py-10 space-y-6">
          <h4 className="text-2xl font-bold">Congratulations!</h4>
          <p className="text-lg">
            You completed the game in {moves} moves.
          </p>
          <div className="text-xl font-semibold">
            Score: {calculateScore()}/100
          </div>
          <Button onClick={initializeGame}>Play Again</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map(card => (
            <div 
              key={card.id}
              className="perspective-500"
              onClick={() => !card.matched && !card.flipped && handleCardFlip(card.id)}
            >
              <div className={`relative h-24 transition-all duration-500 transform-style-3d cursor-pointer ${card.flipped ? 'rotate-y-180' : ''}`}>
                {/* Card Back */}
                <div className={`absolute inset-0 backface-hidden bg-primary/90 rounded-md flex items-center justify-center text-primary-foreground font-bold ${card.flipped ? 'invisible' : ''}`}>
                  <span>Flutter</span>
                </div>
                
                {/* Card Front */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-gray-800 rounded-md border flex items-center justify-center ${card.matched ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : ''}`}>
                  <span className="font-medium text-sm text-center px-2">{card.widgetName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlutterUIMemoryGame;

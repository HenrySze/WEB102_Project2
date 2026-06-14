import  { useState, useEffect }  from 'react';

const Flashcard = ({ image, answer, currentIndex }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setIsFlipped(false);
    }, [currentIndex]);

    return (
    <div 
      className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-inner">
        <div className="card-front">
            <img className='image' src={image}/>
        </div>

        <div className="card-back">
            <span className="card-answer-label">ANSWER:</span>
            <h2>{answer}</h2>
            <span className="tap-prompt">Tap to flip back</span>
        </div>
      </div>
    </div>
    )
}   

export default Flashcard
import { useState, useEffect, useRef  } from 'react'
import Tile from "@/puzzle/tile"
import WinMinigameDialog from './dialogs/win-minigame.dialog';
import { IMinigame } from '@/types';

const shuffleArray = (array: number[]): number[] => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

interface IMinigameProps {
    onWin: () => void 
    onLose: () => void
    minigame: IMinigame
}


const PuzzleMinigame: React.FC<IMinigameProps> = (props) => {
    
    const { onWin, onLose, minigame } = props
    
    const [tiles, setTiles] = useState<number[]>([])

    const [timeLeft, setTimeLeft] = useState<number>(180); // 180 seconds = 3 minutes
    const [isGameActive, setIsGameActive] = useState<boolean>(true);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    //const navigate = useNavigate()

    useEffect(() => {
      let initialTiles = Array.from({ length: 16 }, (_, i) => i);
      initialTiles = shuffleArray(initialTiles);
      setTiles(initialTiles)

      // Start the timer when the game starts
    timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setIsGameActive(false); // End the game when time runs out
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [])
  
    const handleClick = (index: number) => {
      const newTiles = [...tiles];
      const emptyIndex = newTiles.indexOf(0);
      
      const isAdjacent = (index === emptyIndex - 1 && emptyIndex % 4 !== 0) ||
                         (index === emptyIndex + 1 && index % 4 !== 0) ||
                         index === emptyIndex - 4 || 
                         index === emptyIndex + 4;
      
      if (isAdjacent) {
        newTiles[emptyIndex] = newTiles[index];
        newTiles[index] = 0;
        setTiles(newTiles);
      }

      checkSolved();
    };

    const [isSolved, setIsSolved] = useState(false);
    // const [isSolved, setIsSolved] = useState(true);

    const checkSolved = () => {
      for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] !== i + 1) {
          setIsSolved(false);
          return;
        };
      }
      setIsSolved(true);
    };

    const [isWinDialogOpen, setIsWinDialogOpen] = useState( false );

    useEffect(() => {
       if (isSolved) {
         setIsWinDialogOpen(true);
       }
    }, [isSolved])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };

    const handleBack = () => {
        onLose()
    };
    
    return (
      <>
      <div className='
      h-full w-screen top-0 absolute z-50 bg-black'>
        <div className='flex flex-row items-center justify-center w-screen mt-12'>
          <p className='minigame-timer'>{formatTime(timeLeft)}</p>
        </div>
        <div className="puzzle mt-16 flex items-center w-full justify-center">
          {tiles.map((number, index) => (
            <Tile
              key={index}
              number={number}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <div className='absolute top-4 right-4 cursor-pointer' onClick={handleBack}>
          <img className='w-6 h-6' src="/shop/close.png" alt="close" />
        </div>
        {!isGameActive && !isSolved && 
           <div className='absolute bottom-4 w-screen pl-6'>
           <div className='function-btn btn-no-body pt-6'
             onClick={handleBack}
             >Выйти
           </div>
         </div>  
        }
      </div>
      <WinMinigameDialog 
      isOpen={isWinDialogOpen} 
      onClose={handleBack} 
      onWinClick={onWin} 
      minigame={minigame} />
      </>
      
    );
  };  
  export default PuzzleMinigame;   
import Rating from './Rating';

interface Game {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  averageRating: number;
  ratings: Rating[];
}

export default Game;

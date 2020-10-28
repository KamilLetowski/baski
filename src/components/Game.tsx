import React from 'react';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';

import GameModel from '../models/Game';

type Props = {
  game: GameModel
}

const Game: React.FC<Props> = ({ game }) => {
  return <div className="game">
    <figure>
      <img src={game.imageUrl} alt="game img" />
    </figure>
    <div className="game-content">
      <h2 className="title">
        {game.name}
        <div className="rate">
          <div className="rate-title">
            ocena:
          </div>
          <Rate
            value={game.averageRating}
            disabled
          />
        </div>
      </h2>
      <p>{game.description}</p>
      <Link className="more" to={`/games/${game.id}`}>Zobacz więcej</Link>
    </div>
  </div>
};

export default Game;

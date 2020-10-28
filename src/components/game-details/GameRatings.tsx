import React from 'react';
import { Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Rating from '../../models/Rating';

type Props = {
  ratings: Rating[]
}

const GameRatings: React.FC<Props> = ({ ratings }) => {
  return <div className="ratings">
    <h3>Oceny użytkowników:</h3>
    <ul>
      {ratings.map(({ rating, reason, userName, addedDate }) => <li className="ratings-rate">
        <div className="rate">
          <span className="rate-count">{rating}</span>
          <Rate value={rating} disabled count={rating} />
        </div>
        <div className="user">
          <div className="avatar">
            <Avatar size={48} icon={<UserOutlined />} />
            <div className="user-data">
              <span className="user-name">{userName}</span>
              <span className="date">{new Date(addedDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="reason">
            {reason}
          </div>
        </div>
      </li>)}
    </ul>
  </div>
};

export default GameRatings;

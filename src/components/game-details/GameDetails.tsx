import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Rate, Button, Modal } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
} from '@ant-design/icons';

import httpService from '../../services/httpService';
import Game from '../../models/Game';
import GameRatings from './GameRatings';
import GameRatingForm from './GameRatingForm';
import GameForm from './GameForm';
import notification from '../../services/notification';

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const GameDetails = () => {
  const history = useHistory();
  const [gameDetails, setGameDetails] = useState<Game>({
    averageRating: 0,
    description: '',
    id: '-1',
    imageUrl: '',
    name: '',
    ratings: []
  })
  const [isGameFetching, setIsGameFetching] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchGameDetails = async () => {
      const { data } = await httpService.get<Game>(`api/games/${id}`)
      setGameDetails(data);
      setTimeout(() => {
        setIsGameFetching(false);
      }, 1000);
    }
    setIsGameFetching(true);
    fetchGameDetails();
  }, [id])

  const handleRateAdd = (game: Game) => {
    setGameDetails({
      ...gameDetails,
      averageRating: game.averageRating,
      ratings: [
        ...game.ratings
      ]
    })
  }

  const onDeleteGame = async () => {
    try {
      await httpService.delete(`/api/Games/${deleteId}`);
      notification('success', 'Usuwanie gry', 'Gra została usunięta pomyślnie')
      history.goBack();
    } catch (error) {
      notification('error', 'Usuwanie gry', 'Gra nie została usunięta pomyślnie')
    }
  }

  const openDeleteModal = () => {
    setDeleteId(gameDetails.id);
    setDeleteModalVisible(true)
  }

  const onCancelDeleteGame = () => {
    setDeleteModalVisible(false)
  }

  const handleGameEdition = async (game: Game) => {
    setIsFormSubmitted(true);
    try {
      await httpService.put(`/api/Games/${id}`, { ...game })
      setGameDetails({
        ...gameDetails,
        ...game
      });
      setIsFormSubmitted(false);
      notification('success', 'Edycja gry', 'Gra została uaktualniona pomyślnie!');
    }
    catch {
      setIsFormSubmitted(false);
      notification('error', 'Edycja gry', 'Wystąpił błąd podczas aktualizacji gry.');
    }
  }

  return <div className="game-details">
    {isGameFetching ? <Spin indicator={antIcon} /> :
      <div className="content">
        <div className="game-content">
          <figure>
            <img src={gameDetails.imageUrl} alt="game img" />
          </figure>
          <div className="game-desc">
            <h2 className="title">
              {gameDetails.name}
              <div className="rate">
                <div className="rate-title">
                  ocena:
              </div>
                <Rate
                  value={gameDetails.averageRating}
                  disabled
                />
                <span className="rate-mark">
                  ({gameDetails.averageRating})
              </span>
              </div>
            </h2>
            <p>{gameDetails.description}</p>
          </div>
        </div>
        <div className="btn-actions">
          <Button size="large" onClick={() => history.goBack()} className="margin-bottom" shape="circle" icon={<RollbackOutlined />} />
          <Button size="large" onClick={openDeleteModal} className="margin-bottom" shape="circle" icon={<DeleteOutlined />} />
          <Button size="large" onClick={() => setEditModalVisible(true)} shape="circle" icon={<EditOutlined />} />
        </div>
        <GameRatingForm onRateAdd={handleRateAdd} />
        {gameDetails.ratings.length > 0 ?
          <GameRatings ratings={gameDetails.ratings} />
          : <div className="placeholder">Brak ocen dla tej gry. Bądź pierwszy!</div>
        }
      </div>
    }
    <Modal
      title="Okno potwierdzenia operacji usuwania"
      visible={deleteModalVisible}
      onOk={onDeleteGame}
      onCancel={onCancelDeleteGame}
      okText="Potwierdź"
      cancelText="Anuluj"
    >
      <div>Czy na pewno chcesz usunąć wybraną grę?</div>
    </Modal>
    <Modal
      title="Edycja gry"
      visible={editModalVisible}
      onCancel={() => setEditModalVisible(false)}
      footer={[]}
    >
      <GameForm initValues={gameDetails} isLoading={isFormSubmitted} onFormSubmit={handleGameEdition} />
    </Modal>
  </div>
};

export default GameDetails;

import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';

import httpService from '../services/httpService';
import Game from '../models/Game';
import GameComponent from './Game';
import { Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import GameForm from './game-details/GameForm';
import Modal from 'antd/lib/modal/Modal';
import notification from '../services/notification';

const { Option } = Select;

const initValues: Game = {
  averageRating: 0,
  description: '',
  id: '',
  imageUrl: '',
  name: '',
  ratings: []
}

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const GamesList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isFetchingGames, setIsFetchingGames] = useState(false);
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isAddingGameVisible, setIsAddingGameVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      setIsFetchingGames(true);
      const { data } = await httpService.get('api/games')
      setGames(data);

      setIsFetchingGames(false);
    }

    fetchGames();
  }, [])

  const handleGameAdd = async (game: Game) => {
    setIsCreatingGame(true)
    try {
      const { data } = await httpService.post('/api/Games', { ...game })
      setGames([...games, { ...data }]);
      setIsCreatingGame(false);
      notification('success', 'Dodawanie nowej gry', 'Gra została dodana pomyślnie')
    } catch (error) {
      setIsCreatingGame(false);
      notification('error', 'Dodawanie nowej gry', 'Gra nie została dodana pomyślnie')
    }
  }

  const handleSort = (sortBy: any) => {
    const sorttedGames = games.sort((a, b) => sortBy === 'asc'
      ? a.averageRating - b.averageRating
      : b.averageRating - a.averageRating);

    setGames([...sorttedGames]);
  }

  return <section className="games-list">
    <div className="list-wrapper">
      <div className="search">
        <Input
          value={searchText}
          placeholder="Wprowadź tytuł którego szukasz"
          onChange={({ currentTarget }) => {
            setSearchText(currentTarget.value);
          }}
        />
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Filtruj względem wartości"
          onChange={(value) => {
            handleSort(value)
          }}
          optionFilterProp="children"
        >
          <Option value="asc">Pokaż rosnąco względem oceny</Option>
          <Option value="desc">Pokaż malejąco względem oceny</Option>
        </Select>
      </div>
      <h1 className="list-title">Lista gier: <Button type="primary" onClick={() => setIsAddingGameVisible(true)}>Dodaj nową grę</Button></h1>
      {isFetchingGames ? <Spin indicator={antIcon} />
        : <ul className="list">
          {games.filter(({ name }) => searchText.length > 2 ?
            name.toLowerCase().includes(searchText.toLowerCase()) : name)
            .map((game, index) => <GameComponent key={index} game={game} />)}
        </ul>}
    </div>
    <Modal
      title="Dodawanie nowej gry"
      visible={isAddingGameVisible}
      onCancel={() => setIsAddingGameVisible(false)}
      footer={[]}
    >
      <GameForm initValues={initValues} isLoading={isCreatingGame} onFormSubmit={handleGameAdd} />
    </Modal>
  </section>
};

export default GamesList;

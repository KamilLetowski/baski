import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GamesList from './components/GamesList';
import Home from './components/Home';
import GameDetails from './components/game-details/GameDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={'/'}
          component={() => <Home />}
        />
        <Route
          exact
          path={'/games'}
          component={() => <GamesList />}
        />
        <Route
          exact
          path={'/games/:id'}
          component={() => <GameDetails />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

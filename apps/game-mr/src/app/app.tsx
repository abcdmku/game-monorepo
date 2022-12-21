import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Lobby, JoinLobby} from '@game-mr/core-components';
import { Area } from '@game-mr/game/area'
import { useLocalStorage, User } from '@game-mr/helpers';

export function App() {
  const [user, setUser] = useLocalStorage("user", {});

  return Object.keys(user).length === 0 ? (
      <JoinLobby onSubmit={(u) => setUser(u)}/>
    ) : (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Lobby user={user as User}/>}/>
          <Route path="/area" element={<Area user={user as User}/>}/>
        </Routes>
      </div>
    )
}

export default App;

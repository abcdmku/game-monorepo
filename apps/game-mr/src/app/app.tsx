import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { Lobby, JoinLobby} from '@game-mr/core-components';
import { Area } from '@game-mr/game/area'

export function App() {
  const [userName, setUserName] = useState<string>();

  return !userName ? (
      <JoinLobby onSubmit={(u) => setUserName(u)}/>
    ) : (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Lobby userName={`${userName}`}/>}/>
          <Route path="/area" element={<Area userName={`${userName}`}/>}/>
        </Routes>
      </div>
    )
}

export default App;

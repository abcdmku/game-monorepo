import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Lobby, JoinLobby} from '@game-mr/core-components';
import { Area } from '@game-mr/game/area'
import { useLocalStorage, User } from '@game-mr/helpers';
import { Button } from 'react-bootstrap';

export function App() {
  const [user, setUser] = useLocalStorage("user", {name: ''});

  useEffect(() => {
    !user && setUser({});
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  
  return user && Object.keys(user).length === 0 ? (
      <JoinLobby onLogin={(u) => setUser(u)}/>
    ) : (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Button className='position-absolute top-0 end-0 m-3' onClick={(u) => setUser({})}>Log out</Button>
        <Routes>
          <Route path="/" element={<Lobby user={user as User}/>}/>
          <Route path="/area" element={<Area user={user as User}/>}/>
        </Routes>
      </div>
    )
}

export default App;

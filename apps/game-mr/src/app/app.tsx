import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Lobby, JoinLobby} from '@game-mr/core-components';
import { Area } from '@game-mr/game/area'
import { useLocalStorage, User } from '@game-mr/helpers';
import { Button } from 'react-bootstrap';
import { JoinRoomModal } from 'libs/core-components/src/lib/lobby/joinRoomModal';

export function App() {
  const [user, setUser] = useState<User>({} as User);
  const navigate = useNavigate();

  useEffect(() => {
    const rawUser = sessionStorage?.user
    if(rawUser) {
      const user = rawUser && JSON.parse(rawUser) as User;
      user.token && setUser(user)
    }
  }, []);

  const handleLogin = (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({} as User);
  }

  return user && user?.name === undefined ? (
      <JoinLobby onLogin={u => handleLogin(u)}/>
    ) : (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Button className='position-absolute top-0 end-0 m-3' onClick={() => handleLogout()}>Log out</Button>
        <Routes>
          <Route path="/" element={<Lobby user={user as User}/>}/>
          <Route path="/area/*" element={<Area user={user as User}/>}/>
          <Route path="/area" element={<JoinRoomModal game='area' user={user as User} show onHide={()=>navigate('/')}/>}/>
          <Route path="/stellcon/*" element={<Area user={user as User}/>}/>
          <Route path="/stellcon" element={<JoinRoomModal game='stellcon' user={user as User} show onHide={()=>navigate('/')}/>}/>
          <Route path="/number-game/*" element={<Area user={user as User}/>}/>
          <Route path="/number-game" element={<JoinRoomModal game='number-game' user={user as User} show onHide={()=>navigate('/')}/>}/>
        </Routes>
      </div>
    )
}

export default App;

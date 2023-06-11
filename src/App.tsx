import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { setupFirebase, useAuth } from './firebase';
import { User, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { TodoList } from './TodoList';
import { UserContext } from './UserContext';

function App() {
  const [user, setUser] = useState<User|null>(null);
  useEffect(() => {
    setupFirebase();
    const auth = useAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
    });
    signInAnonymously(auth);
  }, []); // make sure it only runs once.

  return (
    <UserContext.Provider value={{user}}>
      <div>
        
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <TodoList />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </UserContext.Provider>
  )
}

export default App

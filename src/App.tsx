import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { setupFirebase, useAuth } from './firebase';
import { Auth, User, getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useFirestore } from './firebase';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { useForm } from 'react-hook-form';

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User|null>(null);
  const [items, setItems] = useState<any[]>([]);
  const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const col = collection(useFirestore(), `todo_lists/{$user.uid}/items`);
    addDoc(col, data);
    reset();
  }
  useEffect(() => {
    setupFirebase();
    const auth = useAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
    });
    signInAnonymously(auth);
  }, []);

  useEffect(() => {
    if(user?.uid){
      const store = useFirestore();
      const items = collection(store, `todo_lists/{$user.uid}/items`);
      return onSnapshot(items, (snapshot) => {
        console.log(snapshot);
        const list = snapshot.docs.map(x=>x.data());
        console.log(list);
        setItems(list);
      });
    }
  }, [user]);

  return (
    <>
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <ul>
          {items.map((x,i) => <li key={i}>{x.test}</li>)}
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue="A todo item" {...register("test")} />
        </form>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

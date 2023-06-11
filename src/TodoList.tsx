import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "./firebase";
import { useUser } from "./UserContext";


export const TodoList = () => {
    const [items, setItems] = useState<any[]>([]);
    const user = useUser();
  const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    const col = collection(useFirestore(), `todo_lists/{$user.uid}/items`);
    addDoc(col, data);
    reset();
  }

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
  }, [user?.uid]);
    return (
        <div>
            
        <ul>
          {items.map((x,i) => <li key={i}>{x.test}</li>)}
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue="A todo item" {...register("test")} />
        </form>
        </div>
    )
};
import { User } from "firebase/auth";
import { createContext, useContext } from "react";


type UserContextType = {
    user: User | null;
};

const UserContext = createContext({ user: null } as UserContextType);

const useUser = () => {
    const { user } = useContext(UserContext);
    return user;
}

export {UserContext, useUser};
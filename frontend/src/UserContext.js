import { createContext, useContext, useState } from 'react';

const UserContext = createContext();
export const authData = () =>  useContext(UserContext);

export const AuthWrapper = () => {

	const [user, setUser] = useState({name: "", isAuth: false})

	

}

export default {UserContext, AuthWrapper};
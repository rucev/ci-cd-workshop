import { useEffect, useState } from 'react';
import logic from '../logic';
import { useNavigate } from 'react-router';

const useUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(logic.isUserLoggedIn());
    const [updated, setUpdated] = useState(Date.now())
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const fetchUserName = async () => {
        const email = await logic.retrieveUser();
        const fetchedName = email.split('@')[0];
        setUsername(fetchedName)
    }

    const login = async (email, password) => {
        try {
            await logic.authenticateUser(email, password);
            await fetchUserName();
            setIsLoggedIn(true)
            setUpdated(Date.now())
            navigate('/home')
        } catch (error) {
            alert(`login error: ${error.message}`);
        }
    };

    const register = async (email, password, repeatPassword) => {
        try {
            await logic.registerUser(email, password, repeatPassword);
            await login(email, password);
        } catch (error) {
            alert(`register error: ${error.message}`);
        }
    }

    const logout = () => {
        logic.logoutUser();
        setUpdated(Date.now())
        navigate('/login');
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setUsername('');
        } else {
            fetchUserName();
        }
    }, [updated])

    return { register, login, logout, username, isLoggedIn };
}

export default useUser
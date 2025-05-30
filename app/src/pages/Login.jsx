import { useEffect } from 'react';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router';
import logic from '../logic';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useUser();

    const handleRegisterClick = () => {
        navigate('/register')
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        login(email, password);
    }

    return <section className="w-full h-screen flex flex-col pt-36 items-center gap-7 rounded-sm">
        <h2 className="text-3xl font-bold"> Login </h2>
        <form className="w-full md:w-96 shadow h-fit flex flex-col justify-center items-center py-10 px-12 gap-3" onSubmit={handleLogin}>
            <input name="email" type="text" placeholder="your email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
            <input name="password" type="password" placeholder="your password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
            <button type="submit" className="cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">sign in</button>
        </form>
        <div className="flex flex-col gap-2 items-center">
            <p className="font-semibold">You're new here?</p>
            <p><a className="font-bold hover:text-gray-700 cursor-pointer" onClick={handleRegisterClick}>Sign up</a></p>
        </div>
    </section>

}

export default Login;
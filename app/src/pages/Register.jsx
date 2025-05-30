import { useNavigate } from 'react-router';
import logic from '../logic';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';


const Register = ({ handleShowFeedback }) => {
    const navigate = useNavigate();
    const { register } = useUser();

    const handleLoginClick = () => {
        navigate('/login')
    }

    useEffect(() => {
        if (logic.isUserLoggedIn()) navigate('/home')
    }, [])

    const handleRegister = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const repeatPassword = event.target.password.value;

        register(email, password, repeatPassword);
    }

    return <section className="w-full h-screen flex flex-col pt-36 items-center gap-7 rounded-sm">
        <h2 className="text-3xl font-bold">Register</h2>
        <form className="w-full md:w-96 shadow h-fit flex flex-col justify-center items-center py-10 px-12 gap-3" onSubmit={handleRegister}>
            <input name="email" type="text" placeholder="your email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
            <input name="password" type="password" placeholder="your password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
            <input name="repeatPassword" type="password" placeholder="confirm your password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
            <button type="submit" className="cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">create user</button>
        </form>
        <div className="flex flex-col gap-2 items-center">
            <p className="font-semibold">Already have an account?</p>
            <p><a className="font-bold hover:text-gray-700 cursor-pointer" onClick={handleLoginClick}>Sign in</a></p>
        </div>
    </section>
}

export default Register;
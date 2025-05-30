import useUser from '../hooks/useUser';

const Home = () => {
  const { username, logout } = useUser();

  if (username) return (
    <section className="flex w-full pt-5 flex-col items-center gap-7">
      <h2 className="text-6xl">Hello, {username}</h2>
      <div className="home__buttons">
        <button className="cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300" onClick={logout}>Logout</button>
      </div>
    </section>
  );
}

export default Home;


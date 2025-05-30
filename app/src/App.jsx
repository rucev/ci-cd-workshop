import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

const App = () => {
  const location = useLocation()

  useEffect(() => { }, [location.pathname])

  return (
    <main className="w-full h-screen flex flex-col gap-1">
      <h1 className="text-3xl text-center font-bold pt-10">CI / CD MERN DEMO</h1>
      <Outlet />
    </main>
  );
}

export default App;

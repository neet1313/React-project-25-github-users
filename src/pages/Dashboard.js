import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import { useGlobalContext } from '../context/context';
import loadingImage from '../images/preloader.gif';


const Dashboard = () => {
  const { loading } = useGlobalContext();
  return (
    <main>
      <Navbar />
      <Search />
      {!loading && <Info />}
      {!loading && <User />}
      {!loading && <Repos />}
      {loading && <img src={loadingImage} alt="" className='loading-img' />}
    </main>
  );
};

export default Dashboard;

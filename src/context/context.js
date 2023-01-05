import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

// const rootUrl = 'https://api.github.com';
const userUrl = 'https://api.github.com/users/';
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [query, setQuery] = useState('neet1313');
    const [loading, setLoading] = useState(true);

    const fetchUsers = async(url) => { 
        setLoading(true);
        try {
            await Promise.allSettled([
                axios.get(url).then(({data})=> setGithubUser(data)),
                axios.get(`${url}/followers`).then(({data})=>setFollowers(data)),
                axios.get(`${url}/repos?per_page=100`).then(({data})=>setRepos(data))
            ]);

        setLoading(false);

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        fetchUsers(`${userUrl}${query}`);
    }, [query]);


    return <GithubContext.Provider value={{ githubUser, repos, followers, setQuery }}>{children}</GithubContext.Provider>
}

//Custom Hook
const useGlobalContext = () => {
    return useContext(GithubContext);
}

export { GithubProvider, useGlobalContext };


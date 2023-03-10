import React, { useState, useEffect, useContext, useCallback } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const apiRootEndpoint = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [query, setQuery] = useState('neet1313');
    const [loading, setLoading] = useState(true);
    const [remainingRequest, setRemainingRequest] = useState({});
    const [error, setError] = useState(false);

    const fetchUsers = useCallback(async (url) => {
        setLoading(true);
        try {
            let [userQuery, followerQuery, reposQuery, remainingReq] = await Promise.allSettled([
                axios(`${url}/users/${query}`).then(({ data }) => setGithubUser(data)),
                axios(`${url}/users/${query}/followers`).then(({ data }) => setFollowers(data)),
                axios(`${url}/users/${query}/repos?per_page=100`).then(({ data }) => setRepos(data)),
                axios(`${url}/rate_limit`)
            ]).catch(err => console.log(err));

            //Set Error True or False for User validation
            (userQuery.status === 'rejected' && followerQuery.status === 'rejected' && reposQuery.status === 'rejected') && setError(true);

            setRemainingRequest(remainingReq.value.data.rate);
        } catch (error) {
            console.log(error.message);
        }

        setLoading(false);
    }, [query]);

    useEffect(() => {
        fetchUsers(apiRootEndpoint);
    }, [query, fetchUsers]);


    return <GithubContext.Provider value={{
        githubUser,
        repos,
        followers,
        setQuery,
        remainingRequest,
        error,
        setError,
        loading
    }}>{children}</GithubContext.Provider>
}

//Custom Hook
const useGlobalContext = () => {
    return useContext(GithubContext);
}

export { GithubProvider, useGlobalContext };


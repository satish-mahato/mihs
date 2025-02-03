import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axiosInstance from '../config/axios'; // Adjust the path accordingly

const UserAuth = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await axiosInstance.get('/users/profile'); // Adjust the endpoint accordingly
                    setUser(response.data.user);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        if (!user) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [user, token, setUser, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default UserAuth;
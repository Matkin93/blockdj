const DB_URL = 'http://localhost:7777/api';
import axios from 'axios';

export const checkCityAndFetchAreas = (coordsQuery) => axios.get(`${DB_URL}/areas/city/${coordsQuery}`)

export const checkAreaAndFetchPlaylists = (coordsQuery, cityId) => axios.get(`${DB_URL}/playlists/${cityId}?${coordsQuery}`)

export const getUser = (username) => axios.get(`${DB_URL}/profiles/${username}`);

export const getUserPlaylists = (userId) => axios.get(`${DB_URL}/user-playlists/${userId}`);

export const postPlaylist = (playlist) => axios.post(`${DB_URL}/playlists`, playlist);;
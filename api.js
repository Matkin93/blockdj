// const DB_URL = 'http://localhost:7777/api';
const DB_URL = 'https://nameless-sea-34380.herokuapp.com/api';
import axios from 'axios';

export const checkCityAndFetchAreas = (coordsQuery) => axios.get(`${DB_URL}/areas/city/${coordsQuery}`)

export const checkAreaAndFetchPlaylists = (coordsQuery, cityId) => axios.get(`${DB_URL}/cities/${cityId}?${coordsQuery}`)

export const getUser = (username) => axios.get(`${DB_URL}/profiles/${username}`);

export const getUserPlaylists = (userId) => axios.get(`${DB_URL}/user-playlists/${userId}`);

export const postPlaylist = (playlist) => axios.post(`${DB_URL}/playlists`, playlist);

export const votePlaylist = (playlistId) => axios.patch(`${DB_URL}/playlists/${playlistId}`)
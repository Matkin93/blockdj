const DB_URL = 'http://localhost:7777/api';
import axios from 'axios';

export const checkCityAndFetchAreas = (coordsQuery) => axios.get(`${DB_URL}/areas/city/${coordsQuery}`)

export const checkAreaAndFetchPlaylists = (coordsQuery, cityId) => axios.get(`${DB_URL}/playlists/${cityId}?${coordsQuery}`)

export const getUser = (userID) => axios.get(`${DB_URL}/`);

export const getCities = () => axios.get(`${DB_URL}/cities`)

export const getUserPlaylists = (userID) => fetch(`${DB_URL}/areas/${userID}`);

export const getAreasByCity = (cityID) => fetch(`${DB_URL}/`);

export const getAreaPlaylists = (areaID) => fetch(`${DB_URL}/`);

export const postPlaylist = (areaID, playlist) => fetch(`${DB_URL}/`, { method: 'POST' });
// src/services/exerciseDb.js
import { EXERCISEDB_API_KEY, EXERCISEDB_API_HOST } from '@env';

const BASE_URL = 'https://exercisedb.p.rapidapi.com';

export const fetchExercises = async (limit = 10, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/exercises?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': EXERCISEDB_API_KEY,
        'X-RapidAPI-Host': EXERCISEDB_API_HOST
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

export const fetchExerciseById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/exercise/${id}`, {
      headers: {
        'X-RapidAPI-Key': EXERCISEDB_API_KEY,
        'X-RapidAPI-Host': EXERCISEDB_API_HOST
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching exercise details:', error);
    throw error;
  }
};
import { useState } from 'react';
import { fetchAwnserComunicacao } from '../services/awnserComunicacao';

const useAwnserComunicacao = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (data, id, userId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAwnserComunicacao(data, id, userId);
      setData(response);
    } catch (err) {
      setError(err.response || { message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, execute };
};

export default useAwnserComunicacao;
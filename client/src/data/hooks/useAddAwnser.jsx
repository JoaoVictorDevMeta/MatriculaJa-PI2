import { useState } from 'react';
import { fetchAwnserComunicacao } from '../services/awnserComunicacao';

const useAddAwnser = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (data, id) => {
    setIsLoading(true);

    try {
      const response = await fetchAwnserComunicacao(data, id, user?.id);
      return response
    } catch (err) {
      return err.response || { error: err.message }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, execute };
};

export default useAddAwnser;
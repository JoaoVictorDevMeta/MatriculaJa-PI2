import { useState } from 'react';
import { fetchLogin } from '../services/login';

import { sleep } from '../utils/sleep';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (email, password) => {
    setIsLoading(true);
    setError(null);

    await sleep(2000); 
    try {
      const response = await fetchLogin(email, password);
      sessionStorage.setItem('user', JSON.stringify(response));
      setData(response);
    } catch (err) {
      setError(err.response);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, execute };
};

export default useLogin;

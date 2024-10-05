import { useState, useEffect } from 'react';
import { fetchComunicacoes } from '../services/comunicacoes';
import { sleep } from '../utils/sleep';

//esse é o hook que vai ser usado para fazer a requisição
// eles seguem sempre a mesma ideia de codigo
const useFetchComunicacoes = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComunicacoes();
        await sleep(2000);
        setData(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchComunicacoes;
import { useState, useEffect } from 'react';
import { fetchAllAlerts } from '../services/alerts';
import { transformData } from '../utils/transformAlert';
import { sleep } from '../utils/sleep';

//esse é o hook que vai ser usado para fazer a requisição
// eles seguem sempre a mesma ideia de codigo
const useFetchAlerts = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllAlerts(user?.id, user?.perfil.nome_perfil);
        //console.log(response);
        const alerts = transformData(response)
        await sleep(2000);
        setData(alerts);
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

export default useFetchAlerts;
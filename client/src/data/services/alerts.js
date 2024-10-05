export const fetchAllAlerts = async (userId, tipo) => {
   const response = await fetch(`http://localhost:3000/api/alertas/all/${userId}/${tipo}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    return data;
}
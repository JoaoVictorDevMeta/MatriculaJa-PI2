export const fetchComunicacoes = async () => {
    const response = await fetch(`http://localhost:3000/api/monitoramento/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const responseData = await response.json();
    return responseData;
}
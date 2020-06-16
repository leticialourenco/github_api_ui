const fetchHelper = url => {
    const header = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(url , header)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export default fetchHelper;

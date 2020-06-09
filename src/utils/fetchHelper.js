const fetchHelper = url => {
    const header = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token 6faa1b286eecf0e2edabf08d17feaa66756a4c33'
        }
    }

    return fetch(url , header)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export default fetchHelper;
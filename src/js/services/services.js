async function getData(url) {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`сталося помилка ${res.status} подробніше дивитися в консолі`);
    }

    return await res.json();
}

export {getData};

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body: data
    });

    if (!res.ok) {
        const errorData = await res.json();
        return Promise.reject(res.status, errorData.message);
    }

    return await res.json();
};

export {postData};
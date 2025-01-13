/**
 * It displays information about music albums as retrieved by fetch() from the JSON file
 */
const showAlbums = (info) => {
    const albumsSection = document.createElement('section');

    info.albums.forEach((album) => {
        const albumArticle = document.createElement('article');
        
        const albumTitle = document.createElement('span');
        albumTitle.classList.add('albumTitle');
        albumTitle.innerText = album.title;
        
        const albumInfo = document.createElement('div');
        albumInfo.classList.add('title');
        albumInfo.appendChild(albumTitle);
        albumInfo.innerHTML += ` (${album.artist}, ${album.year})`;

        albumArticle.appendChild(albumInfo);

        if (album.hasOwnProperty('musicians')) {
            const musiciansSection = document.createElement('section');
            musiciansSection.classList.add('musicians');
            album.musicians.forEach((musician) => {
                const musicianInfo = document.createElement('div');
                musicianInfo.innerText = `${musician.name} (`;

                const instrumentNumber = musician.instruments.length;
                for (let count = 0; count < instrumentNumber; count++) {
                    musicianInfo.innerText += musician.instruments[count];

                    if (count < instrumentNumber - 1) {
                        musicianInfo.innerText += ', ';
                    }
                }
                musicianInfo.innerText += ')';

                musiciansSection.appendChild(musicianInfo);
            });
            albumArticle.appendChild(musiciansSection);
        }

        albumsSection.appendChild(albumArticle);
    });
    document.querySelector('#albums').innerHTML = albumsSection.innerHTML;
};

/**
 * Error handling
 * If fetch() fails to fetch, an error is shown on the page
 */
const handleError = (error) => {
    const errorMessage = document.querySelector('#error').content.cloneNode(true);
    errorMessage.querySelector('#message').innerText = error;
    document.querySelector('#albums').append(errorMessage);
};

/**
 * The JSON file is fetched and its information shown on the page
 */
const FILE_URL = './data/info.json';

fetch(FILE_URL)
.then((response) => response.json())
.then(data => {
    showAlbums(data);
})
.catch(handleError);

/*
    Alternative fetch implementation
*/
// fetch(FILE_URL)
// .then((response) => {
//     response.json().then((data) => {
//         showAlbums(data);
//     });
// })
// .catch((error) => {
//     console.log(error);
// });
'use strict';

const showAlbums = (info) => {
    const albumsSection = document.createElement('section');

    info.albums.forEach((album) => {
        const albumArticle = document.createElement('article');
        
        const albumTitle = document.createElement('span');
        albumTitle.classList.add('albumTitle');
        albumTitle.innerText = album.title;
        
        const albumInfo = document.createElement('div');
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

fetch('./data/info.json')
.then((response) => {
    return response.json(); 
})    
.then((data) => {
    showAlbums(data);
})
.catch((error) => {
    console.log(error);
});

/*
    Alternative fetch implementation
*/
// fetch('./data/info.json')
// .then((response) => {
//     response.json().then((data) => {
//         showAlbums(data);
//     });
// })
// .catch((error) => {
//     console.log(error);
// });
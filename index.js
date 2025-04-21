const searchBox = document.getElementById('searchBox');
const cancelButton = document.getElementById('cancelButton');

searchBox.addEventListener('input', () => {
    if (searchBox.value !== '') {
        cancelButton.style.display = 'block';
    } else {
        cancelButton.style.display = 'none';
    }
});

cancelButton.addEventListener('click', () => {
    searchBox.value = '';
    cancelButton.style.display = 'none';
    searchBox.focus();
});

const sideBar = document.getElementById('sideBar');
const menuButton = document.getElementById('menuButton');
const main = document.getElementById('main');

menuButton.addEventListener('click', () => {
    sideBar.classList.toggle('collapsed');
    main.classList.toggle('collapsed');
});

fetch('videos.json')
    .then(response => response.json())
    .then(videos => {
        videos.forEach(video => {
            const videoElement = document.createElement('video');
            videoElement.src = video.url;
            videoElement.preload = "metadata";

            videoElement.addEventListener('loadedmetadata', () => {
                const duration = videoElement.duration;
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);

                const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
                const videoLenght = `${minutes}:${paddedSeconds}`;
            });
        });
    })
    .catch(error => {
        console.log('Error loading video');
    });
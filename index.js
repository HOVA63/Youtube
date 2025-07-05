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

const videoContainer = document.querySelector('.videos');

fetch('videos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        } 
        return response.json();
    })
    .then(videos => {
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');

            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = video.thumbnail;
            thumbnailImg.alt = video.title;
            thumbnailImg.classList.add('video-thumbnail');

            const videoDuration = document.createElement('div');
            videoDuration.textContent = video.duration;
            videoDuration.classList.add('video-duration');

            const thumbnailWrapper = document.createElement('div');
            thumbnailWrapper.classList.add('thumbnail-wrapper');
            thumbnailWrapper.appendChild(thumbnailImg);
            thumbnailWrapper.appendChild(videoDuration);

            const videoTitle = document.createElement('h3');
            videoTitle.textContent = video.title;
            videoTitle.classList.add('video-title');

            const videoMeta = document.createElement('div');
            videoMeta.classList.add('video-meta');

            const channelName =  document.createElement('p');
            channelName.textContent = video.channelName;
            channelName.classList.add('channel-name');

            const videoStats = document.createElement('p');
            videoStats.textContent = video.views + "•" + video.uploadedAgo;
            videoStats.classList.add('video-stats');

            videoMeta.appendChild(channelName);
            videoMeta.appendChild(videoStats);

            videoCard.appendChild(thumbnailWrapper);
            videoCard.appendChild(videoMeta);
            videoCard.appendChild(videoTitle);

            videoContainer.appendChild(videoCard);
        });
    })
    .catch(error => {
        console.error(`Error fetching or parsing video data: `, error)
    });
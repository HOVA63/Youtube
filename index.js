const menuButton = document.getElementById('menuButton');
const sideBar = document.getElementById('sideBar');
const main = document.getElementById('main');

menuButton.addEventListener("click", () => {
    sideBar.classList.toggle('collapsed');
    main.classList.toggle('collapsed');
});

const searchBar = document.getElementById('searchBar');
const cancelButton = document.getElementById('cancelButton');
cancelButton.style.display = 'none';

searchBar.addEventListener('input', () => {
    if(searchBar.value !== '') {
        cancelButton.style.display = 'block';
    } else {
        cancelButton.style.display = 'none';
    };
});

cancelButton.addEventListener('click', () => {
    searchBar.value = '';
    cancelButton.style.display = 'none';
    searchBar.focus();
});

const videoContainer = document.querySelector('.videos');

fetch('videos.json')
    .then(res => res.json())
    .then(videos => {
        videos.forEach(video => {
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = video.thumbnail;
            thumbnailImg.alt = video.title;
            thumbnailImg.classList.add('video-thumbnail');

            const videoDuration = document.createElement('div');
            videoDuration.textContent = video.duration;
            videoDuration.classList.add('video-duration');

            const thumbnailWrapper = document.createElement('a');
            thumbnailWrapper.classList.add('thumbnail-wrapper');
            thumbnailWrapper.href = `video.html?id=${video.id}`;
            thumbnailWrapper.appendChild(thumbnailImg);
            thumbnailWrapper.appendChild(videoDuration);

            const videoTitle = document.createElement('h4');
            videoTitle.textContent = video.title;
            videoTitle.classList.add('video-title');

            const channelName = document.createElement('p');
            channelName.textContent = video.channelName;
            channelName.classList.add('channel-name');

            const videoStats = document.createElement('p');
            videoStats.textContent = video.views + " • " + video.uploadedAgo;
            videoStats.classList.add('video-stats');

            const channelLogo = document.createElement('img');
            channelLogo.src = video.channelLogo;
            channelLogo.alt = video.channelName;
            channelLogo.classList.add('channel-logo');

            const channelLink = document.createElement('a');
            channelLink.appendChild(channelLogo);

            const videoMeta = document.createElement('div');
            videoMeta.classList.add('video-meta');
            videoMeta.appendChild(videoTitle);
            videoMeta.appendChild(channelName);
            videoMeta.appendChild(videoStats);

            const videoInfo = document.createElement('div');
            videoInfo.classList.add('video-info');
            videoInfo.appendChild(channelLink);
            videoInfo.appendChild(videoMeta);

            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            videoCard.appendChild(thumbnailWrapper);
            videoCard.appendChild(videoInfo);

            videoContainer.appendChild(videoCard);
        }) 
    });
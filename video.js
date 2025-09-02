fetch('videos.json')
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to load new videos!')
        }
        return res.json()
    })
    .then(videos => {
        const params = new URLSearchParams(window.location.search);
        const videoId = params.get('id');
        
        const video = videos.find(v => v.id === videoId);

        if (!video) {
            document.body.innerHTML = "<h1> Video not found! </h1>";
            return;
        }

        const player = document.getElementById('player')
        player.src = video.url;
        player.poster = video.thumbnail;

        document.getElementById('title').textContent = video.title;
        document.getElementById('description').textContent = video.description;

        const recommendedDiv = document.getElementById('recommended');

        videos.filter(v => v.id !== videoId).forEach(rec => {
            const link = document.createElement('a');
            link.href = `video.html?id=${rec.id}`;
            link.classList.add('recommended-card');

            const thumb = document.createElement('img');
            thumb.src = rec.thumbnail;
            thumb.alt = rec.title;

            const recTitle = document.createElement('p');
            recTitle.textContent = rec.title;

            link.appendChild(thumb);
            link.appendChild(recTitle);

            recommendedDiv.appendChild(link);
        });
    })
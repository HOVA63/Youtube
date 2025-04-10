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
});
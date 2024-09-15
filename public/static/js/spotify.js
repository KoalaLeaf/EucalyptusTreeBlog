const token = 'AQDNWcXUevntZpBV6nfRAqykumR5nbs2y2qHmNwDuP81iYpq_LF4rKd4fBA8qUdwgx3wDbcLSNxLg4VDJTLgv5Tvnnm3pjYcc1oV7R1tgsEcsYknbdK-mWouLWDtG8IjK8S-Wbv51Q7zv-rdTgORcf9ZXBdwyX5zGR2kck48Ce0PlrQM2dY3W2Iv0NnehHQ6V3VwWrDRIssmFgLn08lq-g'; // Replace with a valid token

fetch('https://api.spotify.com/v1/me/top/tracks', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
.then(response => response.json())
.then(data => {
  const trackList = document.getElementById('track-list');
  data.items.forEach(track => {
    const trackItem = document.createElement('div');
    trackItem.innerHTML = `
      <img src="${track.album.images[0].url}" alt="${track.name}">
      <p>${track.name} by ${track.artists[0].name}</p>
    `;
    trackList.appendChild(trackItem);
  });
});

const token = 'AQClqwk8APiioC2kn1MaiBeh2phX6n0KbK-Aa2rrTC_yFt8ncaXrFVdtwaWT987BXoye5evspltdH9lc75tRHDToRYfDlBJod4tes7FeS51qVPRbaAuJ-jeu70jmzx1Yg8ne7HBpdnBZPG2tJr5cTJ93rROHqi1cuhv5rPooOEwOCgUtzqyYIoGWowHoerYZMwxnthpAol70UtUDysr-tA'; // Replace with a valid token

fetch('https://api.spotify.com/v1/me/top/tracks', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token  // Ensure the token is valid and correctly placed
  }
})
.then(response => response.json())
.then(data => {
  console.log("Received data:", data);  // Log the entire data to check its structure
  const trackList = document.getElementById('track-list');
  if (data && data.items) {
    data.items.forEach(track => {
      const trackItem = document.createElement('div');
      trackItem.innerHTML = `
        <img src="${track.album.images[0].url}" alt="${track.name}">
        <p><strong>${track.name}</strong></p>
        <p>${track.artists.map(artist => artist.name).join(', ')}</p>
      `;
      trackList.appendChild(trackItem);
    });
  } else {
    console.log("No items in the data or incorrect data structure");
  }
})
.catch(error => console.error('Error fetching tracks:', error));


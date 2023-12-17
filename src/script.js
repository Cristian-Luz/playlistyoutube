var dynamicVideosContainer = document.getElementById('dynamicVideosContainer');
var savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];

// Carrega as playlists salvas
savedPlaylists.forEach(function(playlistLink) {
    addPlaylistToContainer(playlistLink);
});

function addPlaylist() {
    var playlistLink = document.getElementById('playlistLink').value;

    addPlaylistToContainer(playlistLink);

    // Limpar campo de input
    document.getElementById('playlistLink').value = '';

    // Salvar playlist adicionada
    savedPlaylists.push(playlistLink);
    localStorage.setItem('playlists', JSON.stringify(savedPlaylists));
}



function addPlaylistToContainer(playlistLink) {
  var playlistCode = extractPlaylistCode(playlistLink);
  if (playlistCode) {
      var iframeContainer = document.createElement('div');
      iframeContainer.classList.add('playlist-container');

      var iframe = document.createElement('iframe');
      iframe.width = "300";
      iframe.height = "215";
      iframe.src = `https://www.youtube.com/embed/videoseries?list=${playlistCode}`;
      iframe.title = "YouTube playlist player";
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      iframeContainer.appendChild(iframe);

      var removeButton = document.createElement('button');
      removeButton.textContent = 'Remover Playlist';
      removeButton.className = 'remove-button'; // Adiciona uma classe chamada "remove-button"
      removeButton.addEventListener('click', function () {
          console.log('Clicou em Remover Playlist para:', playlistCode);
          removePlaylist(iframeContainer, playlistLink);
      });

      // Centralizar o botão verticalmente
      var buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.justifyContent = 'center';
      buttonContainer.appendChild(removeButton);

      iframeContainer.appendChild(buttonContainer);

      dynamicVideosContainer.appendChild(iframeContainer);
  }
}

function removePlaylist(iframeContainer, playlistLink) {
  console.log('Removendo playlist:', playlistLink);
  dynamicVideosContainer.removeChild(iframeContainer);

  // Remover a playlist da lista salva
  savedPlaylists = savedPlaylists.filter(function (item) {
      return item !== playlistLink;
  });

  console.log('Novas playlists salvas:', savedPlaylists);

  // Atualizar a localStorage com a nova lista de playlists
  localStorage.setItem('playlists', JSON.stringify(savedPlaylists));
}




function extractPlaylistCode(playlistLink) {
    var regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/;
    var match = playlistLink.match(regex);
    return match ? match[1] : null;
}
import 'whatwg-fetch';

export default class SPWidget {
  constructor(params) {

    this.songId = '';
    this.artist = '';
    this.name = '';
    this.previewUrl = '';
    this.player = new Audio();

    if (params)
    {
      this.songId = params.songId;
    }
    else
    {
      console.error('No parameters were provided.');
    }
  }

  togglePlay()
  {
    if (this.player.paused)
    {
      this.player.play();
    }
    else
    {
      this.player.pause();
    }
  }

  buttonPlaying()
  {
    var playButton = document.getElementById('play-button');

    if (playButton)
    {
      playButton.setAttribute("class", "playing");
    }
  }

  buttonPaused()
  {
    var playButton = document.getElementById('play-button');

    if (playButton)
    {
      playButton.setAttribute("class", "paused");
    }
  }

  run()
  {
    var songPromise = getSongData(this.songId);
    songPromise.then((result) =>
    {

      this.name = result.name;
      this.artist = result.artists[0].name;
      this.imageUrl = result.album.images[0].url;
      this.previewUrl = result.preview_url;
      this.player.src = result.preview_url;

      this.player.onplay = () => this.buttonPlaying();
      this.player.onpause = () => this.buttonPaused();

      console.log(this);
      this.displayPlayer();

    });
  }

  displayPlayer()
  {
    var widget = document.getElementById('SPWidget');
    if (widget)
    {
      var htmlString = `<img src=${this.imageUrl}></img>`;
      htmlString += `<div class="info">`;
      htmlString += `<div class="artist">${this.artist}</div>`;
      htmlString += `<div class="song-name">${this.name}</div>`;
      htmlString += `<div id="play-button" class="paused"></div>`;
      htmlString += `</div>`;

      widget.innerHTML = htmlString;

      var playButton = document.getElementById('play-button');
      playButton.onclick = () => this.togglePlay();
    }
    else
    {
      console.error('No div with id "spotifyWidget" found');
    }
  }

}


function getSongData(songId)
{
  var url = `https://api.spotify.com/v1/tracks/${songId}`;

  return fetch(url).then((response) =>
  {
    if (response.ok)
    {
      return response.json();
    }
    else
    {
      console.error('Error in song id entered: ' + this.songId);
    }

  }).then( (data) => {
      return data;
  });
}

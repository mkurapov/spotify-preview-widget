import 'whatwg-fetch';

export default class SPWidget {
  constructor(params) {

    this.songId = '';
    this.primaryColor = '';
    this.artist = '';
    this.title = '';
    this.previewUrl = '';
    this.externalUrl = '';
    this.player = new Audio();
    this.playButton = {};
    this.playhead = {};
    this.timeline = {};

    if (params)
    {
      this.songId = params.songId;
      console.log(params);

      if (params.primaryColor)
      {
        this.primaryColor = params.primaryColor;
      }
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
    if (this.playButton)
    {
      //set new class of icon
      this.playButton.children[0].setAttribute("class", "fa fa-pause");
    }
  }

  buttonPaused()
  {
    if (this.playButton)
    {
      this.playButton.children[0].setAttribute("class", "fa fa-play");
    }
  }

  updateTime()
  {
    var playPercent = (this.timeline.offsetWidth - this.playhead.offsetWidth) * (this.player.currentTime / this.player.duration);
    this.playhead.style.left = playPercent + "px";

  }

  start()
  {
    var songPromise = getSongData(this.songId);
    songPromise.then((result) =>
    {

      this.title = result.name;
      this.artist = result.artists[0].name;
      this.imageUrl = result.album.images[0].url;
      this.externalUrl = result.external_urls.spotify;
      this.previewUrl = result.preview_url;
      this.player.src = result.preview_url;

      this.player.onplay = () => this.buttonPlaying();
      this.player.onpause = () => this.buttonPaused();
      this.player.ontimeupdate = () => this.updateTime();

      console.log(this);
      this.displayPlayer();

    });
  }



  displayPlayer()
  {
    var widget = document.getElementById('SPWidget');
    if (widget)
    {
      var htmlString = `<img id="album-image" src=${this.imageUrl}></img>
                        <a href="${this.externalUrl}" class="link-to-song"><i class="fa fa-spotify"></i></a>
                        <div id="info">
                            <div class="artist">${this.artist}</div>
                            <div class="song-name">${this.title}</div>
                            <div id="play-button" class="paused">
                                <i class="fa fa-play"></i>
                            </div>
                            <div id="timeline">
                                <div id="playhead"></div>
                            </div>
                        </div>`;

      widget.innerHTML = htmlString;


      this.playButton = document.getElementById('play-button');
      this.playhead = document.getElementById('playhead');
      this.timeline = document.getElementById('timeline');

      console.log('primary' + this.primaryColor);
      if (this.primaryColor)
      {
        widget.style.background = this.primaryColor;
        this.playButton.children[0].style.color = this.primaryColor;
      }

      this.playButton.onclick = () => this.togglePlay();


  } else
    {
      console.log('No div with id SPWidget was found');
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

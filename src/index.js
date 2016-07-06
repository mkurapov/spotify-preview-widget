import 'whatwg-fetch';

export default class SPWidget {
  constructor(params) {

    this.songId = '';
    this.artist = '';
    this.name = '';
    this.previewUrl = '';

    if (params)
    {
      this.songId = params.songId;
    }
    else
    {
      console.error('No parameters were provided.');
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
      console.log(this);

    }).then(() => {

      var widget = document.getElementById('SPWidget');
      if (widget)
      {
          var htmlString = `<div class="name">${this.name}</div>`;
          htmlString += `<img src=${this.imageUrl}></img>`;
        htmlString += `<audio src=${this.previewUrl} controls></audio>`;
          widget.innerHTML = htmlString;
      }
      else
      {
        console.error('No div with id "spotifyWidget" found');
      }



    });
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

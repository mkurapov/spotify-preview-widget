# Spotify Preview Widget

[Demo](http://codepen.io/mkurapov/pen/jALyNA)

This widget accept a song id from Spotify, and creates a playable widget you can put on your site.
To get an id of a song from Spotify, simply right click and select copy URL.

## Usage

Make sure to inlcude the styles.css which can be found in the css folder. Also, this widget relies on font awesome for the play/pause icons, feel free to make your own.

Sample usage (this can be found in index.html) 
```
<html lang="en">
  <head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"> //need for icons
      <link rel="stylesheet" href="css/styles.css">  //need for styling
      <script src="lib/SPWidget.min.js" type="text/javascript"></script>  //main lib file
 </head>

<body>
    <div id="SPWidget"></div> //elements will be added to this div
</body>

  <script type="text/javascript">
      var widget = new SPWidget({
          songId: 'enter song id here'
      }).start();
  </script>
</html>
```

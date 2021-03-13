import React from 'react';
// import Styles from './Styles';

export default function Download(props) {
  /* Handles the download of the generated meme. */

  function handleDownloadClick() {
    console.log('URL: ', props.url);
    fetch(props.url).then((response) => {
      response.arrayBuffer().then((buffer) => {
        var element = document.createElement('a');
        var file = new Blob([buffer], { type: 'image/jpeg' });
        console.log('file: ', file);
        element.href = URL.createObjectURL(file);
        console.log('element.href: ', element.href);
        element.download = 'image.jpg';
        element.click();
      });
    });
  }

  return (
    <Download>
      <button onClick={handleDownloadClick} download>
        Download generated meme
      </button>
    </Download>
  );
}

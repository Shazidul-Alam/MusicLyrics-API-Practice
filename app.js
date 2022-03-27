const searchsongs=()=>{
    const searchText=document.getElementById('search-field').value;
    const url=`https://api.lyrics.ovh/suggest/${searchText}`
    
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySong(data.data))
    .catch(error=> displayError("Sorry Something when wrong"));
}
const displaySong=(songs)=>{
    const songContainer=document.getElementById('song-container');
    songContainer.innerHTML='';
    songs.forEach(songs => {
      const songDiv=document.createElement('div');
      songDiv.className="single-result row align-items-center my-3 p-3";
      songDiv.innerHTML=`
            <div class="col-md-9">
            <h3 id="title" class="lyrics-name">${songs.title}</h3>
            <p class="author lead">Album by <span>${songs.artist.name}</span></p>
                </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${songs.title}','${songs.artist.name}')" class="btn btn-success">Get Lyrics</button>
            </div>
            <audio controls>
                <source src="${songs.preview}" type="audio/mpeg">
            </audio>
      `;
      songContainer.appendChild(songDiv);
    });
}
  const showLyrics= lyrics =>{
      const lyricsDiv= document.getElementById('showLyrics')
      lyricsDiv.innerText= lyrics;
  }


  const getLyrics= async (title,artist)=>{
      url=`https://api.lyrics.ovh/v1/${artist}/${title}`
      const res =await fetch(url);
      const data= await res.json()
      showLyrics(data.lyrics);
  }

  const displayError= (error) =>{
    const getdiv= document.getElementById('errorHandling');
    getdiv.innerText=error;
  }


  

    
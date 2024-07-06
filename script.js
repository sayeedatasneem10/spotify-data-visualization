const search=document.getElementById('search')
const submit=document.getElementById('submit')



function searchData(){

    //get access token
    var client_id = '485c370a6ed54e519f638388da4a4b25';
    var client_secret = 'f3a225b402704df8ace7ab59db1fe449';

    const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
    const COUNTRY_CODE = 'IN';
    const YEAR = '2023-2024';


    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(r => r.json())
    .then(r => {
        console.log(r.access_token)
        getTracksReleasedIn2023(r.access_token)
    })

    
    let getTracksReleasedIn2023 =(token) => {
        if (!token) {
          throw new Error('No access token available');
        }
      
        try {
          fetch(`${SPOTIFY_API_URL}/search/?q=year%3A2023-2024&type=track&market=IN`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(res =>res.json())
          .then(data =>{
            console.log(data.tracks.items)
            displayTrackCharts(data.tracks.items)
          })
          

        //   return response.data.tracks.items;
        } catch (error) {
          console.error('Error fetching tracks:', error);
          throw error; // Rethrow the error to propagate it up the call stack
        }
    }

   
}

let displayTrackCharts =(tracks) =>{
    if (tracks && tracks.length > 0) {
        const trackNames = tracks.map(track => track.name);
        const trackPopularity = tracks.map(track => track.popularity);
        const barColors = ["red", "green","blue","orange","brown","pink","yellow","gray","white","black","violet","teal","aqua","silver","olive","navy","maroon","lime","purple","fuchsia"];

        console.log(trackNames)
        console.log(trackPopularity)


        new Chart("myChart", {
        type: "bar",
        data: {
            labels: trackNames,
            datasets: [{
            backgroundColor: barColors,
            data: trackPopularity
            }]
        },
        options: {
            legend: {display: false},
            title: {
            display: true,
            text: "spotify music data from 2023 on Bar chart(X-AXIS:TRACK NAME AND Y-AXIS:POPULARITY)"
            }
        }
        }),

        new Chart("myChart2", {
            type: "pie",
            data: {
              labels: trackNames,
              datasets: [{
                backgroundColor: barColors,
                data:trackPopularity
              }]
            },
            options: {
              title: {
                display: true,
                text: "spotify music data from 2023 on Pie chart(X-AXIS:TRACK NAME AND Y-AXIS:POPULARITY)"
              }
            }
        }),

        new Chart("myChart3", {
            type: "line",
            data: {
              labels: trackNames,
              datasets: [{
                backgroundColor: barColors,
                data:trackPopularity
              }]
            },
            options: {
              title: {
                display: true,
                text: "spotify music data from 2023 on Line chart(X-AXIS:TRACK NAME AND Y-AXIS:POPULARITY)"
              }
            }
          });
    }

}


function searchByAlbums(e){
    e.preventDefault()

     //get search term
     const term=search.value;
     console.log(term);


     
    //get access token
    var client_id = '485c370a6ed54e519f638388da4a4b25';
    var client_secret = 'f3a225b402704df8ace7ab59db1fe449';

    const SPOTIFY_API_URL = 'https://api.spotify.com/v1';


    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(r => r.json())
    .then(r => {
        console.log(r.access_token)
        getAlbumsReleasedIn2023(r.access_token)
    })

    
    let getAlbumsReleasedIn2023 =(token) => {
        if (!token) {
          throw new Error('No access token available');
        }else if(term !=='album'){
            canvasContainer.innerHTML='Please refresh and enter the word album'
            setTimeout(searchData(),3000)
            
        }else{
            
            
            try {
                fetch(`${SPOTIFY_API_URL}/search/?q=year%3A2023-2024&type=${term}&market=IN`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                }).then(res =>res.json())
                .then(data =>{
                  console.log(data.albums.items)
                  displayAlbumCharts(data.albums.items)
                })
                
      
              //   return response.data.tracks.items;
              } catch (error) {
                console.error('Error fetching albums:', error);
                throw error; // Rethrow the error to propagate it up the call stack
              }
        }
      
        
    }

     
}

let displayAlbumCharts =(albums) =>{
    if (albums && albums.length > 0) {
        const albumNames = albums.map(album=> album.name);
        const totalTracks = albums.map(album => album.total_tracks);
        const barColors = ["red", "green","blue","orange","brown","pink","yellow","gray","white","black","violet","teal","aqua","silver","olive","navy","maroon","lime","purple","fuchsia"];

        console.log(albumNames)
        console.log(totalTracks)


        new Chart("myChart", {
        type: "bar",
        data: {
            labels: albumNames,
            datasets: [{
            backgroundColor: barColors,
            data: totalTracks
            }]
        },
        options: {
            legend: {display: false},
            title: {
            display: true,
            text: "spotify music data from 2023 on Bar chart(X-AXIS:ALBUM NAME AND Y-AXIS:TOTAL TRACKS)"
            }
        }
        }),

        new Chart("myChart2", {
            type: "pie",
            data: {
              labels: albumNames,
              datasets: [{
                backgroundColor: barColors,
                data:totalTracks
              }]
            },
            options: {
              title: {
                display: true,
                text: "spotify music data from 2023 on Pie chart(X-AXIS:ALBUM NAME AND Y-AXIS:TOTAL TRACKS)"
              }
            }
        }),

        new Chart("myChart3", {
            type: "line",
            data: {
              labels: albumNames,
              datasets: [{
                backgroundColor: barColors,
                data:totalTracks
              }]
            },
            options: {
              title: {
                display: true,
                text: "spotify music data from 2023 on Line chart(X-AXIS:ALBUM NAME AND Y-AXIS:TOTAL TRACKS)"
              }
            }
          });
    }

}


//Event listeners
document.addEventListener('DOMContentLoaded',searchData)
submit.addEventListener('submit',searchByAlbums)



let movieData=[];
let movieVote = [];


let nameData = [];



let voteData = [];

let actorName = [];
let actorVote = [];


async function movieGraph() {
    await movies();
    const label = movieData.slice(0,7);
    let ctx = document.getElementById("doughnut").getContext("2d");

let chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: label,
    datasets: [
      {
         barPercentage: 1.0,
         fill: false,
        borderRadius: 0,
        tension: 0.5,
        
        backgroundColor: 
            [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
        data: movieVote.slice(0,7),
      },
    ],
  },

  // Configuration options go here
  options: {
    scales: {
      x: {
          display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    cornerRadius: 5,
    responsive: true,
    maintainAspectRatio: false,
  },
});
}

movieGraph();


async function actorGraph() {
    await actorData();
    const labels = actorName.slice(1,11)
    var ctx = document.getElementById('line').getContext('2d'); 
    var line = new Chart(ctx,{
        type: 'line',
        data:{
            labels: labels,
  datasets: [{
    label: 'Treanding Actors Popularity %',
    data: actorVote.slice(1,11),
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
        }, options: {
            scales: {
                x: {
                    beginAtZero: false
                },
              responsive: true,
              
                
            }
        }
    })

}

actorGraph();


async function graph() {
    await getData();
    const labels = nameData.slice(0,10);
    var ctx = document.getElementById('myChart').getContext('2d');

    
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Trending Series Ratings',
            data: voteData.slice(0,10),
            barPercentage: 1.0,
            borderRadius: 5,
            backgroundColor: 
            [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
        }]
    },
    options: {
        scales: {
            x:{
                grid: {
                    display: false,
                  }
            },
            y: {
                beginAtZero: true
            },
          responsive: true,
          
            
        }
    }
});
    
}

graph();


async function getData() {
   const url = "https://api.themoviedb.org/3/trending/tv/week?api_key=0e766b54350da2a8c8e20c574061a29a";
   const response = await fetch(url);
   const data = await response.json();
   console.log(data);
   const name = data.results.map((movie) => movie.name);
   console.log(name);
   const vote = data.results.map((movie) => movie.vote_average);
   console.log(vote);
   nameData= name;
   voteData=vote;


}

async function actorData() {
    const url = "https://api.themoviedb.org/3/person/popular?api_key=0e766b54350da2a8c8e20c574061a29a&language=en-US&page=1";
   const response = await fetch(url);
   const data = await response.json();
   console.log(data);
   const Name = data.results.map((actor) => actor.name);
   actorName = Name;
   const popularity = data.results.map((actor) => actor.popularity);
    actorVote = popularity;
}

async function movies() {
    const url = "https://api.themoviedb.org/3/movie/popular?api_key=0e766b54350da2a8c8e20c574061a29a&language=en-US&page=1";
   const response = await fetch(url);
   const data = await response.json();
   console.log(data);
   const  movieName = data.results.map((movie) => movie.original_title);
   movieData= movieName;
   const voteCount = data.results.map((movie) => movie.vote_average);
    movieVote = voteCount;
    
}




 
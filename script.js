let moviesList =  JSON.parse(localStorage.getItem("moviesList")) || [];


document.getElementById("addMovie").addEventListener("click", () => {
  document.getElementById("movieCards").classList.add("d-none");
  document.getElementById("home").classList.add("d-none");
  document.getElementById("movieform").classList.remove("d-none");
  document.getElementById("clearList").classList.add("d-none");

  
});


document.getElementById("showMovieList").addEventListener("click", ()=>{
  document.getElementById("clearList").classList.remove("d-none");
  document.getElementById("movieform").classList.add("d-none");
  document.getElementById("home").classList.add("d-none");
  document.getElementById("movieCards").classList.remove("d-none");
  document.getElementById("hideClearbtn").classList.remove("d-none");

  loadData(moviesList);
})

// ✅ Now the form exists, so we can safely add a submit handler
document.getElementById("movie-form-data").addEventListener("submit", (e) => {

    e.preventDefault();
    // location.reload();

    const form = e.target;
    const data = {
        title: form.title.value.trim(),
        type:form.type.value.trim(),
        year: form.year.value.trim(),
        genre: form.genre.value.trim(),
        status: form.status.value,
        description: form.description.value.trim(),
        cast: form.cast.value.split(",").map(name => name.trim())
    };

    // now unable the viewWatch list
    moviesList.push(data);
    // to prevent reseting the movieslist when it reloads
    localStorage.setItem("moviesList", JSON.stringify(moviesList));

    form.reset();

    // console.log(moviesList);
});
let output =document.getElementById("movieCards");
function loadData(movies){
  

  if(movies.length==0){
    document.getElementById("home").classList.remove("d-none");
    document.getElementById("home").innerHTML=`Empty List PLz add some movies/tv shows.`;
    document.getElementById("hideClearbtn").classList.add("d-none");
    return;
  }
  
  output.innerHTML=``;
 for (let i = movies.length-1; i >=0; i--) {
  // console.log(movies[i]); 
  let movie = movies[i];

  // Get current date & time
  const now = new Date();
  const dateTime = now.toLocaleString(); 
  let statuses = ['yet_to_watch','in_progress','need_rewatch','watched'];
  // console.log(statuses);

  statuses = statuses.filter(ele => ele!=movie.status);
  // console.log(statuses);
  output.innerHTML = output.innerHTML + `
    <div class="card" style="width: 18rem;">
      <div class="card-body set-card-width">
        <h4 class="card-title">${movie["title"]}</h4>
        <h6 class="card-subtitle">
          <p class="card-text mb-2 text-body-secondary"><b>Genre: </b>${movie["genre"]}</p>
        </h6>

        <div>
          <label><b>Type</b></label>
          <p class="card-text">${movie["type"]}</p>
        </div>

        <div>
          <label><b>Year Released</b></label>
          <p class="card-text">${movie["year"]}</p>
        </div>

        <div>
          <label><b>Description</b></label>
          <p class="card-text">${movie["description"]}</p>
        </div>

        <div>
          <label><b>Status</b></label>
          <p class="card-text" id = "currentstatus${i}">${movie.status}</p>          
          <div id="status${i}" class="d-none">
  <select class="form-select status-select" data-index="${i}">

    <option value="${movie.status}">${movie.status}</option>
    <option value="${statuses[0]}">${statuses[0]}</option>
    <option value="${statuses[1]}">${statuses[1]}</option>
    <option value="${statuses[2]}">${statuses[2]}</option>
  </select>
</div>
         
              
        </div>

        <div>
          <label><b>Cast</b></label>
          <p class="card-text">${movie["cast"]}</p>
        </div>

        <div>
          <label><b>Added On</b></label>
          <p class="card-text">${dateTime} ${i}</p>
        </div>

       <div>
  <button type="button" class="editStatusBtn" id="editBtn${i}" onclick="editMovieCard(${i})">Edit Status</button>
  <button type="button" onclick="deleteMovieCard(${i})" id="deleteMovie${i}">Delete Movie From List</button>
</div>
      </div>
    </div>
  `;
  }
}

function updateStatus(select, cardId){
  
  curid = "currentstatus"+cardId;
  moviesList[cardId].status = select.value;
  // console.log(moviesList[cardId], select.value);
  document.getElementById(curid).innerHTML=select.value;
    document.getElementById(curid).classList.remove("d-none");
    document.getElementById(`status${cardId}`).classList.add('d-none');
    
}
function editMovieCard(cardId) {
  const statusId = "status" + cardId;
  const statusDiv = document.getElementById(statusId);

  if (statusDiv) {
    // Show the select dropdown
    statusDiv.classList.remove('d-none');
    let movie = moviesList[statusId.slice(6)-0];
    // console.log( movie);
    const curid = "currentstatus"+cardId;
    if(curid)document.getElementById(curid).classList.add("d-none");
    const select = document.querySelector(`select[data-index="${cardId}"]`);
    let selectedValue = select.value;
    // console.log(selectedValue);

     // ✅ Attach the change event only once
    if (select && !select.dataset.bound) {
      select.dataset.bound = "true";

      select.addEventListener("change", function () {
        alert('Do you want to update the status??');
        updateStatus(this, cardId);
      });
    }
    
    
  }
}



function deleteMovieCard(cardId){
  let movieIndex = cardId;
  
  alert(`${moviesList[movieIndex].title} - ${moviesList[movieIndex].type} is removed from watch list `);
  if(moviesList.length==1) output.innerHTML=``;
  moviesList.splice(movieIndex,1);
  localStorage.setItem("moviesList", JSON.stringify(moviesList));
  
  loadData(moviesList);
}


// Add event listeners for edit buttons
// document.querySelectorAll('.editStatusBtn').forEach(button => {
//   button.addEventListener('click', function () {
//     document.getElementById("status").classList.remove("d-none");
//     console.log("hello");
//     // const index = this.getAttribute('data-index');
//     // const newStatus = prompt("Enter new status:");
//     // if (newStatus) {
//     //   // Update in-memory data
//     //   movies[index].status = newStatus;

//     //   // Save back to localStorage
//     //   localStorage.setItem('moviesList', JSON.stringify(movies));

//     //   // Update DOM
//     //   const card = document.querySelector(`.card[data-index="${index}"]`);
//     //   const statusText = card.querySelector('.status-text');
//     //   statusText.textContent = newStatus;
//     // }
//   });
// });
// to clear the watch list add event listner

document.getElementById("clearList").addEventListener("click", ()=>{
  localStorage.clear();

  output.innerHTML=``;
  document.getElementById("hideClearbtn").classList.add("d-none");
  document.getElementById("home").classList.remove("d-none");
  document.getElementById("home").innerHTML=`Empty List PLz add some movies/tv shows.`;
  location.reload();

})


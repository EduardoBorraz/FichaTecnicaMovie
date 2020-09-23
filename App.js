//#region DOM - Variables
let form = document.querySelector("#form");
let movieList = document.querySelector('#movie-list');
let id = document.querySelector("#identificacion");
let title = document.querySelector("#titulo");
let director = document.querySelector("#director");
let country = document.querySelector("#pais");
let comboGenre = document.querySelector("#selectGenero");
let qualification = document.querySelector("#calificacion");
let year = document.querySelector("#año");
let arrayMovie = [];


//#endregion

//#region Functions Validations
const checkInput = () => {
  let _id = id.value.trim();
  let _title = title.value.trim();
  let _director = director.value.trim();
  let _country = country.value.trim();
  let selectGenre = comboGenre.options[comboGenre.selectedIndex].value;
  let _qualification = qualification.value.trim();
  let _year = year.value.trim();

  //Validation Id
  /* !/^([a-z]){2}([0-9]){7}$/.test(_id)
    ? setError(id,"It must have two letters, followed by 7 numbers.")
    : setSuccess(id); */
  if (_id === "") return setError(id, "Empty Field");
  if (!/^([a-z]){2}([0-9]){7}$/.test(_id)) return setError(id,"It must have two letters, followed by 7 numbers.");

  //Validation title
  if (_title === "") return setError(title, "Empty Field");
  if (!isNaN(_title)) return setError(title, "Do not number")
  //!isNaN(_title) ? setError(title, "Do not number") : setSuccess(title);

  //validation director
  if (_director === "") return setError(director, "Empty Field");
  if (!isNaN(_director)) return setError(director, "Do not number");
  /* !isNaN(_director)
    ? setError(director, "Do not number")
    : setSuccess(director);
 */
  //Validation country
  if (_country === "") return setError(country, "Empty Field");
  if (!isNaN(_country)) return  setError(country, "Do not number");
  //!isNaN(_country) ? setError(country, "Do not number") : setSuccess(country);

  //Validation Genre
  if (selectGenre === "genero")
    {return setError(comboGenre, "You have not selected the genre");}

  //validate qualification
  if (_qualification === "") return setError(qualification, "Empty Field");
  if (!/^([0-9]+(\.[0-9][0-9]?)?)$/.test(_qualification)) {return setError(qualification, "The grade must be between 0 and 10");}
  /* !/^([0-9]+(\.[0-9][0-9]?)?)$/.test(_qualification)
    ? setError(qualification, "The grade must be between 0 and 10")
    : setSuccess(qualification); */

  //Validate year
  /* !/^([0-9]){4}$/.test(_year)
    ? setError(year, "Year not valid, must be 4 digits")
    : setSuccess(year); */
  if (_year === "") return setError(year, "Empty Field");
  if (!/^([0-9]){4}$/.test(_year)){
    return setError(year, "Year not valid, must be 4 digits")
  }
  

    addMovie();
    saveStorage();
    showMessage("DataSheet Create","success");
};

const setError = (input, message) => {
  const formGroup = input.parentElement;
  //console.log(formGroup);
  const small = formGroup.querySelector("small");
  formGroup.className = "form-group error";
  small.innerText = message;
};

/* const setSuccess = (input) => {
  const formGropu = input.parentElement;
  formGropu.className = "form-group success";
}; */
//#endregion


//#region FunctionStorage
const addMovie = () => {

  
    let movie = {
      id: id.value,
      title: title.value,
      director: director.value,
      country: country.value,
      genre: comboGenre.options[comboGenre.selectedIndex].value,
      qualification: qualification.value,
      year: year.value,
    };
    arrayMovie.push(movie);
    return movie;
  
  
};

const saveStorage = () => {
  localStorage.setItem('Movie',JSON.stringify(arrayMovie));
  readStorage();
}

const deleteStorage = (movieDelete) => {
  let indexM;
  //console.log("=====Llega===",movieDelete);
  arrayMovie.forEach((element, index) => {
    console.log("Array Ttile ====>",element.id);
    if (element.id === movieDelete){
      indexM = index;
      console.log("-------->IdexNew ->",indexM = index);
    }
  })
  //console.log(arrayMovie.splice(indexM,1));
  arrayMovie.splice(indexM,1);
  saveStorage();
  showMessage("DataSheet Elminated","success");
  //console.log("Eliminado");

}

const readStorage = () => {
   movieList.innerHTML = "";
   arrayMovie = JSON.parse(localStorage.getItem('Movie'));

   arrayMovie === null
   ? (arrayMovie = []) 
   : arrayMovie.forEach(element => {
      movieList.innerHTML += `
                <div class="col-sm-6">
                    <div class="card mt-2" style="background: #f6f6f5;">
                        <div class="card-body">
                          <div class="row head">
                            <h4 class="card-title">${element.title}</h4>
                            <h5 class="text-muted">(${element.year})</h5>
                          </div>
                          <div class="row body">
                            <small class="text-muted">${element.id}</small>
                            <small><i class="fas fa-star"></i> ${element.qualification}</small>
                            <p class="card-text mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                          </div>
                          <div class="row foot">
                            <small class="text-muted">Director:</small>
                            <p>${element.director}</p>
                            <small class="text-muted dos">Genre:</small>
                            <p>${element.genre}</p>
                          </div>
                          <div class="row foot2">
                            <small class="text-muted">Country:</small>
                            <p>${element.country}</p>
                          </div>
                          <div class="buttons">
                            <span class="btn btn-danger btn-block">Delete</span>
                          </div>
                        </div>
                    </div>
                </div>  
     `
   });
}
 const showMessage = (message, csClass) => {
  const div = document.createElement("div");
  div.className = `alert alert-${csClass} mt-2`
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const notify = document.querySelector('#notification');
  container.insertBefore(div, notify);

  setTimeout(() =>{
    document.querySelector(".alert").remove();
  },3000)

 }

//#endregion


//#region DOM - Events
form.addEventListener("submit", (e) => {
  //console.log(e);
  e.preventDefault();

  checkInput();
  form.reset();

});

movieList.addEventListener("click", (e) =>{
  //console.log(e);
  e.preventDefault();

  if (e.target.innerHTML === "Delete"){
    let idDelete = e.path[2].childNodes[3].childNodes[1].innerHTML;
    
    //console.log(idDelete);
    if(e.target.innerHTML === "Delete"){
      //console.log("===Se Va ====>",idDelete);
      deleteStorage(idDelete);
   }
    
  }

})
document.addEventListener("DOMContentLoaded", readStorage);
//#endregion

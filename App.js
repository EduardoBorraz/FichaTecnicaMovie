//#region DOM
let form = document.querySelector("#form");
let id = document.querySelector("#identificacion");
let title = document.querySelector("#titulo");
let director = document.querySelector("#director");
let country = document.querySelector("#pais");
let comboGenre = document.querySelector("#selectGenero");
let qualification = document.querySelector("#calificacion");
let year = document.querySelector("#año");
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
  !/^([a-z]){2}([0-9]){7}$/.test(_id)
    ? setError(id, "Id Incorrect")
    : setSuccess(id);
  if (_id === "") return setError(id, "Empty Field");

  //Validation title
  if (_title === "") return setError(title, "Empty Field");
  !isNaN(_title) ? setError(title, "Do not number") : setSuccess(title);

  //validation director
  if (_director === "") return setError(director, "Empty Field");
  !isNaN(_director)
    ? setError(director, "Do not number")
    : setSuccess(director);

  //Validation country
  if (_country === "") return setError(country, "Empty Field");
  !isNaN(_country) ? setError(country, "Do not number") : setSuccess(country);

  //Validation Genre
  if (selectGenre === "genero")
    return setError(comboGenre, "You have not selected the genre");
  switch (selectGenre) {
    case "1":
      setSuccess(comboGenre);
      break;
    case "2":
      setSuccess(comboGenre);
      break;
    case "3":
      setSuccess(comboGenre);
      break;
    case "4":
      setSuccess(comboGenre);
      break;

    case "5":
      setSuccess(comboGenre);
      break;
    case "6":
      setSuccess(comboGenre);
      break;
    case "7":
      setSuccess(comboGenre);
      break;
    case "8":
      setSuccess(comboGenre);
      break;

    default:
      break;
  }

  //validate qualification
  if (_qualification === "") return setError(qualification, "Empty Field");
  !/^([0-9]+(\.[0-9][0-9]?)?)$/.test(_qualification)
    ? setError(qualification, "The grade must be between 0 and 10")
    : setSuccess(qualification);

  //Validate year
  if (_year === "") return setError(year, "Empty Field");
  !/^([0-9]){4}$/.test(_year) ? setError(year,'Year not valid, must be 4 digits') : setSuccess(year);

};


/* const valideteTextString = (property) => {
  if (property === "") return setError(property, "Empty Field");
}; */

const setError = (input, message) => {
  const formGroup = input.parentElement;
  console.log(formGroup);
  const small = formGroup.querySelector("small");
  formGroup.className = "form-group error";
  small.innerText = message;
};

const setSuccess = (input) => {
  const formGropu = input.parentElement;
  formGropu.className = "form-group success";
};
//#endregion

//#region DOM - Events
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInput();
});
//#endregion

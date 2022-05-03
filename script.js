const displayBooksTable = document.getElementById("display-books");
displayBooksTable.addEventListener("click", (event) => {
  if (event.target.classList.contains('delete-book')) {
    removeBook(event.target);
  } else if(event.target.classList.contains('toggle-read-mode')) {
    toggleReadMode(event.target);
  }
})

const tableBodyBooksTable = displayBooksTable.querySelector('tbody');

const newBookButton = document.getElementById("create-book");
newBookButton.addEventListener("click", toggleAddForm)

const addBookForm = document.getElementById("add-book-form");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBook();
  toggleAddForm();
})

const backgroundDrop = document.getElementById("background-drop");
const divContainer = document.querySelector(".container");

class Book {
  constructor(author="", title="", pages=0, isRead=false) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function toggleAddForm() {
  addBookForm.classList.toggle('show');
  backgroundDrop.classList.toggle('show');
  divContainer.classList.toggle('hidden')
}

function addBook() {
  const author = addBookForm.elements['new-author'].value;
  const title = addBookForm.elements['new-title'].value;
  const pages = parseInt(addBookForm.elements['new-pages'].value);

  const newReadBtn = addBookForm.elements['new-read'];

  let isRead = false;

  if (newReadBtn.checked) {
   isRead = true
  }

  bookToAdd = new Book(author, title, pages, isRead);

  let newRow = tableBodyBooksTable.insertRow(-1);
  
  for(let key in bookToAdd) {
    let newCell = newRow.insertCell(-1);
    newCell.innerHTML = bookToAdd[key];
  }

  let deleteBookCell = newRow.insertCell(-1);
  deleteBookCell.innerHTML = `<button class="delete-book">X</button>`;
  let toggleReadModeCell = newRow.insertCell(-1);
  toggleReadModeCell.innerHTML = `<button class="toggle-read-mode">T</button>`;

  tableBodyBooksTable.appendChild(newRow);
}

function removeBook(element) {
  element.parentElement.parentElement.remove();
}

function toggleReadMode(element) {
  readMode = element.parentElement.parentElement.cells[3];
  readMode.innerText = (readMode.innerText == "true") ? "false" : "true";
}

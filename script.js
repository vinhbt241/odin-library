const displayBooksTable = document.getElementById("display-books");
displayBooksTable.addEventListener("click", (event) => {
  removeBook(event.target);
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
  deleteBookCell.innerHTML = `<button class="delete-button">X</button>`;

  tableBodyBooksTable.appendChild(newRow);
}

function removeBook(element) {
  if(element.classList.contains('delete-button')){
    element.parentElement.parentElement.remove();
  }
}

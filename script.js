const library = [];

const displayBooksTable = document.getElementById("display-books");

const newBookButton = document.getElementById("create-book");
newBookButton.addEventListener("click", displayAddForm)

const removeBookButton = document.getElementById("remove-book");
removeBookButton.addEventListener("click", populateRemoveForm)

const addBookForm = document.getElementById("add-book-form");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBook();
})

const removeBookForm = document.getElementById("remove-book-form");
removeBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  removeBook();
})

class Book {
  constructor(author="", title="", pages=0, isRead=false) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary() {
  for(let book of arguments) {
    library.push(book)
  }
}

function displayBooks() {
  let newTableBody = document.createElement('tbody');
  let oldTableBody = displayBooksTable.querySelector('tbody');

  for(let book of library) {
    let row = newTableBody.insertRow(-1);

    for(let key in book) {
      let cell = row.insertCell(-1);
      cell.innerHTML = book[key];
    }
  }

  displayBooksTable.replaceChild(newTableBody, oldTableBody)
}


function displayAddForm() {
  console.log("gonna pop up form here!")
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

  const book = new Book(author, title, pages, isRead)

  addBookToLibrary(book);
  displayBooks();
}

function populateRemoveForm() {
  removeBookForm.innerHTML = ""

  for(let i = 0; i < library.length; i++) {
    let book = library[i];

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "remove-books";
    checkbox.value = i;
    checkbox.id = `book-index-${i}`

    let label = document.createElement('label');
    label.htmlFor = `book-index-${i}`;
    label.appendChild(document.createTextNode(`${book.title}`));

    removeBookForm.appendChild(checkbox);
    removeBookForm.appendChild(label);
  }

  let submitButton = document.createElement("button");
  submitButton.type = "submit"
  submitButton.innerText = "Remove choosen books"

  removeBookForm.appendChild(submitButton)
}

function removeBook() {
  console.log("Gonna remove book from library");
}

displayBooks();

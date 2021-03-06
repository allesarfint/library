//TODO: Get book cover img from search query

// Array to hold the books
let myLibrary = [];

// Create localStorage is empty
if(!localStorage.getItem("myLibrary")) {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// Function to retrieve localStorage myLibrary data
function getMyLibraryFromLocalStorage() {
    const localStorageLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    myLibrary = localStorageLibrary;
}

getMyLibraryFromLocalStorage()

// Function to save myLibrary to localStorage
function setMyLibraryToLocalStorage(library) {
    const stringLibrary = JSON.stringify(library.filter(n => n));
    localStorage.myLibrary = stringLibrary;
}

// Object prototype for the book
class Book {
    constructor (title, author, pages, read, cover) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.cover = cover;
    }
}

// Construct and push new object Book object to myLibrary Array 
function addBookToLibrary(title, author, pages, read, cover = defaultImg, library) {
    if (!title) return
    if (!author) author = "Anonymous"
    if (!pages) pages = "Unknown"
    const newBook = new Book(title, author, pages, read, cover);
    library.push(newBook);
    setMyLibraryToLocalStorage(library);
}

// Create HTML cards based on the Book objects from myLibrary Array
function createBookCard(title, author, pages, read, cover, index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.book = index;
    const bookCover = document.createElement("div");
        bookCover.classList.add("book-cover");
        bookCard.appendChild(bookCover);
            const imgCover = document.createElement("img");
            imgCover.src = cover;
            bookCover.appendChild(imgCover);
        const bookDetails = document.createElement("div");
        bookDetails.classList.add("book-details");
        bookCard.appendChild(bookDetails);
            const deleteDiv = document.createElement("div");
            deleteDiv.classList.add("delete");
            bookDetails.appendChild(deleteDiv);
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
                deleteButton.dataset.deleteBook = index;
                deleteButton.addEventListener("click", () => {
                    deleteBookFromLibrary(index);
                    deleteBookFromContent(index);
                })
                deleteButton.textContent = `???????`;
                deleteDiv.appendChild(deleteButton);
            const bookInfo = document.createElement("div");
            bookInfo.classList.add("book-info");
            bookDetails.appendChild(bookInfo);
            const bookTitle = document.createElement("div");
                bookTitle.classList.add("book-title", "info");
                bookTitle.textContent = title;
                bookInfo.appendChild(bookTitle);
                const bookAuthor = document.createElement("div");
                bookAuthor.classList.add("book-author", "info");
                bookAuthor.textContent = author;
                bookInfo.appendChild(bookAuthor);
                const bookPages = document.createElement("div");
                bookPages.classList.add("book-pages", "info");
                bookPages.textContent = `Pages: ${pages}`;
                bookInfo.appendChild(bookPages);
                const bookRead = document.createElement("div");
                bookRead.classList.add("book-read", "info");
                bookInfo.appendChild(bookRead);
                    const readCheck = document.createElement("input");
                    readCheck.type = "checkbox";
                    readCheck.id = index;
                    readCheck.classList.add("read");
                    if(read === true) {
                        readCheck.checked = true;
                        bookCard.classList.add("readed");
                    }
                    readCheck.addEventListener("change", () => {
                        bookCard.classList.toggle("readed");
                        changeReadStatus(index, readCheck.checked)
                    })
                    bookRead.appendChild(readCheck);
                    const labelRead = document.createElement("label");
                    labelRead.classList.add("label-read");
                    labelRead.htmlFor = index;
                    labelRead.textContent = "Already read";
                    bookRead.appendChild(labelRead);

    return bookCard
}

// Append Book cards stored in the myLibrary Arra as childnodes in the DOM
const content = document.querySelector("content");

function appendLibraryToContent(array, content) {
    array.forEach((book, index) => {
        const   title = book.title,
                author = book.author,
                pages = book.pages,
                read = book.read,
                cover = book.cover;
        
        const newBook = createBookCard(title, author, pages, read, cover, index);

        content.appendChild(newBook);
    });
}

appendLibraryToContent(myLibrary, content);

// Modal functionality
const newBookButton = document.querySelector("#new-book-button");
const modal = document.querySelector(".modal");

    // Make the modal visible
newBookButton.addEventListener("click", () => {
    modal.classList.toggle("hide");
})

let inputTitle = document.querySelector("#input-title"),
    inputAuthor = document.querySelector("#input-author"),
    inputPages = document.querySelector("#input-pages"),
    checkRead = document.querySelector("#check-read");
    
const defaultImg = "https://code-artisan.io/wp-content/uploads/2020/12/default_book_cover_2015.jpg";

const   addBookButton = document.querySelector("#add-book"),
        closeModalButton = document.querySelector("#close");

    // Function to hide the modal
function closeModal() {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    checkRead.checked = false;

    modal.classList.toggle("hide");
}

closeModalButton.addEventListener("click", () => {
    closeModal()
})

// Append new created Book cards as childnodes in the DOM
function addBookToContent(title, author, pages, read, cover, content) {
    if (!title) return
    if (!author) author = "Anonymous"
    if (!pages) pages = "Unknown"

    const index = myLibrary.length - 1;

    const newBook = createBookCard(title, author, pages, read, cover, index);
    content.appendChild(newBook);
}

// Event listener to create new Book object based on user input
// Add to myLibrary Array and append to DOM
addBookButton.addEventListener("click", () => {

    let title = inputTitle.value,
        author = inputAuthor.value,
        pages = inputPages.value,
        read = checkRead.checked,
        library = myLibrary,
        content = document.querySelector("content");

    closeModal()

    addBookToLibrary(title, author, pages, read, defaultImg, library)
    addBookToContent(title, author, pages, read, defaultImg, content)
})

// Function to delete books from myLibrary Array
function deleteBookFromLibrary(index) {
    delete myLibrary[index];
    setMyLibraryToLocalStorage(myLibrary)
}

// Function to delete book card from DOM
function deleteBookFromContent(index) {
    const elem = document.querySelector(`[data-book="${index}"]`)
    content.removeChild(elem);
}

// Function to change read status on Book object from myLibrary Array
function changeReadStatus(index, status) {
    myLibrary[index].read = status;
    setMyLibraryToLocalStorage(myLibrary)
}
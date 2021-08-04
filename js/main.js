let myLibrary = [
    {
        title: "Don Quijote de la Mancha",
        author: "Miguel de Cervantes Saavedra",
        pages: "1000",
        read: false,
        cover: "https://www.makaobora.co.ke/bora/wp-content/uploads/2020/03/DON-QUIXOTE.jpg",
    },
    {
        title: "Cien Años de Soledad",
        author: "Gabriel Garcia Marquez",
        pages: "500",
        read: true,
        cover: "https://www.popularlibros.com/imagenes_grandes/9788497/978849759220.JPG",
    },
];

function Book(title, author, pages, read, cover) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.cover = cover
}

const newBookButton = document.querySelector("#new-book-button");
const modal = document.querySelector(".modal");

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

addBookButton.addEventListener("click", () => {

    let title = inputTitle.value,
        author = inputAuthor.value,
        pages = inputPages.value,
        read = checkRead.checked,
        library = myLibrary;

    closeModal()

    addBookToLibrary(title, author = "Anonymous", pages = "Unknown", read, cover = defaultImg, library)
})

function addBookToLibrary(title, author, pages, read, cover, library) {
    if (!title) return
    const book = new Book(title, author, pages, read, cover);
    library.push(book);
}

function createBookCard(title, author, pages, read, cover, index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
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
                deleteButton.textContent = `🗑️`;
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
                bookPages.textContent = `${pages} pages`;
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
                    bookRead.appendChild(readCheck);
                    const labelRead = document.createElement("label");
                    labelRead.classList.add("label-read");
                    labelRead.htmlFor = index;
                    labelRead.textContent = "Already read";
                    bookRead.appendChild(labelRead);

    return bookCard    
}

const content = document.querySelector("content");

function appendBookCardToContent(array, content) {
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

appendBookCardToContent(myLibrary, content);
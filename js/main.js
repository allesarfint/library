let myLibrary = [
    {
        title: "Don Quijote",
        author: "Miguel de Cervantes",
        pages: "1000",
        read: false,
        cover: "https://www.makaobora.co.ke/bora/wp-content/uploads/2020/03/DON-QUIXOTE.jpg",
    },
    {
        title: "Cien Años de Soledad",
        author: "Gabriel Garcia Marquez",
        pages: "500",
        read: false,
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

function addBookToLibrary(title, author, pages, cover, read, library) {
    const book = new Book(title, author, pages, read, cover);
    library.push(book);
}
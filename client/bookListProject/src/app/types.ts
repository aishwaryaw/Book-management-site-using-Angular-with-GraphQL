export type Book = {
    id: number;
   name : string,
   genre : String,
   authorId : string
}

export type Author = {
    id: number;
   name : string,
    age : number
}

export type bookQuery = {
    books: Book[];
}
export type book = {
    book: Book;
}
export type authorQuery = {
    authors: Author[];
}
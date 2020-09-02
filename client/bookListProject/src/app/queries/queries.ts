
import gql from 'graphql-tag'
import { Book , Author} from 'src/app/types';

// 2
export const AllBooksQuery = gql`
  query AllBooksQuery {
    books {
      id,
     name,
     genre
    }
  }
`;

export const AllAuthorsQuery = gql`
  query AllAuthorsQuery {
    authors {
      id,
     name,
     age
    }
  }
`;

export const BookQuery = gql`
  query BookQuery($id : ID!) {
    book(id : $id) {
      id,
     name,
     genre,
    author{
      name,
      age,
      books{
        name,
        genre
      }
    }
    }
  }
`;

export const bookMutation = gql`
mutation AddBook($name : String! , $genre : String! , $authorId : ID!){

addBook(name : $name , genre : $genre , authorId : $authorId){

  name,
  genre
}

}`
;

export const authorMutation = gql`
mutation AddAuthor($name : String! , $age : Int!){

addAuthor(name : $name , age : $age){

  name,
  age
}

}`
;
export const deleteBookMutation = gql`
mutation deleteBook($id : ID!)
{
deleteBook(id : $id)
{
name,
genre
}
}
`
;
export const updateBookMutation = gql`
mutation updateBook($id : ID!,$name : String! , $genre : String! , $authorId : ID!)
{
updateBook(id : $id, name : $name , genre : $genre , authorId : $authorId)
{
name,
genre
}
}
`
;

// 3
export interface AllQueryResponse {
  books: Book[];
  authors : Author[];
  addAuthor : Author;
  addBook : Book;
  loading: boolean;

}
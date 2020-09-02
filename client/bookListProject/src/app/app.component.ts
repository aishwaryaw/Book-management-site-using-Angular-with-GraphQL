import { Component, OnInit, Query } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Book ,authorQuery,bookQuery, Author ,book} from './types';

import {AllBooksQuery,AllAuthorsQuery ,AllQueryResponse , bookMutation, authorMutation ,deleteBookMutation,BookQuery} from './queries/queries';
import { EventEmitter } from 'events';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  outputs :   ['selectedBook']
})


export class AppComponent implements OnInit {
  title = 'bookListProject';
  books : Book[] = []; 
  authors : Author[] = []; 
  name :string = '';
  age : number;
  genre : string='';
  authorId : string='';
  book : Book ;
  private selectedBook = new EventEmitter();
  constructor(private apollo : Apollo){}

  
  ngOnInit(){
   this.apollo.watchQuery<bookQuery>({
      query: AllBooksQuery
    }).valueChanges.subscribe((response)=>
    {
      
      this.books = response.data.books;
     
    } );


    this.apollo.watchQuery<authorQuery>({
      query: AllAuthorsQuery
    }).valueChanges.subscribe((response)=>
    {
      
      this.authors = response.data.authors;
     
    } );

   
   

  }

  // addAuthor(){

  //   this.apollo.mutate({
  //     mutation : authorMutation,
  //     variables : {
  //       name : this.name,
  //       age : parseInt(this.age)
  //     }
  //   }).subscribe((response)=>
  //   {
  //     console.log('author added');
  //   })
  // }

  addBook(){

    this.apollo.mutate({
      mutation : bookMutation,
      variables : {
        name : this.name,
        genre : this.genre,
        authorId : this.authorId
      }
    }).subscribe((response)=>
    {
      alert('book added');
      location.reload();
    })
  }

 

  seeBookDetails(bookid){

    console.log('clicked');
    this.apollo.watchQuery<book>({
      query : BookQuery,
      variables:{
        id : bookid
      }
    }).valueChanges.subscribe((response)=>
    {
      this.book = response.data.book;
      
    this.selectedBook.emit(JSON.stringify(this.book));

    });

  }
}


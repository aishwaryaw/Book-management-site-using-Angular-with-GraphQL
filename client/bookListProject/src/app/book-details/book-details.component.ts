import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'events';
import { Apollo } from 'apollo-angular';
import { lexicographicSortSchema } from 'graphql';
import {Book ,authorQuery,bookQuery, Author ,book} from '../types';
import {AllBooksQuery,AllAuthorsQuery ,AllQueryResponse , bookMutation, authorMutation ,deleteBookMutation,updateBookMutation,BookQuery} from '../queries/queries';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  inputs : ['book']

})
export class BookDetailsComponent implements OnInit {
book : Book;
name :string = '';
  age : number;
  genre : string='';
  authorId : string='';
  show : boolean= false ;
  authors : Author[] = []; 
  constructor(private apollo : Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<authorQuery>({
      query: AllAuthorsQuery
    }).valueChanges.subscribe((response)=>
    {
      
      this.authors = response.data.authors;
     
    } );

  }
  update(){
  this.show = true;
  }
  deleteBook(bookid){

    this.apollo.mutate({
      mutation : deleteBookMutation,
      variables : {
       
        id : bookid
      }
    }).subscribe((response)=>
    {
      alert('book deleted');
      location.reload();
    })
  }

  updateBook(bookid){

    this.apollo.mutate({
      mutation : updateBookMutation,
      variables : {
        id : bookid,
        name : this.name,
        genre : this.genre,
        authorId : this.authorId
      }
    }).subscribe((response)=>
    {
      alert('book updated');
      location.reload();
    })
  }


}
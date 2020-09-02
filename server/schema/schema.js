const graphql = require('graphql');
const _ = require('lodash');
const Authors = require('../models/author');
const Books = require('../models/book');


const {
GraphQLObjectType ,
GraphQLID,
GraphQLInt,
GraphQLString,
GraphQLSchema,
GraphQLList
} = graphql;

// dummy data
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1' , authorID:'1'},
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2' , authorID:'2'},
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorID:'3' },
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ];


const BookType = new GraphQLObjectType({

    name : 'Book',
    fields : ()=> ({
        name : { type : GraphQLString } ,
        id : { type : GraphQLID },
        genre : { type : GraphQLString} , 
        author : {
            type : AuthorType,
            resolve(parent , args){
               // return _.find( authors , {id : parent.authorID});
               return Authors.findById(parent.authorId);
            }
        }

    })
});

const AuthorType = new GraphQLObjectType({

    name : 'Author',
    fields : () =>({
        name : { type : GraphQLString } ,
        id : { type : GraphQLID },
        age : {type : GraphQLInt},
        books : {
            type : new GraphQLList(BookType),
            resolve(parent , args){
                //return _.filter(books, {authorID : parent.id});
                return Books.find({ authorId : parent.id});
            }
        }

    })
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : { id : {type : GraphQLID}},
            resolve(parent , args ){
               // return _.find(books , { id : args.id});
               return Books.findById(args.id);
            }

        },

        author :{
            type : AuthorType,
            args : { id : { type : GraphQLID}},
            resolve(parent, args){
                //return _.find(authors , {id : args.id});
                return Authors.findById( args.id);
            }
        },

        authors :{
        type : new GraphQLList(AuthorType),
        resolve(parent, args){
            //return _.find(authors , {id : args.id});
            return Authors.find({});
        }
    },

        books :{
            type : new GraphQLList(BookType),
            resolve(parent, args){
                //return _.find(authors , {id : args.id});
                return Books.find({});
    }
}
}
});

const mutation = new GraphQLObjectType({

    name : 'Mutation',
    fields : {

        addAuthor :
        {
            type : AuthorType,
            args : {
                name : { type : GraphQLString } ,
                age : { type : GraphQLInt}

            },
                resolve(parent , args ){

                    let author = new Authors({
                        name : args.name,
                        age : args.age
                    });
                    return author.save();

                }
            },
        

        addBook :{

            type : BookType,
            args : { 
                name : { type : GraphQLString },
                genre : { type : GraphQLString},
                authorId : { type : GraphQLID},

        },
        resolve(parent , args ){
            let book = new Books({
                name : args.name,
                genre : args.genre,
                authorId : args.authorId
            });
            return book.save();
        }
    },

    deleteBook:{
        type : BookType,
        args:{ 
        id : {type : GraphQLID}
        },
        resolve(parent,args){
        
            Books.findByIdAndDelete({_id : args.id},(err,res)=>{
            return res
            });
        }
        },
        
        updateBook:
        {
        type : BookType,
        args:{
        id : {type : GraphQLID},
        name : { type : GraphQLString },
        genre : { type : GraphQLString},
        authorId : { type : GraphQLID},
        },
        resolve(parent,args)
        {

         Books.findByIdAndUpdate({_id:args.id},{
            name : args.name,
            genre : args.genre,
            authorId : args.authorId
        },(err,res)=>
        {
            return res;
        });
        }
        }

}
});

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation: mutation
});

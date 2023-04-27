const findAuthorById=(authors, id)=> {
  return authors.find((writer)=>writer.id === id)
  
     
 }
 function findBookById(books, id) {
   return books.find((novel)=>novel.id === id)
   
 }
 
 function partitionBooksByBorrowedStatus(books ={}) {
   const inLibrary = books.filter((bookObj) => {
     const {borrows} = bookObj;
     return borrows[0].returned === true;
   })
   const outLibrary = books.filter((bookObj)=>{
     const {borrows} = bookObj;
     return borrows[0].returned === false;
   })
   return [outLibrary,inLibrary];
 }
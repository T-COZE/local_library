const { getTotalNumberOfBorrows } = require("./accounts")

function getTotalBooksCount(books) {
return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  counter = 0
  books.forEach((booksObj)=>{ 
    const {borrows}= booksObj
    if(borrows[0].returned === false)
    return counter ++
  })
  return counter
 }

 function getMostCommonGenres(books) {
  const bookGenreArray = books.map((book)=>book.genre);// <-  transformin arr to array of genres
  const countObj = {};  //<-- super clutch  need to be able to return an ohj for next line to work
  bookGenreArray.forEach((genre)=>{
      countObj[genre] = countObj[genre] ? countObj[genre] + 1 : 1 //<-- never underestimate google and using correct
    }                                                             // terminology
  )
  const results = []  // <--
  for(let keys in countObj){
    results.push({name: keys, count: countObj[keys]}) //< .push({written out object}) to resulting array
  }
  results.sort((objA,objB)=>{   //<-- Sorting by the value of count in the object
    return objA.count > objB.count ? -1 : 1
  })

  return results.slice(0,5);
}

function getMostPopularBooks(books) {
  const result = books.map((book)=>{
    return {name: book.title, count: getNumberOfBorrows(book)}
  })
  result.sort((objA, objB)=> {
    return objA.count > objB.count ? -1:1
  })
  return result.slice(0,5)
}

const getNumberOfBorrows = ({borrows}) => {
  return borrows.length
}

//   const popularBooks = {}
//   books.forEach((bookObj)=>{
//     const {borrows}=bookObj
//     popularBooks[bookObj.title] = borrows.length
//   })
//   const bookNames = Object.keys(popularBooks)
//   const results = bookNames.map((bookTitles)=>{
//     return { name: bookTitles, count: popularBooks[bookTitles]}
//   })
//   results.sort((bookA, bookB)=>{return bookB.count -bookA.count})
//   return results.slice(0,5)
// }

function getMostPopularAuthors(books, authors) {
  const popularAuthor = {};
  books.forEach((bookObj)=>{
    const {borrows} = bookObj;
    if(popularAuthor[bookObj.authorId] === undefined){
      popularAuthor[bookObj.authorId] = borrows.length;
    }else{
      popularAuthor[bookObj.authorId] += borrows.length;
    }
  })
  const authorIdArr = Object.keys(popularAuthor);

  const results = authorIdArr.map((authorIdNum)=>{
    return {name: formatAuthorName(authorIdNum,authors), count: popularAuthor[authorIdNum]}
  })
  results.sort((authorA, authorB)=>{
    return authorB.count - authorA.count
  })
  return results.slice(0,5);
}

function formatAuthorName(authorId = 0, authors = []){
const authorObj = authors.find((authorObj)=>{
  return (authorObj.id - authorId === 0)
})
  const {name} = authorObj
  return `${name.first} ${name.last}`
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

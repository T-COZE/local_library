function findAccountById(accounts, id) {
  return accounts.find((num)=>num.id === id)
}
function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB)=> nameA.name.last > nameB.name.last ? 1:-1)
}
  
  const getTotalNumberOfBorrows=(account={},books=[])=>{
    //create counter variable
    const counter = books.reduce((acc, bookObj)=>{
      //need the borrows array
      const {borrows} = bookObj;
      //for each to go thorugh each index of the borrows array
      borrows.forEach((borrowObj) => {
        //if bookobj id matches the account id, accumulator adds one
        if(borrowObj.id === account.id){
          acc++;
        }
      })
      return acc;
    },0)
    return counter;
  }
  
  function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
    const result = [];
    books.forEach((bookObj)=>{
      const {borrows} = bookObj;
      borrows.forEach((borrowsObj)=>{
        if(borrowsObj.id === account.id && !borrowsObj.returned){
          const authorId = bookObj.authorId;
          bookObj.author = authors.find((authorObj) =>{
            return authorId === authorObj.id;
          })
         result.push({...bookObj});
        }
      })
    })
    return result;
  }
  
  // find books checked out for given account accountID
  // push book items into bookArray


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

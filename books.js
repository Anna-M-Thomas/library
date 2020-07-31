document.addEventListener("DOMContentLoaded", function(){

//contains the Book objects
let myLibrary = []; 

//makes a new Book object
function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.hasread = function(){
    let readString = "";
    if(this.read==true){readString = "Have read"} 
      else{readString="Haven't read"};
    return `${readString}`;
  }
}

//gets necessary shared dom bits from page
let container = document.getElementById("container");
let newBookButton = document.getElementById("newBookButton");
let submitButton = document.getElementById("finished");
let bookForm = document.getElementById("bookForm");

//adds event listeners for new book form and add book buttons
newBookButton.addEventListener("click", function(e){
    bookForm.style.display = "inline";
});
  submitButton.addEventListener("click", addBook);

//shows all the books in array (makes a div if none, renews para in div if already made)
function showBooks(array){
  for(book of array){
    let index = array.indexOf(book);
    let div = document.getElementById(index);
    if(div == null){
      makeBookDiv(book, index);
    }
    //Felt more natural with right to left with newest book on left 
    //Considering form placement, so changed to unshift instead of push in addBook()
    let p = document.getElementById ("bookinfo" + index);
    p.textContent = `Title: ${book.title}\n
                        Author: ${book.author}\n
                        Pages: ${book.pages}\n
                        Read: ${book.hasread()}`;
  }
}

function makeBookDiv(object, index){
    let div = document.createElement('div');
    let deleteButton = document.createElement('button');
    let readButton = document.createElement('button');
    let paragraph =document.createElement("P");
    deleteButton.textContent = "Remove";
    deleteButton.setAttribute("class", "deleteButton");
    readButton.textContent = "Read";
    readButton.setAttribute("class", "readButton");
    div.setAttribute("class", "book"); 
    div.setAttribute("id", index);
    paragraph.setAttribute("id", "bookinfo" + index);
    container.appendChild(div);
    div.appendChild(paragraph);
    div.appendChild(deleteButton);
    div.appendChild(readButton);
    deleteButton.addEventListener("click", removeBook);
    readButton.addEventListener("click", readToggle);
}

function addBook(){
//it won't do any of this if form isn't filled out (required sections)
  if(bookForm.reportValidity()){
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let read = document.querySelector('input[name = "read"]:checked').value
  //converts read to a Boolean because Boolean("false") is true
  //since "false" existing and all is so truth-y, thank you Javascript that is very helpful
  read==="true"? read = true : read = false; 
  let newBook = new Book (title.value, author.value, pages.value, read);
  myLibrary.unshift(newBook);
  bookForm.style.display = "none";
  //resets fields in form 
  bookForm.reset();
  showBooks(myLibrary);}
}

function removeBook(){
  let removeBookNode = event.target.parentElement;
  let removeIndex = removeBookNode.id; 
  myLibrary.splice(removeIndex, 1);
  removeBookNode.remove();//gets rid of the div
}


function readToggle(){
  let toggleBookNode = event.target.parentElement;
  let toggleIndex = toggleBookNode.id;
  let toggleBook = myLibrary[toggleIndex];
  let value = toggleBook.read;
  toggleBook.read = !value;
    showBooks(myLibrary);
} 

});

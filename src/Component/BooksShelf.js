import React from "react"
import "../Styles/BooksShelf.css";
import { update } from '../BooksAPI';

function BooksShelf(props) {

  const books = props.books
  
  
  // The check Function check where the book should be placed

  const check = (value, bookShelf) =>{
    if (value === bookShelf){
      return <svg width="20px"  fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path></svg>
    }
  }


  return (
    <div className="main">
      <h2 className="header">{props.title}</h2>
      {props.title && <hr /> }
        {
            books["books"].map(book => (
            book.shelf === `${props.shelf}` || props.any != null ?
              <div key={book.title} className="books">
                <div className="book">
                  <img  className="book-cover" src={book.imageLinks.smallThumbnail} alt="img"/>
                  <div className="dropdown">
                    <button className="btn dropdown btn-success btn-circle btn-xl course-circle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <svg className="arrow" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <p className="dropdown-item disabled" value="currentlyReading" href="#"> Move to..  </p>
                      
                      <p className="dropdown-item" value="currentlyReading" href="#" onClick={() => {
                        book.shelf = "currentlyReading"
                        update(book, "currentlyReading")
                        props.makeRender()
                      }}> Currently Reading {check("currentlyReading", book.shelf)}  </p>

                      <p className="dropdown-item" value="read" href="#" onClick={() => {
                        book.shelf = "read"
                        update(book, "read")
                        props.makeRender()
                      }}> Read {check("read", book.shelf)}  </p>

                      <p className="dropdown-item" value="Wanttoread" href="#" onClick={() => {
                        book.shelf = "wantToRead"
                        update(book, "wantToRead")
                        props.makeRender()
                      }}> Want to read {check("wantToRead", book.shelf)} </p>

                      <p className="dropdown-item" value="none" href="#" onClick={() => {
                        book.shelf = "none"
                        update(book, "none")
                        props.makeRender()
                      }}> None {check("none", book.shelf)} </p>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>

                </div>
              </div>
             : null
             ))
            }
          
    </div>
  )
  
}

export default BooksShelf
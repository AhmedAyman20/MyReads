import React, {useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "../Styles/BooksShelf.css";
import BooksShelf from "./BooksShelf";
import Header from "./Header";
import Search from "./Search";
import * as BooksAPI from "../BooksAPI"

function MainPage() {
  
  const [count, setCount] = useState(0);

  const [books, setBooks] = useState([]);

  async function getAllBooks (){
    const data = await BooksAPI.getAll()
    setBooks({"books" : data})
  }

  useEffect(() => {
    getAllBooks();
  },[])

  // Checking which page we should Render to

  const makeRender = () => {
    setCount(count+1)
  }
    if (books.length === 0){
      return <p>Loading profile...</p>;
    }
    return (
      <div>
        <Header />
        <Link to={`/search`} className="search-icon" onClick={() => <Search books={books} shelf="any" title="searching" />}>
          <button type="button" className="btn btn-success btn-circle btn-xl">
          <svg className="plus" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" width="45px" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>        </button>
        </Link>
        <BooksShelf makeRender={makeRender} books={books} shelf="currentlyReading" title="Currently Reading"/>
        <BooksShelf makeRender={makeRender} books={books} shelf="read" title="Read"/>
        <BooksShelf makeRender={makeRender} books={books} shelf="wantToRead" title="Want to Read"/>
        
      </div>
    )
}

export default MainPage
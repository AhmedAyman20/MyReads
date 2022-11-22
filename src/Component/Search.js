import React, { useState } from "react"
import { Link } from "react-router-dom";
import "../Styles/Search.css";
import SearchPage from "./SearchPage";

const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};


function Search() {

  const [text, setText] = useState("");
  const [books, setBooks] = useState([]);
  const [Allbooks, setAllBooks] = useState([]);
  const [count, setCount] = useState(0);

  const getAll = () =>{
    return fetch(`${api}/books`, { headers })
      .then((res) => res.json())
      .then((data) => setAllBooks(data));
  }

  const search = (query, maxResults) => {
    return fetch(`${api}/search`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, maxResults }),
    })
      .then((res) => res.json())
      .then((data) => setBooks(data.books));
  }

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (text.length === 1) setBooks([])
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) setBooks([])
    else{
      search(text)
      getAll()
    }
    
  };

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const makeRender = async event => {
    await delay(500);
    search(text)
    getAll()
    setCount(count + 1)
    await delay(4000);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} style={{marginBottom:"85px"}}>
        <div className="div-form">
          <Link to="/">
            <svg className="form-arrow" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024"  xmlns="http://www.w3.org/2000/svg"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
          </Link>
          <input className="form"
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder= "Search by title, author, or ISBN"
          />
        </div>
      </form>
      {books.length !== 0 && <SearchPage makeRender={makeRender} books={books} Allbooks={Allbooks} shelf="any" any = "true" />}
    </div>

  )
}

export default Search
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const style = {
    backgroundColor: "blue",
    height: "30px",
    width: "30px"
  };
  const [query, setQuery] = useState();
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=india"
  );
  const perPage = 5;
  const [cpage, setCpage] = useState(1);

  let arr = [];
  const page = 20;
  const cal = page / perPage;
  for (let i = 1; i <= cal; i++) {
    arr.push(i);
  }
  const start = (cpage - 1) * perPage;
  const end = start + perPage;
  let p = data.hits.slice(start, end);
  function handle(e) {
    setCpage(e.target.value);
    e.target.style.backgroundColor = "yellow";
  }
  console.log("Rendering App..");
  useEffect(() => {
    console.log("Fetching data..");
    const fetchdata = async () => {
      const result = await axios(url);
      setData(result.data);
    };
    fetchdata();
  }, [url]);
  //console.log(data)
  return (
    <>
      <h2>Axios data</h2>
      <form
        onSubmit={(e) => {
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
          e.preventDefault();
        }}
      >
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <button>Search</button>
      </form>
      {p.map((item) => (
        <ul>
          <li>
            <a
              onClick={(e) => (e.target.style.color = "green")}
              href={item.url}
            >
              {item.title}
              {data.map}
            </a>
          </li>
        </ul>
      ))}
      {arr.map((item) => (
        <button style={style} onClick={handle} value={item}>
          {item}
        </button>
      ))}
    </>
  );
}

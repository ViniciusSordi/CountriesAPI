import React from "react";
import { Link } from "react-router-dom";
import "../Css/main.css";
import InputArea from "./InputArea";

const Main = () => {
  const [dataJSON, setDataJSON] = React.useState("");
  const [data, setData] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [loading, setLoading] = React.useState("");

  React.useEffect(() => {
    async function puxarDados() {
      setLoading(true);
      const dadosResponse = await fetch("https://restcountries.com/v3.1/all");
      const dadosJSON = await dadosResponse.json();
      setDataJSON(dadosJSON);
      setData(dadosJSON);
      setLoading(false);
    }
    puxarDados();
  }, []);

  React.useEffect(() => {
    if (dataJSON) {
      const filteredData = dataJSON.filter((item) => {
        const country = item.name.common.toLowerCase();
        if (search && filter !== "Filter by Region") {
          return (
            item.region.includes(filter) &&
            country.includes(search.toLowerCase())
          );
        } else if (search && filter === "Filter by Region") {
          return country.includes(search.toLowerCase());
        } else if (!search && filter !== "Filter by Region") {
          return item.region.includes(filter);
        } else if (!search) {
          return dataJSON;
        }
      });
      setData(filteredData);
    }
  }, [filter, search]);

  return (
    <main className="container">
      <InputArea setSearch={setSearch} setFilter={setFilter} />
      {loading === true ? (
        <div className="loading-container">
          <div className="loading-circle"></div>
        </div>
      ) : (
        ""
      )}
      <section className="countries-grid">
        {data &&
          data.map((item, index) => (
            <Link
              to={"/country/" + item.name.common.replace(/\s/g, "")}
              key={index}
              className="link-flex"
            >
              <div className="countries-container">
                <img src={item.flags.png} alt="item.flags.alt" />
                <h1>{item.name.common}</h1>
                <p>
                  <span>Population:</span> {item.population}
                </p>
                <p>
                  <span>Region:</span> {item.region}
                </p>
                <p>
                  <span>Capital:</span> {item.capital}
                </p>
              </div>
            </Link>
          ))}
      </section>
    </main>
  );
};

export default Main;

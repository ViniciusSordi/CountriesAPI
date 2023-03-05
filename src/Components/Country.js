import React from "react";
import arrow from "../icons/arrowback.svg";
import { Link, useParams } from "react-router-dom";
import "../Css/country.css";

const Country = () => {
  const params = useParams();
  const [data, setData] = React.useState();
  const [border, setBorder] = React.useState();
  const [loading, setLoading] = React.useState()

  React.useEffect(() => {
    async function puxarDados() {
      setLoading(true)
      const dadosResponse = await fetch(
        "https://restcountries.com/v3.1/name/" + params.name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]{2,})/g, '$1 ')
      );
      const dadosJSON = await dadosResponse.json();
      setData(dadosJSON);
      setLoading(false)
    }
    puxarDados();
  }, []);

  function getNativeName() {
    if (data) {
      const name = data[0].name.nativeName;
      const firstKey = Object.keys(name)[0];
      return name[firstKey].common;
    }
  }

  function getBorderNames() {
    if (data && data[0].borders) {
      data[0].borders.map((item) => {
        fazerFetch(item);
      });
    }
  }

  React.useEffect(() => {
    getBorderNames();
  }, [data]);

  const arrayNome = [];
  async function fazerFetch(country) {
    const dadosResponse = await fetch(
      "https://restcountries.com/v2/alpha/" + country
    );
    const dadosJSON = await dadosResponse.json();
    const name = dadosJSON.name;
    arrayNome.push(name);
    setBorder([arrayNome]);
  }

  return (
    <section className="container">
      <Link to="/CountriesAPI">
        <div className="nav-container">
          <div className="button-container">
            <img src={arrow} alt="arrow icon" />
            <button>Back</button>
          </div>
        </div>
      </Link>

      {loading === true ? (
        <div className="loading-container">
          <div className="loading-circle"></div>
        </div>
      ) : (
        ""
      )}

      {data && (
        <div className="country-container">
          <div className="image-container">
            <img src={data[0].flags.svg} alt="" />
          </div>
          <div className="info-container">
            <h1>{data[0].name.common}</h1>
            <div className="info-column">
              <p>
                <span>Native Name: </span>
                {getNativeName()}
              </p>
              <p>
                <span>Population: </span>
                {data[0].population}
              </p>
              <p>
                <span>Region: </span>
                {data[0].region}
              </p>
              <p>
                <span>Sub Region: </span>
                {data[0].subregion}
              </p>
              <p>
                <span>Capital: </span>
                {data[0].capital}
              </p>
            </div>

            <div className="info-column">
              <p>
                <span>Top Level Domain: </span>
                {data[0].tld[0]}
              </p>
              <p>
                <span>Currencies: </span>
                {Object.values(data[0].currencies).map((item, index) => (
                  <span key={index}>{item.name} </span>
                ))}
              </p>
              <p>
                <span>Languages: </span>
                {Object.values(data[0].languages).map((item, index) => (
                  <span key={index}>{item} </span>
                ))}
                {}
              </p>
            </div>

            <div className="border-container">
              <h1>Border Countries: </h1>
              <div>
                {data[0].borders && border
                  ? border[0].map((item, index) => (
                      <span key={index}>{item} </span>
                    ))
                  :<span>No border countries</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Country;

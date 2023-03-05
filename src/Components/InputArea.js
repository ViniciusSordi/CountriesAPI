import React from "react";
import "../Css/inputarea.css";
import searchicon from "../icons/search.svg";
import expandicon from "../icons/expand.svg";

const InputArea = (props) => {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("Filter by Region");
  const dropdownRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClick({ target }) {
    setFilter(target.innerHTML);
    setOpen(false);
  }

  React.useEffect(() => {
    props.setFilter(filter)
    props.setSearch(search)
  }, [filter, search, props])

  return (
    <section className="search-filter-container">
      <div className="search-container">
        <img src={searchicon} alt="search icon" />
        <input
          type="text"
          name="country"
          id="country"
          placeholder="Search for a country...."
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>

      <div className="filter-container" ref={dropdownRef}>
        <div className="selected" onClick={() => setOpen(!open)}>
          <span>{filter}</span>
          <div className="icon-container">
            <img src={expandicon} alt="expand icon" />
          </div>
        </div>

        {open && (
          <ul>
            <li
              onClick={handleClick}
              className={filter === "Filter by Region" ? "active" : ""}
            >
              Filter by Region
            </li>
            <li
              onClick={handleClick}
              className={filter === "Africa" ? "active" : ""}
            >
              Africa
            </li>
            <li
              onClick={handleClick}
              className={filter === "America" ? "active" : ""}
            >
              America
            </li>
            <li
              onClick={handleClick}
              className={filter === "Asia" ? "active" : ""}
            >
              Asia
            </li>
            <li
              onClick={handleClick}
              className={filter === "Europe" ? "active" : ""}
            >
              Europe
            </li>
            <li
              onClick={handleClick}
              className={filter === "Oceania" ? "active" : ""}
            >
              Oceania
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default InputArea;

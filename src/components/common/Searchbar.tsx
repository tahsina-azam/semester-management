import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import { MenuItem, Select, Typography } from "@material-ui/core/";
import { useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/FlipCameraAndroid";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useEffect } from "react";

/**
 * a search box from which books can be searched by their info in admin library
 * @param {array} props takes all the books info as array
 * @returns a search bar and a result array based on user search
 */
const Searchbar = (props) => {
  const books = props.items;
  const [values, setValues] = React.useState({
    fields: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    getSearchTerm();
  };

  //console.log(props.books);
  /**
   * it searches for the word fragments that the user types in the searchbar
   * @param {string} searchTerm whatever input is in search bar
   */
  const searchKeyword = (searchTerm) => {
    const book = books;
    if (searchTerm !== "" && searchTerm.length > 1) {
      const newBookList = book.filter((searchItem) => {
        return Object.values(searchItem)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      props.updateParent(newBookList);
      // console.log(newBookList);
    } else {
      props.updateParent(book);
    }
  };
  console.log(props.items);
  const getSearchTerm = () => {
    console.log(values.fields);
    searchKeyword(values.fields);
  };
  return (
    <div style={{marginTop: "10px"}}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        style={{
          margin: "0 auto",
          maxWidth: 800,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={values.fields}
          onChange={handleChange("fields")}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <RefreshIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default Searchbar;

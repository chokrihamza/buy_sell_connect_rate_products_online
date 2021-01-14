import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { getPrivateAnnounce } from "../../js/actions/actionAnnouce";

const filter = createFilterOptions();

export default function FreeSoloCreateOption(props) {
 let x=props.x
      const dispatch = useDispatch()
  const [value, setValue] = React.useState(null);
     
      if (value) {
       // dispatch(getPrivateAnnounce(value.title));
        x(value.title)
      }
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={top100Films}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(option) => option.title}
      style={{ width:"40%" }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Search with category" variant="outlined" />
      )}
    />
  );
}


const top100Films = [
  { title: 'viandes – poissons – œufs' },
  { title: 'produits laitiers' },
  { title: 'matières grasses'},
  { title: 'légumes et fruits'},
  { title: 'céréales et dérivés – légumineuses' },
  { title: 'sucres et produits sucrés' },
  { title: 'boissons'},

];

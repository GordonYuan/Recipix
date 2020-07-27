import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
  },
  formControl: {
    margin: theme.spacing(1),
  },
  formLabel: {
    alignSelf: "center",
    marginRight: theme.spacing(2),
  },
}));

const TagFilter = (props) => {
  const { tags, tagsState, setTagsState } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    if (event.target.checked && !tagsState.includes(event.target.name)) {
      setTagsState([...tagsState, event.target.name]);
    } else if (!event.target.checked && tagsState.includes(event.target.name)) {
      setTagsState(tagsState.filter((e) => e !== event.target.name));
    }
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup row>
          <FormLabel className={classes.formLabel} focused={false}>
            Filters:
          </FormLabel>
          {tags.map((item) => (
            <FormControlLabel
              key={item.tag[0]}
              control={
                <Checkbox
                  checked={tagsState.includes(item.tag[0]) || false}
                  onChange={handleChange}
                  name={item.tag[0]}
                />
              }
              label={item.tag[0]}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default TagFilter;

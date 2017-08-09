import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Form = (props) => {
  const cancelButton = props.cancel ? <RaisedButton
    label="Cancel"
    secondary={true}
    onTouchTap={props.handleClose}
    /> : '';
  return (
  <form action={props.action} method={props.method} style={styles.form}>
    {
      props.fields.map((field, i) => {
        return (
          <TextField
            key={i}
            name={field}
            hintText={field}
            floatingLabelText={field}
            floatingLabelFixed
          />);
        }
      )
    }
    <div >
      {cancelButton}
      <RaisedButton
        type="submit"
        label="Submit"
        primary={true}
        style={styles.button}
      />
    </div>
  </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    alignSelf: 'flex-end'
  }
}

export default Form;

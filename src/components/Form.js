import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Form = (props) => {

  const cancelButton = props.cancel ? <RaisedButton
    label="Cancel"
    secondary={true}
    onTouchTap={props.handleClose}
    /> : '';
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(form);
  }

  let form;

  return (
    <form 
      action={props.action} 
      method={props.method} 
      style={styles.form} 
      onSubmit={handleSubmit}
      ref={f => form = f}
    >
    {
      props.fields.map((field, i) => {
        return (

          <TextField
            key={i}
            name={field.name}
            hintText={field.hint || field.label}
            floatingLabelText={field.label}
            // errorText={fields.touched && fields.error}
            floatingLabelFixed
            {...field}
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

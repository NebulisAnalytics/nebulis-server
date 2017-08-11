import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default function AddTeam({members, open, onClose, onSave, handleMemberClick}) {
  console.log('model members', members)
  const renderModel = (
    <div>
      <List>
        {members && members.map((member, i) => {
          return (
            <ListItem
              key={i}
              leftCheckbox={<Checkbox onCheck={() => handleMemberClick(member)}/>}
              primaryText={`Username: ${member.username}`}
              />);
        })}
      </List>
      <RaisedButton
        target="_blank"
        label="Close"
        secondary={true}
        onTouchTap={onClose}
        />
      <RaisedButton
        target="_blank"
        label="Save Team"
        primary={true}
        onTouchTap={onSave}
        />
    </div>
  );
  return (
    <Dialog
      title="Select Students"
      open={open}
      onRequestClose={onClose}
      actions={renderModel}/>
  );
}

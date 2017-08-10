import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';

export default function AddTeam({members, open, onClose, onSave, handleMemberClick}) {
  console.log('model members', members)
  const renderModel = (
    <div>
      <List>
        {members && members.map((member, i) => {
          return (
            <ListItem
              key={i}
              primaryText={`Username: ${member.username}`}
              onTouchTap={() => handleMemberClick(member)}
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
      open={open}
      onRequestClose={onClose}
      actions={renderModel}/>
  );
}

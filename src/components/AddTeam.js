import React from 'react';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';

export default function AddTeam({members, open, onClose, onSave}) {
  return (
    <Dialog
      open={open}
      onRequestClose={onClose}/>
  );
}

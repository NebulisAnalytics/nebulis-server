import React from 'react';
import { ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { DownloadIcon } from 'mdi-material-ui';

export default function Team ({team, onTeamOpen, onDownload}) {
  return (
    <div style={styles.container}>
      <ListItem
        style={styles.listItem}
        secondaryText= { "Updated At: " + team.updatedAt }
        hoverColor= { '#FF8442' }
        onTouchTap={onTeamOpen}
        />
      <FloatingActionButton secondary={true} onTouchTap={onDownload} mini={true}>
        <DownloadIcon />
      </FloatingActionButton>
    </div>
  )
}

const styles = {
  container: {

  },
  button: {
    width: '20%',
    display: 'block'
  },
  listItem: {
    width: '78%',
    display: 'block'
  }
}

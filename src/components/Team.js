import React from 'react';
import { ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { DownloadIcon } from 'mdi-material-ui';

export default function Team ({team, onTeamOpen, onDownload}) {
  const downloadButton = (
    <FloatingActionButton style={styles.button} secondary={true} onTouchTap={onDownload} mini={true}>
      <DownloadIcon />
    </FloatingActionButton>
  )
  return (
    <div style={styles.container}>
      <ListItem
        style={styles.listItem}
        primaryText= { "Updated At: " + team.updatedAt }
        secondaryText= { "Updated At: " + team.updatedAt }
        hoverColor= { '#FF8442' }
        onTouchTap={onTeamOpen}
        rightIconButton={downloadButton}
        />

    </div>
  )
}



const styles = {
  container: {
  },
  button: {
    marginRight: '20px'
  },
  listItem: {
    textAlign: 'center',
  }
}

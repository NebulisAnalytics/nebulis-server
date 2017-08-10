import React from 'react';
import { ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { DownloadIcon } from 'mdi-material-ui';

export default function Team ({team, onTeamOpen, onDownload}) {
  console.log('team',team);
  return (
    <div style={styles.container}>
      <ListItem
        style={styles.listItem}
        primaryText= { "Name: " + team.name }
        secondaryText= { "Updated At: " + team.updatedAt }
        hoverColor= { '#FF8442' }
        onTouchTap={onTeamOpen}>
        <a href={'/api/teams/' + team.id + '/download'}>
          <FloatingActionButton secondary={true} mini={true} style={styles.download}>
            <DownloadIcon/>
          </FloatingActionButton>
        </a>
      </ListItem>
    </div>
  )
}

const styles = {
  download : {
    float: 'right',
    marginRight: 15
  },
  container: {

  },
  button: {
    width: '20%',
    display: 'block'
  },
  listItem: {
    display: 'block'
  }
}

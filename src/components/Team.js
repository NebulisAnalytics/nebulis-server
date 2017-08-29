import React from 'react';
import { ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { DownloadIcon } from 'mdi-material-ui';

export default function Team ({team, onTeamOpen, onDownload}) {
  // const downloadButton = (
  //   <FloatingActionButton style={styles.button} secondary={true} onTouchTap={onDownload} mini={true}>
  //     <DownloadIcon />
  //   </FloatingActionButton>
  // )

  //format timestamp
  let dateArr = team.updatedAt.split('T')
  let date = dateArr[0]
  let time = dateArr[1].split('.')[0]

  return (
    <div style={styles.container}>
      <Link to={"/teams/" + team.id}>
        <ListItem
          style={styles.listItem}
          primaryText= { team.name }
          secondaryText= { "Updated At: " + date + " " + time }
          hoverColor= { '#FF8442' }
          onTouchTap={onTeamOpen}>
          <a href={'/api/teams/' + team.id + '/download'}>
            <FloatingActionButton secondary={true} mini={true} style={styles.download}>
              <DownloadIcon/>
            </FloatingActionButton>
          </a>
        </ListItem>
      </Link>
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
    marginRight: '20px'
  },
  listItem: {
    textAlign: 'center',
  }
}

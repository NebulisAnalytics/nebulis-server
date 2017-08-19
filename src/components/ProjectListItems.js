import React, { Component } from 'react';
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Project from './Projects';
import Team from './Teams'
import FileFolder from 'material-ui/svg-icons/file/folder';



export default class ProjectListItems extends Component {

	render() {
		const styles = {
			item: {
				textDecoration: 'none'
			}
		}

		const project = this.props.project;
		//format timestamp
		let dateArr = project.updatedAt.split('T')
		let date = dateArr[0]
		let time = dateArr[1].split('.')[0]
		return (
			<Link to={"/projects/" + project.id} style={ styles.item }>
				<ListItem

					primaryText= { "Name: " + project.name }
					secondaryText= { "Updated At: " + date + ' ' + time }
					hoverColor= { '#FF8442' }
					leftAvatar={<Avatar className='leftListAvatar' icon={<FileFolder />} />}
				>
					{/* <div className='memberNames'>{project.name}</div> */}
				</ListItem>
			</Link>
		);

	}
}


{/* <a href="javascript://" onClick={ ::this.props.onDownload }>
 <DownloadIcon/>
</a>

<a href="javascript://" onClick={ ::this.props.onDelete }>
 <DeleteIcon/>
</a> */}

import React, { Component } from 'react';
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Project from './Projects';
import FileFolder from 'material-ui/svg-icons/file/folder';



export default class ProjectListItems extends Component {

	render() {
		const styles = {
			item: {
				textDecoration: 'none'
			}
		}

		const project = this.props.project;
		return (
			<Link to={"/projects/" + project.id} style={ styles.item }>
				<ListItem
					
					primaryText= { "Name: " + project.name }
					secondaryText= { "Updated At: " + project.updatedAt }
					hoverColor= { '#FF8442' }
					leftAvatar={<Avatar icon={<FileFolder />} />}
				>
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

import React, {Component} from 'react';

export default class Todos extends Component {
	render() {
		return (
			<div className="todos">
				{ this.renderTodos() }
			</div>);
	}
	
	renderTodos() {
		if (this.props.todos.length) {
			return (<ul>
				{ this.props.todos.map((todo, index) => {
					let completeHandler = () => {
						this.props.onToggleCompleted(todo.id, !todo.completed);
					};
					let deleteHandler = () => {
						this.props.onDelete(todo.id);
					};
					return (<Todo key={index} todo={todo} onComplete={completeHandler} onDelete={deleteHandler}/>);
				}) }
			</ul>);
		}
	}
}

class Todo extends Component {
	render() {
		const todo = this.props.todo;
		const decoration = todo.completed ? 'line-through' : 'none';
		return (
			<li className="todo">
				<span style={ {textDecoration: decoration} }>
					{ todo.name }
				</span>
				&nbsp;
				<a href="javascript://" onClick={::this.props.onComplete}>
					✓
				</a>
				&nbsp;
				<a href="javascript://" onClick={this.props.onDelete}>
					×
				</a>
			</li>);
	}
}

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import Todos from '../components/Todos';

import {getTodos, createTodo, deleteTodo, toggleCompleted} from '../api/todos';

export default class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
	}
	
	componentWillMount() {
		this.getTodos();
	}
	
	getTodos() {
		getTodos((err, todos) => {
			this.setState({
				todos
			}, () => {
				
			});
		});
	}
	
	render() {
		return (
			<Layout title="Todos">
				<div id="page-todos" className="page">
					
					<Todos todos={this.state.todos} onDelete={::this.onDelete} onComplete={::this.onComplete}/>
					
					<div>
						Create a to-do:<br/>
						<input ref="todo" type="text"/>
						<button onClick={::this.onAdd}>add</button>
					</div>
				</div>
			</Layout>);
	}
	
	onAdd() {
		const name = ReactDOM.findDOMNode(this.refs.todo).value;
		createTodo(name, (err, results) => {
			this.getTodos();
		});
	}
	
	onDelete(id) {
		deleteTodo(id, (err, results) => {
			this.getTodos();
		});
	}
	
	onComplete(id, completed) {
		toggleCompleted(id, completed, (err, results) => {
			this.getTodos();
		});
	}
}

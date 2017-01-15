import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import Todos from '../components/Todos';

import { getStore, todosActions } from '../redux/index';

import ghoulie from 'ghoulie';

export default class TodosPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			
			// map the model to state
			todosModel: getStore().getState().todosModel
		};
		
		// when the store changes re-map the model to state
		getStore().subscribe(() => {
			this.setState({
				todosModel: getStore().getState().todosModel
			}, () => {
				
			});
		});
		
		// notify ghoulie when this component is instantiated
		ghoulie.emit('TODOS_PAGE_LOADED');
		
		// when ghoulie receives a RELOAD_TODOS event (from within a unit test) log the event and call getTodos()
		ghoulie.on('RELOAD_TODOS', () => {
			ghoulie.log('RELOADING TODOS !!!!');
			this.getTodos();
		});
	}
	
	componentWillMount() {
		this.getTodos();
	}
	
	getTodos() {
		ghoulie.log('getting todos...');
		todosActions.getTodos().then(store => {
			
			// store returned is same as getStore().getState()
			ghoulie.log('got todos', store);
			
			// map the model to state
			this.setState({
				todosModel: store.todosModel
			}, () => {
				
				// emit TODOS_LOADED event for ghoulie test to use
				const todos = store.todosModel.todos;
				ghoulie.emit('TODOS_LOADED', todos);
				
			});
			
		}).catch(function(e, store) {
			console.log('CAUGHT ERROR', e);
			debugger;
		});
	}
	
	render() {
		return (
			<Layout title="Todos">
				<div id="page-todos" className="page">
					
					{ this.renderLoading() }
					
					<Todos todos={this.state.todosModel.todos} onDelete={::this.onDelete} onToggleCompleted={::this.onToggleCompleted}/>
					
					<div>
						Create a to-do:<br/>
						<input ref="todo" type="text"/>
						<button onClick={::this.onAdd}>add</button>
					</div>
				</div>
			</Layout>);
	}
	
	renderLoading() {
		if (this.state.todosModel.loading) {
			return (<div>Loading...</div>);
		}
	}
	
	onAdd() {
		const name = ReactDOM.findDOMNode(this.refs.todo).value;
		todosActions.createTodo({
			name
		}).then(store => {
			ReactDOM.findDOMNode(this.refs.todo).value = '';
			this.getTodos();
		});
	}
	
	onDelete(id) {
		todosActions.deleteTodo(null, {
			id
		}).then(::this.getTodos);
	}
	
	onToggleCompleted(id, completed) {
		todosActions.updateTodo({
			completed
		}, {
			id,
		}).then(::this.getTodos);
	}
}

var chai = require('chai');
var expect = chai.expect;
var ghoulies = require('ghoulies');

var url = "http://localhost:1337/todos";

before(function (done) {
	deleteAll(function () {
		createTodo('test todo 1', function () {
			startClient(done);
		});
	});
});

// delete the database again after the test
after(function (done) {
	deleteAll(done);
});

// loads the url in a new jsdom window
function startClient(done) {
	ghoulies.client({
		url: url,
		globals: true,
		jquery: true
	}, function (window, ghoulie) {
		done();
	});
	
	/*
	 // To avoid using globals, or when using multiple clients, make use of the callback arguments:
	 
	 var window, ghoulie;
	 ghoulies.client({
	 	url: url,
	 	globals: false,
	 	jquery: true
	 }, function(w, g) {
	 	window = w;
	 	ghoulie = g;
	 	done();
	 });
	 */
}

// creates a todo server-side by accessing the SailsJS Todo model
function createTodo(name, done) {
	Todo.createTodo(name, function (err, todo) {
		done();
	});
}

// deletes all the todos from the database
function deleteAll(done) {
	Todo.deleteAll(function () {
		done();
	});
}

describe('JSDom', () => {
	it('makes a window, document, and loads jquery', (done) => {
		expect(typeof window).to.be.equal('object');
		expect(typeof document).to.be.equal('object');
		expect(typeof $).to.be.equal('function');
		expect(typeof ghoulie).to.be.equal('object');
		done();
	});
});

describe('TodosPage', () => {
	it('loads todos from the server and renders them', (done) => {
		
		// wait for the first load event
		ghoulie.once('TODOS_LOADED', function (todos) {
			ghoulie.log('once TODOS_LOADED', todos);
			expect(todos).to.be.an('array');
			expect(todos).to.have.length(1);
			
			// expect there to be one Todos component
			var todosNodes = $('DIV.todos');
			expect(todosNodes.length).to.be.equal(1);
			
			// expect there to be one Todo component
			var todoNodes = $('LI.todo');
			expect(todoNodes).to.have.length(1);
			
			done();
		});
		
		// call ghoulie.init() at the end of the first test
		ghoulie.init();
	});
	
	
	it('reloads todos from the server and rerenders them', (done) => {
		// create a second todo server-side
		createTodo('test todo 2', function () {
			
			ghoulie.once('TODOS_LOADED', function (todos) {
				ghoulie.log('once RELOAD_TODOS', todos);
				
				// expect there to be two Todo components
				var todoNodes = $('LI.todo');
				expect(todoNodes).to.have.length(2);
				
				done();
			});
			
			// make the client reload the data
			ghoulie.emit('RELOAD_TODOS');
		});
	});
});


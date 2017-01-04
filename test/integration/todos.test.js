var chai = require('chai');
var expect = chai.expect;
var debug = require('../../api/utils/debug');

describe('Todos App', () => {
	it('renders DIV.todos', (done) => {
		
		Todo.count({}).then(function(numTodos) {
			debug('todos:', numTodos);
			
			expect(typeof document).to.be.equal('object');
			
			var nodes = document.getElementsByClassName('todos');
			expect(nodes).to.have.length(1);
			
			var todos = nodes[0];
			var spans = todos.getElementsByTagName('SPAN');
			expect(spans).to.be.have.length(0);
			
			done();
		});
		
	});
});


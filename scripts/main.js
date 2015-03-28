$(document).ready(function() {
	forerunnerTodo.init();
});

var forerunnerTodo = {


	init: function() {
		this.initEvents();
	},


	initEvents: function() {
		$('#submitButton').on('click', function (e) {
			e.preventDefault();
			forerunnerTodo.addTodo();
		});

		$('#todoForm').on('submit', function(e) {
			e.preventDefault();
			forerunnerTodo.addTodo();
		});
		
		$('body').on('click', '#todoList li', function () {
			var $this = $(this);

			$this.toggleClass('linethrough');
			forerunnerTodo.checkTodos($this);		
		});

		$('#clearBtn').on('click', function(e) {
			e.preventDefault();
			forerunnerTodo.deleteTodos();	
		});	
	},

	addTodo: function() {
		var $todo = $('#todoText');
		var itemText = $todo.val();

		// If input is empty, do nothing
		if (!itemText) {
			return false;
		}
		else {
			// Add the new item to ForerunnerDB's todo collection
			db.collection('todo').insert({
				text: itemText,
				foo: 'bar'
			});

			// Now we've added the item to the collection, tell
			// forerunner to persist the data
			db.collection('todo').save();

			// Clear input
			$todo.val('');
		}
	},

	checkTodos: function($this) {
		$('#todoList').each(function() {
			if ($('#todoList > li.linethrough').length > 0) {
				$('#clearBtn').removeClass('hide');
				db.collection('todo').update({_id: $this.attr('id')}, { foo: 'linethrough' });
				db.collection('todo').save();
			} 
			else {
				$('#clearBtn').addClass('hide');
				
			}

			if (!$this.hasClass('linethrough')) {
				db.collection('todo').update({_id: $this.attr('id')}, { foo: 'bar' });
				db.collection('todo').save();
			}
		});
	},

	deleteTodos: function() {
		db.collection('todo').remove({ foo: 'linethrough' });
		db.collection('todo').save();
		$('#clearBtn').addClass('hide');

	}
};

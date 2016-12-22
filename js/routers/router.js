import Backbone from 'backbone';
import {todos} from '../collections/todos';

export let TodoFilter;

// Todo Router
// ----------
var TodoRouter = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function (param) {
		// Set the current filter to be used
		TodoFilter = param || '';

		// Trigger a collection filter event, causing hiding/unhiding
		// of Todo view items
		todos.trigger('filter');
	}
});

export const todoRouter = new TodoRouter();
Backbone.history.start();

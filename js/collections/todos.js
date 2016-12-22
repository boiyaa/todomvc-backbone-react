import Backbone from 'backbone';
import 'backbone.localStorage';
import Todo from '../models/todo';
import {ActionTypes} from '../actions/todo';
import {dispatcher} from '../Dispatcher';

// Todo Collection
// ---------------

// The collection of todos is backed by *localStorage* instead of a remote
// server.
var Todos = Backbone.Collection.extend({
	// Reference to this collection's model.
	model: Todo,

	// Save all of the todo items under this example's namespace.
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	constructor: function() {
		Backbone.Collection.apply(this, arguments);

		this.on(ActionTypes.ADD_TODO, function(action) {
			this.create({title: action.text.trim(), order: this.nextOrder(), completed: false});
		});

		this.on(ActionTypes.DELETE_COMPLETED_TODOS, function(action) {
			this.completed().forEach(function(todo) {
				todo.destroy();
			});
		});

		this.on(ActionTypes.DELETE_TODO, function(action) {
			this.get(action.cid).destroy();
		});

		this.on(ActionTypes.EDIT_TODO, function(action) {
			this.get(action.cid).save({title: action.text});
		});

		this.on(ActionTypes.FETCH_TODOS, function(action) {
			this.fetch({reset: true});
		});

		this.on(ActionTypes.TOGGLE_ALL_TODOS, function(action) {
			var checked = this.remaining().length === 0;

			this.each(function(todo) {
				todo.save({completed: !checked});
			});
		});

		this.on(ActionTypes.TOGGLE_TODO, function(action) {
			this.get(action.cid).toggle();
		});
	},

	// Filter down the list of all todo items that are finished.
	completed: function () {
		return this.where({completed: true});
	},

	// Filter down the list to only todo items that are still not finished.
	remaining: function () {
		return this.where({completed: false});
	},

	// We keep the Todos in sequential order, despite being saved by unordered
	// GUID in the database. This generates the next order number for new items.
	nextOrder: function () {
		return this.length ? this.last().get('order') + 1 : 1;
	},

	// Todos are sorted by their original insertion order.
	comparator: 'order'
});

// Create our global collection of **Todos**.
export const todos = new Todos();

dispatcher.register(todos);

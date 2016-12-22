import React, {Component} from 'react';
import View from '../views/App';
import {todos} from '../collections/todos';

class App extends Component {

  constructor(props) {
    super(props);
    this.createOnEnter = this.createOnEnter.bind(this);
    this.toggleAllComplete = this.toggleAllComplete.bind(this);
    this.addOne = this.addOne.bind(this);
    this.addAll = this.addAll.bind(this);
    this.filterOne = this.filterOne.bind(this);
    this.filterAll = this.filterAll.bind(this);

    this.state = {
      value: '',
    };
  }

  // At initialization we bind to the relevant events on the `Todos`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting todos that might be saved in *localStorage*.
  componentDidMount() {
    todos.on('add', this.addOne);
    todos.on('reset', this.addAll);
    todos.on('change:completed', this.filterOne);
    todos.on('filter', this.filterAll);
    todos.on('all', () => this.forceUpdate());

    // Suppresses 'add' events with {reset: true} and prevents the app view
    // from being re-rendered for every model. Only renders when the 'reset'
    // event is triggered at the end of the fetch.
    todos.fetch({reset: true});
  }

  componentWillUnmount() {
    todos.off('add', this.addOne);
    todos.off('reset', this.addAll);
    todos.off('change:completed', this.filterOne);
    todos.off('filter', this.filterAll);
    todos.off('all', () => this.forceUpdate());
  }

  render() {
    const checked = todos.remaining().length === 0;

    // Delegated events for creating new items, and clearing completed ones.
    return (
      <View
        todos={todos}
        value={this.state.value}
        checked={checked}
        onNewTodoChange={(value) => this.setState({value})}
        onNewTodoKeyPressEnter={this.createOnEnter}
        onToggleAllChange={this.toggleAllComplete}
      />
    );
  }

  // Add a single todo item to the list by creating a view for it, and
  // appending its element to the `<ul>`.
  addOne(todo) {
    this.forceUpdate();
  }

  // Add all items in the **Todos** collection at once.
  addAll() {
    this.forceUpdate();
  }

  filterOne(todo) {
    this.forceUpdate();
    todo.trigger('visible');
  }

  filterAll() {
    todos.each(this.filterOne, this);
  }

  // Generate the attributes for a new Todo item.
  newAttributes() {
    return {title: this.state.value.trim(), order: todos.nextOrder(), completed: false};
  }

  // If you hit return in the main input field, create new **Todo** model,
  // persisting it to *localStorage*.
  createOnEnter() {
    todos.create(this.newAttributes());
    this.setState({value: ''});
  }

  toggleAllComplete() {
    const checked = todos.remaining().length === 0;

    todos.each((todo) => {
      todo.save({completed: !checked});
    });
  }

}

export default App;

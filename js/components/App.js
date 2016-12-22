import React, {Component} from 'react';
import Stats from './Stats';
import Todo from './Todo';
import {todos} from '../collections/todos';
import * as keys from '../constants/keys';

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
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus={true}
            value={this.state.value}
            onChange={(e) => this.setState({value: e.target.value})}
            onKeyPress={this.createOnEnter}
          />
        </header>
        {(() => {
          if (todos.length > 0) {
            return (
              <div>
                <section className="main">
                  <input
                    className="toggle-all"
                    id="toggle-all"
                    type="checkbox"
                    checked={checked}
                    onChange={this.toggleAllComplete}
                  />
                  <label htmlFor="toggle-all">Mark all as complete</label>
                  <ul className="todo-list">
                    {todos.map((todo) => <Todo key={todo.cid} model={todo} />)}
                  </ul>
                </section>
                <footer className="footer">
                  <Stats todos={todos} />
                </footer>
              </div>
            );
          }
        })()}
      </div>
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
  createOnEnter(e) {
    if (e.which === keys.ENTER_KEY && this.state.value.trim()) {
      todos.create(this.newAttributes());
      this.setState({value: ''});
    }
  }

  toggleAllComplete() {
    const checked = todos.remaining().length === 0;

    todos.each((todo) => {
      todo.save({completed: !checked});
    });
  }

}

export default App;

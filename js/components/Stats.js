import React, {Component} from 'react';
import {TodoFilter} from '../routers/router';

class Stats extends Component {

  constructor(props) {
    super(props);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  // Clear all completed todo items, destroying their models.
  clearCompleted() {
    this.props.todos.completed().forEach((todo) => todo.destroy());
  }

  render() {
    const completed = this.props.todos.completed().length;
    const remaining = this.props.todos.remaining().length;
    const classNameAll = !TodoFilter ? 'selected' : '';
    const classNameActive = TodoFilter === 'active' ? 'selected' : '';
    const classNameCompleted = TodoFilter === 'completed' ? 'selected' : '';

    return (
      <div>
        <span className="todo-count">
          <strong>{remaining}</strong> {remaining === 1 ? 'item' : 'items'} left
        </span>
        <ul className="filters">
          <li><a className={classNameAll} href="#/">All</a></li>
          <li><a className={classNameActive} href="#/active">Active</a></li>
          <li><a className={classNameCompleted} href="#/completed">Completed</a></li>
        </ul>
        {(() => {
          if (completed) {
            return (
              <button
                className="clear-completed"
                onClick={this.clearCompleted}
              >
                Clear completed
              </button>
            );
          }
        })()}
      </div>
    );
  }

}

export default Stats;

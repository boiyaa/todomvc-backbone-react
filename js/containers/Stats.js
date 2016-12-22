import React, {Component} from 'react';
import View from '../views/Stats';
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
    const completed = this.props.todos.completed().length > 0;
    const remaining = this.props.todos.remaining().length;

    return (
      <View
        completed={completed}
        remaining={remaining}
        filter={TodoFilter}
        onClearCompletedClick={this.clearCompleted}
      />
    );
  }

}

export default Stats;

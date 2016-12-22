import React, {Component} from 'react';
import {TodoFilter} from '../routers/router';
import * as keys from '../constants/keys';

class Todo extends Component {

  constructor(props) {
    super(props);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.edit = this.edit.bind(this);
    this.clear = this.clear.bind(this);
    this.updateOnEnter = this.updateOnEnter.bind(this);
    this.revertOnEscape = this.revertOnEscape.bind(this);
    this.close = this.close.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);

    this.state = {
      isEditing: false,
      value: this.props.model.get('title'),
    };
  }

  // The TodoView listens for changes to its model, re-rendering. Since
  // there's a one-to-one correspondence between a **Todo** and a
  // **TodoView** in this app, we set a direct reference on the model for
  // convenience.
  componentDidMount() {
    this.props.model.on('change', () => this.forceUpdate());
    this.props.model.on('visible', this.toggleVisible);
  }

  componentWillUnmount() {
    this.props.model.off('change', () => this.forceUpdate());
    this.props.model.off('visible', this.toggleVisible);
  }

  render() {
    const title = this.props.model.get('title');
    const completed = this.props.model.get('completed');

    const classNames = [];
    if (completed) {
      classNames.push('completed');
    }
    if ((completed && TodoFilter === 'active') || (!completed && TodoFilter === 'completed')) {
      classNames.push('hidden');
    }
    if (this.state.isEditing) {
      classNames.push('editing');
    }
    const className = classNames.join(' ');

    // The DOM events specific to an item.
    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={this.toggleCompleted}
          />
          <label onDoubleClick={this.edit}>{title}</label>
          <button className="destroy" onClick={this.clear}></button>
        </div>
        {(() => {
          if (this.state.isEditing) {
            return (
              <input
                className="edit"
                autoFocus={true}
                value={this.state.value}
                onChange={(e) => this.setState({value: e.target.value})}
                onKeyPress={this.updateOnEnter}
                onKeyDown={this.revertOnEscape}
                onBlur={this.close}
              />
            );
          }
        })()}
      </li>
    );
  }

  toggleVisible() {
    this.forceUpdate();
  }

  // Toggle the `"completed"` state of the model.
  toggleCompleted() {
    this.props.model.toggle();
  }

  // Switch this view into `"editing"` mode, displaying the input field.
  edit() {
    this.setState({isEditing: true});
  }

  // Close the `"editing"` mode, saving changes to the todo.
  close() {
    // We don't want to handle blur events from an item that is no
    // longer being edited. Relying on the CSS class here has the
    // benefit of us not having to maintain state in the DOM and the
    // JavaScript logic.
    if (!this.state.isEditing) {
      return;
    }

    if (this.state.value.trim()) {
      this.props.model.save({title: this.state.value.trim()});
    } else {
      this.clear();
    }

    this.setState({isEditing: false});
  }

  // If you hit `enter`, we're through editing the item.
  updateOnEnter(e) {
    if (e.which === keys.ENTER_KEY) {
      this.close();
    }
  }

  // If you're pressing `escape` we revert your change by simply leaving
  // the `editing` state.
  revertOnEscape(e) {
    if (e.which === keys.ESC_KEY) {
      this.setState({
        isEditing: false,
        value: this.props.model.get('title'),
      });
    }
  }

  // Remove the item, destroy the model from *localStorage* and delete its view.
  clear() {
    this.props.model.destroy();
  }

}

export default Todo;

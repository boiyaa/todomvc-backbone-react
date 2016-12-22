var Stats = React.createClass({

  render: function() {
    return (
      <div>
        <span className="todo-count">
          <strong>{this.props.remaining}</strong> {this.props.remaining === 1 ? 'item' : 'items'} left
        </span>
        <ul className="filters">
          <li><a className="selected" href="#/">All</a></li>
          <li><a href="#/active">Active</a></li>
          <li><a href="#/completed">Completed</a></li>
        </ul>
        {(() => {
          if (this.props.completed) {
            return (
              <button
                className="clear-completed"
              >
                Clear completed
              </button>
            );
          }
        })()}
      </div>
    );
  }

});

window.Stats = Stats;

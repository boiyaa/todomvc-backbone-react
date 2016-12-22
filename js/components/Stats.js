var Stats = React.createClass({

  render: function() {
    var todoCount = React.createElement('span', { className: 'todo-count' },
      React.createElement('strong', null, this.props.remaining),
      ' ',
      this.props.remaining === 1 ? 'item' : 'items',
      ' left'
    );

    var filters = React.createElement('ul', { className: 'filters' },
      React.createElement('li', null,
        React.createElement('a', { className: 'selected', href: '#/' }, 'All')
      ),
      React.createElement('li', null,
        React.createElement('a', { href: '#/active' }, 'Active')
      ),
      React.createElement('li', null,
        React.createElement('a', { href: '#/completed' }, 'Completed')
      )
    );

    var clearCompleted;
    if (this.props.completed) {
      clearCompleted = React.createElement('button', { className: 'clear-completed' }, 'Clear completed');
    }

    return React.createElement('div', null, todoCount, filters, clearCompleted);
  }

});

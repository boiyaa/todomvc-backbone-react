var Item = React.createClass({

  render: function() {
    return React.createElement('div', null,
      React.createElement('div', {className: 'view'},
        React.createElement('input', {className: 'toggle', type: 'checkbox', defaultChecked: this.props.completed}, null),
        React.createElement('label', null, this.props.title),
        React.createElement('button', {className: 'destroy'}, null)
      ),
      React.createElement('input', {className: 'edit', defaultValue: this.props.title}, null)
    );
  }

});

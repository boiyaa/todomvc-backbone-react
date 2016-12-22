var Item = React.createClass({
  render: function() {
    return (
      <div>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={this.props.completed}
          />
          <label>{this.props.title}</label>
          <button className="destroy"></button>
        </div>
        <input
          className="edit"
          defaultValue={this.props.title}
        />
      </div>
    );
  }
});

window.Item = Item;

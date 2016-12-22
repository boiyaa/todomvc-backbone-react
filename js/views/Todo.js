import React from 'react';
import * as keys from '../constants/keys';

const Todo = (props) => {

  const {
    title,
    completed,
    filter,
    isEditing,
    value,
    onToggleChange,
    onLabelDoubleClick,
    onDestroyClick,
    onEditChange,
    onEditBlur,
    onEditKeyPressEnter,
    onEditKeyDownEsc
  } = props;

  const handleToggleChange = () => onToggleChange();
  const handleLabelDoubleClick = () => onLabelDoubleClick();
  const handleDestroyClick = () => onDestroyClick();
  const handleEditChange = (event) => onEditChange(event.target.value);
  const handleEditBlur = () => onEditBlur();

  const handleEditKeyPress = (event) => {
    if (event.which === keys.ENTER_KEY) {
      onEditKeyPressEnter();
    }
  }

  const handleEditKeyDown = (event) => {
    if (event.which === keys.ESC_KEY) {
      onEditKeyDownEsc();
    }
  }

  const classNames = [];
  if (completed) {
    classNames.push('completed');
  }
  if ((completed && filter === 'active') || (!completed && filter === 'completed')) {
    classNames.push('hidden');
  }
  if (isEditing) {
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
          onChange={handleToggleChange}
        />
        <label onDoubleClick={handleLabelDoubleClick}>{title}</label>
        <button className="destroy" onClick={handleDestroyClick}></button>
      </div>
      {(() => {
        if (isEditing) {
          return (
            <input
              className="edit"
              autoFocus={true}
              value={value}
              onChange={handleEditChange}
              onKeyPress={handleEditKeyPress}
              onKeyDown={handleEditKeyDown}
              onBlur={handleEditBlur}
            />
          );
        }
      })()}
    </li>
  );

}

export default Todo;

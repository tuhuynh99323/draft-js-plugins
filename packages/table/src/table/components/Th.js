import React from 'react';
import InputCell from './InputCell';
import EditButtons from './EditButtons';

export default class Th extends React.Component {
  render() {
    const {
      value,
      onChange,
      onToggleReadOnly,
      onAddColumnLeft,
      onAddColumnRight,
      onRemoveColumn,
      theme,
    } = this.props;
    return (
      <th className={theme.th}>
        <InputCell
          theme={theme}
          onChange={onChange}
          value={value}
          textAreaStyle={theme.columnTextArea}
          onToggleReadOnly={onToggleReadOnly}
          render={({ showEditOptions }) =>
            showEditOptions && (
              <EditButtons
                className={theme.columnButtons}
                onAddBefore={onAddColumnLeft}
                onDelete={onRemoveColumn}
                onAddAfter={onAddColumnRight}
              />
            )
          }
        />
      </th>
    );
  }
}

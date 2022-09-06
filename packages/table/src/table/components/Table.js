import React from 'react';
import Row from './Row';
import Th from './Th';
export default class Table extends React.Component {
  state = {
    showEditOptions: false,
  };
  onChange = column => value => {
    const {
      blockProps: { columns, editColumn, getEditorState, setEditorState },
      block,
    } = this.props;
    setEditorState(
      editColumn({
        editorState: getEditorState(),
        columns,
        column: { ...column, value },
        block,
      })
    );
  };

  addColumn = ({ index }) => () => {
    const {
      blockProps: { addColumn, columns, rows, getEditorState, setEditorState },
    } = this.props;
    setEditorState(
      addColumn({
        columns,
        rows,
        index,
        editorState: getEditorState(),
        block: this.props.block,
      })
    );
  };
  onRemoveColumn = ({ index }) => () => {
    const {
      blockProps: {
        removeColumn,
        columns,
        rows,
        getEditorState,
        setEditorState,
      },
    } = this.props;
    setEditorState(
      removeColumn({
        columns,
        rows,
        index,
        editorState: getEditorState(),
        block: this.props.block,
      })
    );
  };

  render() {
    const {
      blockProps: { columns, rows },
      theme,
      onToggleReadOnly,
    } = this.props;
    return (
      <table className={theme.table}>
        <thead className={theme.thead}>
          <tr className={theme.tr}>
            {columns.map((col, i) => (
              <Th
                key={col.key}
                value={col.value}
                theme={theme}
                onAddColumnLeft={this.addColumn({
                  index: i,
                })}
                onAddColumnRight={this.addColumn({ index: i + 1 })}
                onRemoveColumn={
                  columns.length > 1 ? this.onRemoveColumn({ index: i }) : null
                }
                onToggleReadOnly={onToggleReadOnly}
                onChange={this.onChange(col)}
              />
            ))}
          </tr>
        </thead>
        <tbody className={theme.tbody}>
          {rows.map((row, rowIndex) => (
            <Row
              key={row.key}
              row={row}
              isOnlyRow={rows.length === 1}
              theme={theme}
              block={this.props.block}
              blockProps={this.props.blockProps}
              rowIndex={rowIndex}
              columns={columns}
              onToggleReadOnly={onToggleReadOnly}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

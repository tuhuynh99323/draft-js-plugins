import React from 'react';
import TextareaAutosize from './TextArea';
const isIE = !!window.MSInputMethodContext && !!document.documentMode;
export default class InputCell extends React.Component {
  static defaultProps = {
    render: () => {},
    onShowEditOptions: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      showEditOptions: false,
    };
  }
  onChange = e => {
    this.setState({
      ...this.state,
      value: e.target.value,
    });
  };
  onFocus = () => {
    this.props.onToggleReadOnly(true);
    this.props.onShowEditOptions(true);
    clearTimeout(this.timeout);
    this.setState({
      ...this.state,
      showEditOptions: true,
    });
  };
  onBlur = () => {
    this.props.onToggleReadOnly(false);
    this.props.onShowEditOptions(false);
    this.timeout = setTimeout(() => {
      this.setState({
        ...this.state,
        showEditOptions: false,
      });
    }, 1000);
    this.props.onChange(this.state.value);
  };
  render() {
    if (isIE) {
      return (
        <span className={this.props.theme.cellWrapper}>
          <texarea
            className={this.props.textAreaStyle}
            style={{ resize: 'none' }}
            type="text"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.value}
            onChange={this.onChange}
          />
          {this.props.render(this.state)}
        </span>
      );
    }
    return (
      <span className={this.props.theme.cellWrapper}>
        <TextareaAutosize
          useCacheForDOMMeasurements
          className={this.props.textAreaStyle}
          style={{ resize: 'none', width: '100%' }}
          type="text"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={this.state.value}
          onChange={this.onChange}
        />
        {this.props.render(this.state)}
      </span>
    );
  }
}

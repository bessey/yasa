let React = require('react');


let Select = React.createClass({
  propTypes: {
    options:  React.PropTypes.object.isRequired,
    selected: React.PropTypes.string
  },
  render() {
    let options = this._renderOptions(this.props.options);
    return <select onChange={this._onChange}>
      {options}
    </select>
  },
  _renderOptions(options) {
    let optionElements = [];
    optionElements.push(<option key="none-selected" value={null}>-- Please Select --</option>);
    for(let key in options) {
      optionElements.push(<option key={key} value={key}>{options[key].name}</option>);
    }
    return optionElements
  },
  _onChange(e) {
    let value = e.target.value;
    this.props.onChange(value);
  }
})

module.exports = Select;

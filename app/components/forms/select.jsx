let React = require('react');


let Select = React.createClass({
  propTypes: {
    options:  React.PropTypes.object.isRequired,
    selected: React.PropTypes.string,
    required: React.PropTypes.bool
  },
  render() {
    let options = this._renderOptions(this.props.options);
    return <select value={this.props.value} onChange={this._onChange}>
      {options}
    </select>
  },
  _renderOptions(options) {
    let optionElements = [];
    optionElements.push(<option key="none-selected" value={null}>-- Select --</option>);
    for(let key in options) {
      let selected = "false", value;
      if(key === selected) {
        selected = "selected";
      }
      if(typeof(options[key].name) === 'undefined') {
        value = options[key];
      } else {
        value = options[key].name;
      }
      optionElements.push(<option key={key} value={key}>{value}</option>);
    }
    return optionElements
  },
  _onChange(e) {
    let value = e.target.value;
    this.props.onChange(value);
  }
})

module.exports = Select;

var React = require('react');
var Sortable = require('react-sortable');

module.exports = React.createClass({
  mixins: [Sortable.Sortable],
  render: function () {
    // debugger;
    return this.transferPropsTo(<div 
        id={this.props.id}
        className={this.isDragging() ? "dragging" : ""}
      >
        <span>
          { this.props.story.tech } 
        </span>
        <span>
          { this.props.story.manager } 
        </span>
        <span>
          { this.props.story.id } 
        </span>
        <span>
          { this.props.story.epic } 
        </span>
        <span>
          { this.props.story.story } 
        </span>
        <span>
          { this.props.story.points } 
        </span>
      </div>
    );
  }
});
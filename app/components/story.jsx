var React = require('react'),
  DragDropMixin = require('react-dnd').DragDropMixin,
  PropTypes = React.PropTypes,
  StoryActions = require('../actions/story_actions'),
  ItemTypes = require('../constants/item_types');

module.exports = React.createClass({
  mixins: [DragDropMixin],
  propTypes: {
    id: PropTypes.any.isRequired
  },
  configureDragDrop: function (registerType) {
    registerType(ItemTypes.STORY_ITEM, {
      dragSource: {
        beginDrag: function () {
          return {
            item: {
              id: this.props.id
            }
          };
        }
      },
      dropTarget: {
        over: function (item) {
          StoryActions.swapStory(item.id, this.props.id);
        }
      }
    });
  },
  render: function () {
    var { isDragging } = this.getDragState(ItemTypes.STORY_ITEM);
    return (<tr 
        id={this.props.id}
        {...this.dragSourceFor(ItemTypes.STORY_ITEM)}
        {...this.dropTargetFor(ItemTypes.STORY_ITEM)}
        style={{ opacity: isDragging ? 0.6 : 1.0 }}
      >
        <td>
          { this.props.story.sort }
        </td>
        <td>
          { this.props.story.tech } 
        </td>
        <td>
          { this.props.story.manager } 
        </td>
        <td>
          { this.props.story.id } 
        </td>
        <td>
          { this.props.story.epic } 
        </td>
        <td>
          { this.props.story.story } 
        </td>
        <td>
          { this.props.story.points } 
        </td>
      </tr>
    );
  }
});
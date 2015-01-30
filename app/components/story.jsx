var React = require('react'),
  DragDropMixin = require('react-dnd').DragDropMixin,
  PropTypes = React.PropTypes,
  StoryActions = require('../actions/story_actions'),
  ItemTypes = require('../constants/item_types');

module.exports = React.createClass({
  displayName: 'Story',
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
              id: this.props.id,
              priority: this.props.story.priority
            }
          };
        }
      },
      dropTarget: {
        over: function (item) {
          StoryActions.swapStory(item.id, this.props.id, item.priority, this.props.story.priority);
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
        data-priority={this.props.story.priority}
        style={{ opacity: isDragging ? 0.6 : 1.0 }}
      >
        <td>
          { this.props.story.tech } 
        </td>
        <td>
          { this.props.story.manager } 
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
        <td>
          <a target="_blank" href={ this.props.story.spec } className="btn btn-primary btn-xs">
            Spec
          </a>&nbsp;
          <button
            className="btn btn-default btn-xs"
            onClick={this._openEditor}
            data-toggle="modal" data-target="#add-story-dialogue">
            Edit
          </button>
        </td>
      </tr>
    );
  },
  _openEditor: function () {
    StoryActions.openEditor(this.props.id, this.props.story);
  }
});
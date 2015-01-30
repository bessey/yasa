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
  render: function () {
    var story = this.props.story;
    var { isDragging } = this.getDragState(ItemTypes.STORY_ITEM);
    var specButton = this._buildSpecButton(story);
    return (<tr 
        id={this.props.id}
        {...this.dragSourceFor(ItemTypes.STORY_ITEM)}
        {...this.dropTargetFor(ItemTypes.STORY_ITEM)}
        style={{ opacity: isDragging ? 0.6 : 1.0 }}
      >
        <td>
          { story.tech } 
        </td>
        <td>
          { story.manager } 
        </td>
        <td>
          { story.epic } 
        </td>
        <td>
          { story.story } 
        </td>
        <td>
          { story.points } 
        </td>
        <td>
          {specButton}
          &nbsp;
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
  configureDragDrop: function (registerType) {
    registerType(ItemTypes.STORY_ITEM, {
      dragSource: {
        beginDrag: function () {
          return {item: {id: this.props.id}};
        }
      },
      dropTarget: {
        over: function (item) {
          StoryActions.swapStory(item.id, this.props.id);
        }
      }
    });
  },
  _buildSpecButton: function (story) {
    if(story.spec) {
      return <a target="_blank"
        href={ story.spec }
        className="btn btn-primary btn-xs">
          Spec
        </a>;
    } else {
      return <button disabled="disabled" className="btn btn-primary btn-xs">Spec</button>;
    }
  },
  _openEditor: function () {
    StoryActions.openEditor(this.props.id, this.props.story);
  }
});
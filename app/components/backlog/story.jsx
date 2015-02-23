var React = require('react'),
  DragDropMixin = require('react-dnd').DragDropMixin,
  PropTypes = React.PropTypes,
  StoryActions = require('../../actions/story_actions'),
  ItemTypes = require('../../constants/item_types'),
  SpecButton = require('../spec_button'),
  UserStore = require('../../stores/user_store'),
  EditStoryButton = require('../edit_story_button'),
  DeleteStoryButton = require('../delete_story_button');

module.exports = React.createClass({
  displayName: 'Story',
  mixins: [DragDropMixin],
  propTypes: {
    id: PropTypes.any.isRequired
  },
  render: function () {
    var story = this.props.story;
    var { isDragging } = this.getDragState(ItemTypes.STORY_ITEM);
    return (<tr
        id={this.props.id}
        {...this.dragSourceFor(ItemTypes.STORY_ITEM)}
        {...this.dropTargetFor(ItemTypes.STORY_ITEM)}
        style={{ opacity: isDragging ? 0.6 : 1.0 }}
      >
        <td>
          { this._getUserName(story.techId) }
        </td>
        <td>
          { this._getUserName(story.managerId) }
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
          <SpecButton spec={story.spec} />
          &nbsp;
          <EditStoryButton id={this.props.id} story={this.props.story} />
          &nbsp;
          <DeleteStoryButton id={this.props.id} />
        </td>
      </tr>
    );
  },
  statics: {
    configureDragDrop(registerType) {
      registerType(ItemTypes.STORY_ITEM, {
        dragSource: {
          beginDrag: function (component) {
            return {item: {id: component.props.id}};
          }
        },
        dropTarget: {
          over: function (component, item) {
            StoryActions.swapStory(item.id, component.props.id);
          }
        }
      });
    }
  },
  _getUserName(id) {
    let user = UserStore.find(id);
    if(user) {
      return user.name;
    }
  }
});
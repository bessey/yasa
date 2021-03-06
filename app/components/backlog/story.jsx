var React = require('react'),
  DragDropMixin = require('react-dnd').DragDropMixin,
  PropTypes = React.PropTypes,
  StoryActions = require('../../actions/story_actions'),
  ItemTypes = require('../../constants/item_types'),
  SpecButton = require('../spec_button'),
  UserStore = require('../../stores/user_store'),
  EditStoryButton = require('../edit_story_button'),
  DeleteStoryButton = require('../delete_story_button'),
  HoverExpander = require('../shared/hover_expander');

module.exports = React.createClass({
  displayName: 'Story',
  mixins: [DragDropMixin],
  propTypes: {
    id: PropTypes.any.isRequired,
    number: PropTypes.number.isRequired
  },
  render: function () {
    var story = this.props.story;
    var { isDragging } = this.getDragState(ItemTypes.STORY_ITEM);
    return (<div
        id={this.props.id}
        {...this.dragSourceFor(ItemTypes.STORY_ITEM)}
        {...this.dropTargetFor(ItemTypes.STORY_ITEM)}
        className={`story-row-container ${isDragging ? 'dragging' : 'not-dragging'}` }
        style={{ height: 29 }}
      >
        <div className="story-row hover-expander">
          <div className="number">
            { this.props.number }
          </div>
          <div className="tech">
            { this._getUserName(story.techId) }
          </div>
          <div className="manager">
            { this._getUserName(story.managerId) }
          </div>
          <div className="epic">
            { story.epic }
          </div>
          <div className="story">
            <HoverExpander text={ story.story} />
          </div>
          <div className="points">
            { story.points }
          </div>
          <div className="actions">
            <SpecButton spec={story.spec} />
            &nbsp;
            <EditStoryButton id={this.props.id} story={this.props.story} />
            &nbsp;
            <DeleteStoryButton id={this.props.id} />
          </div>
        </div>
      </div>
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

require('../spec_helper');
let StoryStore = require('../../stores/story_store');

describe('StoryStore', () => {
  describe('#create', () => {
    it('should add a record with .priority to firebase', () => {
      let story = StoryStore.create({
        story: "test story",
        techId: "1234"
      });
      expect(story.story).to.equal("test story");
      expect(story.techId).to.equal("1234");
      expect(story[".priority"]).to.not.be.empty;
    })
  })
})

let StoryStore = require('../../stores/story_store');

describe('StoryStore', () => {
  describe('#create', () => {
    it('should add a record with .priority to firebase', () => {
      let story = StoryStore.create({
        story: "test story",
        techId: "1234"
      });
      assert.equal(story.story, "test story");
      assert.equal(story.techId, "1234");
      assert.ok(story[".priority"], "priority not set in store");
    })
  })
})

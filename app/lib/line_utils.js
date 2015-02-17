class LineUtils {
  static storiesAboveLine(stories, pointsGoal = 0) {
    let storiesAbove = {},
      pointsAbove = 0;
    for(let key in stories) {
      let story = stories[key],
      pointsToAdd = Number(story.points);
      if ((pointsAbove += pointsToAdd) > pointsGoal) {
        return storiesAbove;
      }
      storiesAbove[key] = story;
    }
    return storiesAbove;
  }
}

module.exports = LineUtils

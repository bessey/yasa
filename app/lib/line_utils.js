class LineUtils {
  static storiesAboveLine(stories, pointsGoal) {
    let storiesAbove = {},
      pointsAbove = 0,
      linePushed = false;
    for(let key in stories) {
      let story = stories[key],
        pointsToAdd = Number(story.points);
      if(!linePushed) {
        if ((pointsAbove += pointsToAdd) > pointsGoal) {
          linePushed = true;
        }
        storiesAbove[key] = story;
      } else {
        return storiesAbove;
      }
    }
    return storiesAbove;
  }
}

module.exports = LineUtils

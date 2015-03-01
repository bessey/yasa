let fs = require('fs'),
    csv = require('csv'),
    Firebase = require('firebase'),
    StoryStore = require('../stores/story_store'),
    UserStore = require('../stores/user_store');

class BacklogImporter {
  constructor() {
    this.file = null;
  }
  importBacklog(data) {
    let options = {
      columns: [
        'tech',
        'manager',
        'old_id',
        'epic',
        'story',
        'points',
        'spec'
      ]
    }
    csv.parse(data, options, (err, data) => this.saveData(data));
    return true;
  }
  saveData(data) {
    let [header, ...data] = data;
    data.forEach((row) => {
      console.log(row);
      let tech = delete row.tech;
      let manager = delete row.manager;
      if(tech) {
        row.techId = UserStore.findByName(tech);
      }
      if(manager) {
        row.managerId = UserStore.findByName(manager);
      }
      StoryStore.create(row);
    });
  }
}

module.exports = BacklogImporter

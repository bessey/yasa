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
    let [header, ...data] = data, priority = 1e+5;
    data.forEach((row) => {
      let tech = row.tech; delete row.tech;
      let manager = row.manager; delete row.manager;
      if(tech) {
        row.techId = UserStore.findByName(tech).key;
      }
      if(manager) {
        row.managerId = UserStore.findByName(manager).key;
      }
      // Ensure they sort correctly after import
      row['.priority'] = (priority += 1e+2);
      StoryStore.create(row, false);
    });
  }
}

module.exports = BacklogImporter

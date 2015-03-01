var React = require('react');

module.exports = React.createClass({
  displayName: 'BacklogImporter',
  render() {
    return <div className="col-sm-6">
      <h1>Import Backlog from CSV</h1>
      <form ref="form" onSubmit={this._upload}>
        <input type="file" name="backlogCsv" required="true" />
        <button type="submit">
          Upload
        </button>
      </form>
    </div>;
  },
  _upload(event){
    event.preventDefault();
    var formData = new FormData(this.refs.form.getDOMNode());
    $.ajax({
        url: '/api/v1/backlog/csv',
        type: 'POST',
        //Ajax events
        // beforeSend: beforeSendHandler,
        // success: completeHandler,
        // error: errorHandler,
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
    });
  }
});

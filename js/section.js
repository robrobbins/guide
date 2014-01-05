_.namespace('lib');

lib.section = function(el, data) {
  this.construct(el, data);
  _.extend(this.model, _.extensions.persistable);
};

lib.section.prototype = _.extend(_.View.prototype, {
  getMarkup: function getMarkup(selector) {
    // guard against falsy selectors
    selector || (selector = 'index');
    // ajax the html and send it to setSection
    //var $xhr = $.get('content/' + selector + '/index.html', this.setSection.bind(this));
    var self = this;
    console.log('fetch ' + selector);
    this.model.read({
      url: 'content/' + selector + '/index.html',
      onload: function() {
        self.setSection(this.responseText);
      }
    });
  },
  // passed down from the parent, get the passed in template content
  // and populate the section with it
  setSection: function setSection(str) {
    this.el.innerHTML = str;
  }
});

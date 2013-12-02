_.namespace('lib');

lib.section = function(el, data) {
  this.construct(el, data);
};

lib.section.prototype = $.extend(_.View.prototype, {
  getMarkup: function getMarkup(selector) {
    // guard against falsy selectors
    selector || (selector = 'index');
    // ajax the html and send it to setSection
    var $xhr = $.get('content/' + selector + '/index.html', this.setSection.bind(this));
  },
  // passed down from the parent, get the passed in template content
  // and populate the section with it
  setSection: function setSection(data) {
    this.$el.empty().append(data);
  }
});

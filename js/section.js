_.namespace('lib');

lib.section = function(el, data) {
  this.construct(el, data);
};

lib.section.prototype = $.extend(_.View.prototype, {
  // passed down from the parent, get the passed in template content
  // and populate the section with it
  setSection: function setSection(selector) {
    // guard against falsy selectors
    selector || (selector = '');
    // all the templates are outside of the container
    // clear my el, then hydrate it with the template content
    // the correct selector will have been found in the routes
    this.$el.empty().append($(selector)[0].content.cloneNode(true));
  }
});

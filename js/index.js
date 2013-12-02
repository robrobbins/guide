_.namespace('lib');

lib.index = function(el, data) {
  this.construct(el, data);
  this.initialize();
  // my section child will handle moving the template content
  // into the viewport
  this.addChild(new lib.section(this.$('section')), 'section');
  // we start from the index
  // this.getChild('section').setSection('#index');
  // observe the nav changes at the navigator
  page.navigator.observe(this.handleNav.bind(this));
};

lib.index.prototype = $.extend(_.View.prototype, {
  handleNav: function handleNav(change) {
    // we use the routes to determine the template to clone
    this.getChild('section').getMarkup(page.routes[change.name]);
  },

  initialize: function initialize() {
    // keep a ref to the *
    this.$tar = this.$('header #star');
    // delegate the clicks on the nav items
    this.$('nav').on('click', 'li', this.topNavClicked.bind(this));
    // wait a couple af seconds
    setTimeout(this.unsetHeading.bind(this), 2000);
  },

  setHeading: function setHeading() {
    var word = this.model.getWord(), width = word.length * 12,
      fn = function() {
        this.$tar.text(word).animate({
          'opacity': 1,
          'skew': '0, -10deg'
        }, 500, 'ease-in');
      }.bind(this);

    this.$tar.animate({'width': width}, {
      duration: 500,
      complete: fn
    }); 
  },

  topNavClicked: function topNavClicked(e) {
    e.preventDefault();
    // grab the href and navigate to it
    var targ = $(e.currentTarget).find('a').attr('href');
    page.navigator.go(targ);
  },

  unsetHeading: function unsetHeading() {
    // spin it, and stuff
    this.$tar.animate({
      'opacity': 0
    },{
      duration: 1000, 
      easing: 'ease-out',
      complete: this.setHeading.bind(this)
    });
  }
});

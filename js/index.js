_.namespace('lib');

lib.index = function(el, data) {
  this.construct(el, data);
  // let's use the listener extensior
  _.extend(this, _.extensions.listener);
  // do some stuff
  this.initialize();
  // my section child will handle moving the template content
  // into the viewport
  this.addChild(new lib.section(this.$('section'), {ajax:{}}), 'section');
  // we start from the index
  // this.getChild('section').setSection('#index');
  // observe the nav changes at the navigator
  page.navigator.observe(this.handleNav.bind(this));
  // if we have been refreshed on a 'non-index'
  this.checkUrl();
};

lib.index.prototype = _.extend(_.View.prototype, {
  checkUrl: function checkUrl() {
    if(page.navigator.get('fragment') !== page.navigator.get('root')) {
      this.getChild('section').getMarkup(page.routes[page.navigator.get('fragment')]);
    }
  },
  handleNav: function handleNav(change) {
    // we use the routes to determine the template to clone
    this.getChild('section').getMarkup(page.routes[change.name]);
  },

  initialize: function initialize() {
    // keep a ref to the *
    this.$tar = this.$('header #star');
    // delegate the clicks on the nav items
    // this.$('nav').addEventListener('click', this.topNavClicked.bind(this));
    this.bindEvents();
    // wait a couple af seconds
    setTimeout(this.setHeading.bind(this), 2000);
  },

  setHeading: function setHeading() {
    this.word = this.model.getWord();
    this.$tarWidth = this.word.length * 12;
    
    this.$tar.classList.add('see-thru');
    //this.$tar.setAttribute('width', width);
    //this.$tar.textContent = word;
    //this.$tar.classList.remove('see-thru');
  },
  setStarWidth: function setStarWidth() {
    var klass;
    if(this.$tarWidth < 50) klass = 'wider-50';
    if(this.$tarWidth < 75) klass = 'wider-75';
    else if(this.$tarWidth < 100) klass = 'wider-100';
    else if(this.$tarWidth < 125) klass = 'wider-125';
    else if(this.$tarWidth < 150) klass = 'wider-150';
    else if(this.$tarWidth < 175) klass = 'wider-175';
    else if(this.$tarWidth < 200) klass = 'wider-200';
    else if(this.$tarWidth < 225) klass = 'wider-225';
    else klass = 'wider-250';    
    this.$tar.classList.add(klass);
    this.widened = true;
  },
  topNavClicked: function topNavClicked(e) {
    e.preventDefault();
    // grab the href and navigate to it
    var targ = e.target.parentElement.getAttribute('href');
    page.navigator.go(targ);
  },
  transitionEnded: function(e) {
    // we only care if we are in the see-thru
    if(!this.$tar.classList.contains('see-thru')) return;
    if(!this.widened) {
      // animate the width of the div
      this.setStarWidth();
    } else {
      // set the word in and show it
      this.$tar.textContent = this.word;
      this.$tar.classList.remove('see-thru');
      // these can happen together
      this.$tar.classList.add('skewed');
    }
  }
});

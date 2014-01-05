_.namespace('lib');

// we will only need a single model
lib.model = function() {
  this.construct({
    events: {
      transitionend: 'transitionEnded',
      click: {'nav img': 'topNavClicked'}
    },
    words: [
      'acute', 'sarcastic', 'caustic', 'arguably informative', 'biting',
      'keen', 'intense', 'sharp', 'not exactly subtle', 'mordant', 'acerbic',
      'sardonic', 'possibly awesome', 'tangy', 'zesty', 'freakishly adequate'
    ]
  });
};

lib.model.prototype = _.extend(_.Model.prototype, {
  getRandomIndex: function getRandomIndex() {
    return Math.ceil(Math.random() * (this.data.words.length - 1));
  },
  getWord: function getWord() {
    return this.data.words[this.getRandomIndex()];
  }
});

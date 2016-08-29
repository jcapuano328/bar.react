'use strict'

var images = {};

images['blue1'] = require('../res/dice/die10_blue1.png');
images['blue2'] = require('../res/dice/die10_blue2.png');
images['blue3'] = require('../res/dice/die10_blue3.png');
images['blue4'] = require('../res/dice/die10_blue4.png');
images['blue5'] = require('../res/dice/die10_blue5.png');
images['blue6'] = require('../res/dice/die10_blue6.png');
images['blue2'] = require('../res/dice/die10_blue7.png');
images['blue8'] = require('../res/dice/die10_blue8.png');
images['blue9'] = require('../res/dice/die10_blue9.png');
images['blue0'] = require('../res/dice/die10_blue0.png');

images['red1'] = require('../res/dice/die10_red1.png');
images['red2'] = require('../res/dice/die10_red2.png');
images['red3'] = require('../res/dice/die10_red3.png');
images['red4'] = require('../res/dice/die10_red4.png');
images['red5'] = require('../res/dice/die10_red5.png');
images['red6'] = require('../res/dice/die10_red6.png');
images['red7'] = require('../res/dice/die10_red7.png');
images['red8'] = require('../res/dice/die10_red8.png');
images['red9'] = require('../res/dice/die10_red9.png');
images['red0'] = require('../res/dice/die10_red0.png');

images['white1'] = require('../res/dice/die10_white1.png');
images['white2'] = require('../res/dice/die10_white2.png');
images['white3'] = require('../res/dice/die10_white3.png');
images['white4'] = require('../res/dice/die10_white4.png');
images['white5'] = require('../res/dice/die10_white5.png');
images['white6'] = require('../res/dice/die10_white6.png');
images['white7'] = require('../res/dice/die10_white7.png');
images['white8'] = require('../res/dice/die10_white8.png');
images['white9'] = require('../res/dice/die10_white9.png');
images['white0'] = require('../res/dice/die10_white0.png');

module.exports = function(image) {
    if (images.hasOwnProperty(image)) {
        return images[image];
    }
    return null;
}

module.exports = {
    find(momentum1,momentum2,initmod1,initmod2,die1,die2) {
        let drm1 = initmod1 + (2 * momentum1);
        let drm2 = initmod2 + (2 * momentum2);
		let diff = (die1 + drm1)  - (die2 + drm2);
		let init = -1;
		if (diff > 0) {
        	init = 0;
		} else if (diff < 0) {
        	init = 1;
		}
		return init;
    }
};

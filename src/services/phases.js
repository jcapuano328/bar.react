const defaultPhases = [
	"Initiative",
    {
    	"American": [
        	"Movement",
            "Rally",
			"Def Arty Fire",
            "Rifle Fire",
            "Close Combat"
		],
    	"British": [
            "Movement",
			"Rally",
			"Def Arty Fire",
			"Rifle Fire",
			"Close Combat"
		]
	},
	"End of Turn"
];

const getNationalityPhases = (phases, nationality) => {
	let nphases = [];
	phases.forEach((p) => {
		if (typeof p == 'object' && p.hasOwnProperty(nationality)) {
			nphases = p[nationality];
		}
	});
	return nphases;
}

const getAllPhases = (phases, nationality) => {
	return phases.slice(0,1).concat(getNationalityPhases(phases,nationality), phases.slice(phases.length-1,phases.length));
}

module.exports = {
	phases: defaultPhases,
	init(battle) {
    	this.phases = battle.phases || defaultPhases;
    },
	get(idx, nationality) {
    	//console.log('Get Phase [' + idx + '] for ' + nationality);
		let l = getAllPhases(this.phases,nationality);
    	if (idx > -1 && idx < l.length) {
        	return l[idx];
        }
        return l[0];
    },
	countall(nationality) {
		let l = getAllPhases(this.phases,nationality);
		return l.length;
	},
	count(nationality) {
		let l = getNationalityPhases(this.phases,nationality);		
		return l.length;
	}
};

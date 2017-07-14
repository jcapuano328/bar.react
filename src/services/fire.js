const types = ['Rifle v Other','Rifle v Arty','Arty v All'];
const sps = ['1','2','3-5','6-9','10+'];
const ranges = ['Adjacent', '2-3 hexes'];
const tohit = {
	'Adjacent': {
    	'1': 7,
        '2': 6,
        '3-5': 4,
        '6-9': 2,
        '10+': 1
    },
    '2-3 hexes': {
    	'1': 9,
        '2': 8,
        '3-5': 7,
        '6-9': 6,
        '10+': 5
    }
};

const results = {
	'Rifle v Other': [
    	{
        	low: 0,
            high: 3,
            result: 'AM'
        },
    	{
        	low: 4,
            high: 6,
            result: 'R'
        },
    	{
        	low: 7,
            high: 8,
            result: 'D'
        },
    	{
        	low: 9,
            high: 99,
            result: '1*'
        }
    ],
    'Rifle v Arty': [
    	{
        	low: 0,
            high: 3,
            result: 'R'
        },
    	{
        	low: 4,
            high: 6,
            result: 'D'
        },
    	{
        	low: 7,
            high: 8,
            result: '1'
        },
    	{
        	low: 9,
            high: 99,
            result: '1*'
        }
    ],
    'Arty v All': [
    	{
        	low: 0,
            high: 3,
            result: 'R'
        },
    	{
        	low: 4,
            high: 6,
            result: 'D'
        },
    	{
        	low: 7,
            high: 8,
            result: '1'
        },
    	{
        	low: 9,
            high: 99,
            result: '1*'
        }
    ]
};

module.exports = {
	types: types,
    sps: sps,
    ranges: ranges,
    resolve(type, sps, range, mods, modifiers, hitdie, damagedie) {		
		let drm = mods.reduce((p,c,i,a) => {
			let fm = modifiers.find((o) => o.name == c) || {value: 0};
			return p + fm.value;
		}, 0);
    	if ((hitdie+drm) >= tohit[range][sps]) {        	
			let result = results[type].find((r) => (damagedie >= r.low && damagedie <= r.high)) || {result:'Miss'};
			return result.result;
        }
        return 'Miss';
    }
};

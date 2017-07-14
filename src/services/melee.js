const results = {
	'1-3': ['2/- (D Momentum)','AC/- (D Momentum)','1*/-','1/-','1/-','D/-','D/-','R/-','PIN','R/R','-/R','-/R','-/D (A Momentum)','-/D (A Momentum)'],
    '1-2': ['AC/- (D Momentum)','1*/- (D Momentum)','1/-','D/-','D/-','D/-','R/-','PIN','R/R','-/R','-/R','-/D','-/D (A Momentum)','-/1* (A Momentum)'],
    '1-1': ['AC/- (D Momentum)','1*/- (D Momentum)','1/-','D/-','D/-','R/-','R/-','PIN','R/R','-/R','-/D','-/D','-/1 (A Momentum)','-/1* (A Momentum)'],
    '3-2': ['AC/- (D Momentum)','1*/- (D Momentum)','1/-','D/-','D/-','R/-','PIN','R/R','-/R','-/D','-/D','-/1','-/1* (A Momentum)','-/DC (A Momentum)'],
    '2-1': ['AC/- (D Momentum)','1*/- (D Momentum)','1/-','D/-','R/-','PIN','R/R','-/R','-/R','-/D','-/D','-/1','-/1* (A Momentum)','-/AC (A Momentum)'],
    '3-1': ['1*/- (D Momentum)','D/- (D Momentum)','D/-','R/-','R/-','PIN','R/R','-/R','-/D','-/D','-/1','-/1*','-/DC (A Momentum)','-/AC (A Momentum)'],
    '4-1': ['D/- (D Momentum)','D/- (D Momentum)','R/-','R/-','PIN','R/R','-/R','-/D','-/D','-/1','-/1*','-/DC','-/AC (A Momentum)','-/2 (A Momentum)']
};

const tacticalDrm = (tacticaldie, attacktacticalldr, defendtacticalldr) => {
	let adrm = attacktacticalldr ?  1 : 0;
	let ddrm = defendtacticalldr ? -1 : 0;

	let d = tacticaldie + adrm + ddrm;
	if (d < 1) {return -2;}
	if (d < 3) {return -1;}
	if (d < 7) {return 0;}
	if (d < 9) {return 1;}
	return 2;
}

const modifierDrm = (mods, modifiers) => {
	return mods.reduce((p,c,i,a) => {
		let m = modifiers.find((mod) => mod == c) || {value:0};
		return p + m.value;
	}, 0);
}

module.exports = {
	odds: Object.keys(results),
	resolve(odds,attacknationality,attackmorale,attackleader,attackmods,attackmodifiers,
				defendnationality,defendmorale,defendleader,defendmods,defendmodifiers,
				combatdie,tacticaldie) {
		let attackdrm = modifierDrm(attackmods, attackmodifiers);
		let defenddrm = modifierDrm(defendmods, defendmodifiers);
		let attacktacticalldr = attackmods.indexOf('Tactical Leader') > -1;
		let defendtacticalldr = defendmods.indexOf('Tactical Leader') > -1;

		let index = combatdie
					+ tacticalDrm(tacticaldie, attacktacticalldr, defendtacticalldr)
					+ attackmorale + attackleader + attackdrm
					- defendmorale - defendleader + defenddrm;
		let rt = results[odds];

        //console.log('Melee attackmorale = ' + attackmorale + ', attacknationality = ' + attacknationality + ', attackleader = ' + attackleader + ', attacktacticalldr = ' + attacktacticalldr + ', attackdrm = ' + attackdrm);
        //console.log('Melee defendmorale = ' + defendmorale + ', defendnationality = ' + defendnationality + ', defendleader = ' + defendleader + ', defendtacticalldr = ' + defendtacticalldr + ', defenddrm = ' + defenddrm);

		index += 2; // index-ize the die roll
		if (index < 0) {index = 0;}
		else if (index > rt.length-1) {index = rt.length - 1;}
        //log.debug('Melee : ' + index);

        return rt[index];
	}
};

var quants = ['Most', 'More than half', 'Fewer than half', "Many", "Few"];
var AB_pairs = [
	['kustle', 'reshix'],
	['beckel', 'racual'],
	['puggle', 'entand'],
	['chadop', 'shaple'],
	['chulks', 'vulhor'],
	['werner',	'hurmer'],
	['mecket',	'plumry'],
	['gukbar',	'soarse'],
	['clidge',	'hensly'],
	['schook',	'jabant'],
	['spunge',	'wenple'],
	['shrile',	'athoid'],
	['cosutz',	'spover'],
	['coamin',	'mucond'],
	['shamer',	'bloifs'],
	['middor',	'drooty'],
	['ancits',	'smeath'],
	['pengyl',	'sedest'],
	['hadder',	'ollidy'],
	['zetten',	'unfobs'],
	['fleeve',	'scalfs'],
	['tiklet',	'hullaw'],
	['shurry',	'preser'],
	['monter',	'melelt'],
	['strant',	'potind'],
	['pluset',	'stubad'],
	['umpond',	'marire'],
	['russer',	'huttle'],
	['cather',	'funder'],
	['tecker',	'biller'],
	['birler',	'enciad'],
	['raster',	'movell'],
	['menner',	'nandow'],
	['bameta',	'unzast'],
	['pliper',	'sesare'],
	['coppar',	'hunene'],
	['sporer',	'firtly'],
	['pirter',	'secent'],
	['pobbit',	'spippy'],
	['padnet',	'fanely'],
	['boddle',	'molill'],
	['devole',	'sholly'],
	['jallem',	'sildal'],
	['dorder',	'coggon'],
	['puctor',	'recure'],
	['chevel',	'podden'],
	['awplor',	'fasees'],
	['ingell',	'nalill'],
	['bemble',	'squank'],
	['isbant',	'unairs']
];

var percent_ub =
	[["99", "1"],
		["98", "2"],
		["97", "3"],
		["96", "4"],
		["95", "5"],
		["94", "6"],
		["93", "7"],
		["92", "8"],
		["91", "9"],
		["90", "10"],
		["89", "11"],
		["88", "12"],
		["87", "13"],
		["86", "14"],
		["85", "15"],
		["84", "16"],
		["83", "17"],
		["82", "18"],
		["81", "19"],
		["80", "20"],
		["79", "21"],
		["78", "22"],
		["77", "23"],
		["76", "24"],
		["1", "99"],
		["2", "98"],
		["3", "97"],
		["4", "96"],
		["5", "95"],
		[ "6", "94"],
		["7", "93"],
		["8", "92"],
		["9", "91"],
		["10", "90"],
		["11", "89"],
		["12", "88"],
		["13", "87"],
		["14", "86"],
		["15", "85"],
		["16", "84"],
		["17", "83"],
		["18", "82"],
		["19", "81"],
		["20", "80"],
		["21", "79"],
		["22", "78"],
		["23", "77"],
		["24","76"]]

var percent = {
'above':[["99", "1"],
	["98", "2"],
	["97", "3"],
	["96", "4"],
	["95", "5"],
	["94", "6"],
	["93", "7"],
	["92", "8"],
	["91", "9"],
	["90", "10"],
	["89", "11"],
	["88", "12"],
	["87", "13"],
	["86", "14"],
	["85", "15"],
	["84", "16"],
	["83", "17"],
	["82", "18"],
	["81", "19"],
	["80", "20"],
	["79", "21"],
	["78", "22"],
	["77", "23"],
	["76", "24"]],
'below':[["1", "99"],
	["2", "98"],
	["3", "97"],
	["4", "96"],
	["5", "95"],
	[ "6", "94"],
	["7", "93"],
	["8", "92"],
	["9", "91"],
	["10", "90"],
	["11", "89"],
	["12", "88"],
	["13", "87"],
	["14", "86"],
	["15", "85"],
	["16", "84"],
	["17", "83"],
	["18", "82"],
	["19", "81"],
	["20", "80"],
	["21", "79"],
	["22", "78"],
	["23", "77"],
	["24","76"]]
};

function sample_with_replacement(ls, n) {
	return _.map(_.range(n), function (idx) { return _.sample(ls) })
};

function get_balanced_percents(N){
	percent_above = sample_with_replacement(percent['above'], N/2);
	percent_below = sample_with_replacement(percent['below'], N/2);
	balance_percent = [percent_above, percent_below];
	return balance_percent
};

/*
function get_balanced_percents(N) {
	var first_half = _.range(1, 50);
	var second_half = _.range(51, 99);
	first_percents = _.sample(first_half, N/2);
	second_percents = _.sample(second_half, N/2);
	if(Math.random() < 0.5) {
		pcts = [first_percents, second_percents];
	} else {
		pcts = [second_percents, first_percents];
	}
	return _.flatten(pcts)
}
*/
// the below depends on 'Most' and 'More than half' being the first two quantifiers in quants
var most_percents = get_balanced_percents(AB_pairs.length);
var mthalf_percents = get_balanced_percents(AB_pairs.length);
var fthalf_percents = get_balanced_percents(AB_pairs.length);
var many_percents = sample_with_replacement(percent_ub, AB_pairs.length);
var few_percents = sample_with_replacement(percent_ub, AB_pairs.length);
/*
var other_percents = _.map(_.range((quants.length-4)*AB_pairs.length), function() {
	return _.sample(_.without(_.range(1, 100), 50)) });
	*/
var percents = _.flatten([most_percents, mthalf_percents, fthalf_percents, many_percents, few_percents])
//var percents = _.flatten([most_percents, mthalf_percents, fthalf_percents])
// the splitIntoSubArray is from: https://gist.github.com/baybatu/5663f238534290d15be7
function splitIntoSubArray(arr, count) {
	var newArray = [];
	while (arr.length > 0) {
		newArray.push(arr.splice(0, count));
	}
	return newArray;
};
var percents_1 = splitIntoSubArray(percents, 2);

var pairs = cartesianProduct(quants, AB_pairs);
var with_percent = _.zip(pairs, percents_1);
var all_stims = _.shuffle(_.map(with_percent, function(ls) {
	return {A: ls[0][1][0], B: ls[0][1][1], Q: ls[0][0], P_1: ls[1][0], P_2:ls[1][1]}
}));
/*
var pairs = cartesianProduct(quants, AB_pairs);

var pairs_with_percent = _.flatten(_.map(pairs, //['most', 'yellow']
	function(pair) { return _.map(get_balanced_percents(50),
		function(colour) { return [pair, percent]; });
	}), true);

*/


// character codes
var CHAR = 75; // key k
var CHAR_L = 74; // key j
var CHAR_R = 76; // key l


function slide_builder(name, stims) {

	return slide({
		"name": name,
		present: stims,
		present_handle: function(stim) {

			this.stim = stim;
			$(document).unbind('keydown');
			$(document).unbind('keyup');

			function clearAll() {
				$(".err").hide();
				$(".right_response").hide();
				$(".left_response").hide();
				$(".display_condition").hide();
			}

			clearAll();

			function press_and_hold(char_code, fn_to_call) {
				$(document).unbind('keydown');
				clearAll();
				$(document).keydown(function(event) {
					if(event.which == char_code) {
						console.log(char_code)
						press_time = Date.now()
						fn_to_call(press_time);
					}
				});
			}

			// TODO: make this an argument
			press_and_hold(CHAR, display_one);

			function display_one(init_time) {
				$(document).unbind('keydown');
				$(document).unbind('keyup');
				$(".display_condition").html(stim.Q + " of the " + stim.A + "s are " + stim.B + ".");
				$(".display_condition").show();
				// record the initial time
				// init_time = Date.now();

				// listen for a space bar
				$(document).keyup(function(event) {
					if(event.which == CHAR) {
						_s.read_time_one = Date.now() - init_time; // in milliseconds
						press_and_hold(CHAR, display_two);
					} else {
						$(".err").html("Release the K BUTTON to advance.");
						$(".err").show();
					}
				});
			}

			function display_two(init_time) {
				$(document).unbind('keydown');
				$(document).unbind('keyup');
				// brief white screen before the new sentence?
				$(".display_condition").html(stim.P_1 + "% of the " + stim.A + "s are " + stim.B + " and " + stim.P_2 + "% of the " + stim.A + "s are not " + stim.B + ".");
				$(".display_condition").show();
				//var keyup_time;
				left_text = exp.condition == "J" ? "True" : "False";
				right_text = exp.condition == "J" ? "False" : "True";
				$(".left_response").html("Press <b>J</b> for " + left_text + ".");
				$(".left_response").show();
				$(".right_response").html("Press <b>L</b> for " + right_text + ".");
				$(".right_response").show();

				true_code = exp.condition == "J" ? CHAR_L : CHAR_R;

				$(document).keydown(function(event) {
					if(event.which == CHAR_L || event.which == CHAR_R ) { // left = 37, right = 39
						_s.read_and_decide_time = Date.now() - init_time; // in milliseconds
						_s.response = event.which == true_code;
						clearAll();
						_s.log_responses();
					}
				});
			}
		},

		log_responses : function() {
			exp.data_trials.push({
				"quant": this.stim.Q,
				"percent_1": this.stim.P_1,
				"percent_2": this.stim.P_2,
				"A": this.stim.A,
				"B": this.stim.B,
				"read_time_one": this.read_time_one,
				"read_and_decide_time": this.read_and_decide_time,
				// "nondecision_time": this.nondecision_time,
				"response": this.response
			});
			// TODO: make sure we still have more trials, else call exp.go()
			if(_s.present.length > 0) {
				_stream.apply(this)
			} else{
				//end of block
				console.log("End of block")
				$(document).unbind('keydown');
				exp.go();
			}
		}

	})
};

function make_slides(f) {
	var   slides = {};

	slides.i0 = slide({
		name : "i0",
		start: function() {
			exp.startT = Date.now();
		}
	});

	slides.instructions = slide({
		name : "instructions",
		present : ['dummy'],
		present_handle : function() {
			$("#true_button").html(exp.condition);
			$("#false_button").html(exp.condition == "J" ? "L" : "J");
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
					exp.go();
				}
			});
		}
	});

	slides.training = slide_builder("training", [
		{A: 'glerb', B: 'fizzda', Q: 'All', P_1: 20, P_2: 80},
		{A: 'thonk', B: 'krangly', Q: 'Some', P_1: 82, P_2: 18},
		{A: 'slarm', B: 'briddle', Q: 'None', P_1: 11, P_2: 89},
		{A: 'klong', B: 'nooty', Q: 'All', P_1: 62, P_2: 38},
		{A: 'dring', B: 'larfy', Q: 'None', P_1: 28, P_2: 72},
		{A: 'floom', B: 'plerful', Q: 'Some', P_1: 92, P_2: 8},
		{A: 'blek', B: 'orkital', Q: 'None', P_1: 54, P_2: 46},
		{A: 'tenk', B: 'glurgy', Q: 'All', P_1: 3, P_2: 97}
	]);


	slides.begin_slide = slide({
		name : "begin_slide",
		present : ['dummy'],
		present_handle : function() {
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
					exp.go();
				}
			});
		}
	});

	slides.single_trial = slide_builder("single_trial", all_stims);

	slides.subj_info =  slide({
		name : "subj_info",
		submit : function(e){
			//if (e.preventDefault) e.preventDefault(); // I don't know what this means.
			// TODO: MAKE CERTAIN ONES REQUIRED
			$(".err").hide();
			if($("#age").val() == "" || $("#gender").val() == "" || $("#language").val() == "" || $("#education").val() == -1) {
				$(".err").show();
			} else {
				exp.subj_data = {
					language : $("#language").val(),
					enjoyment : $("#enjoyment").val(),
					asses : $('input[name="assess"]:checked').val(),
					age : $("#age").val(),
					gender : $("#gender").val(),
					education : $("#education").val(),
					comments : $("#comments").val(),
					// problems: $("#problems").val(),
					fairprice: $("#fairprice").val(),
					fluent: $('input[name="fluent"]:checked').val(),
				};
				exp.go(); //use exp.go() if and only if there is no "present" data.
			}
		}
	});

	slides.thanks = slide({
		name : "thanks",
		start : function() {
			exp.data= {
				"trials" : exp.data_trials,
				"catch_trials" : exp.catch_trials,
				"system" : exp.system,
				"condition" : exp.condition,
				"subject_information" : exp.subj_data,
				"time_in_minutes" : (Date.now() - exp.startT)/60000
			};
			setTimeout(function() {turk.submit(exp.data);}, 1000);
		}
	});

	return slides;
}

/// init ///
function init() {
	exp.trials = [];
	exp.catch_trials = [];
	// TODO: condition for Y/N response key?
	exp.condition = _.sample(["J", "L"]); //can randomize between subject conditions here
	exp.system = {
		Browser : BrowserDetect.browser,
		OS : BrowserDetect.OS,
		screenH: screen.height,
		screenUH: exp.height,
		screenW: screen.width,
		screenUW: exp.width
	};
	//blocks of the experiment:
	// TODO: two or more blocks, with rest?
	exp.structure=["i0", "instructions", "training", "begin_slide", "single_trial", 'subj_info', 'thanks'];

	exp.data_trials = [];
	//make corresponding slides:
	exp.slides = make_slides(exp);

	exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
	//relies on structure and slides being defined

	$('.slide').hide(); //hide everything

	//make sure turkers have accepted HIT (or you're not in mturk)
	// TODO: replace Start button with space bar?
	$("#start_button").click(function() {
		if (turk.previewMode) {
			$("#mustaccept").show();
		} else {
			$("#start_button").click(function() {$("#mustaccept").show();});
			exp.go();
		}
	});

	exp.go(); //show first slide
	// TODO: advance instructions with space bar, not clicking
	// TODO: error messages when listening to keys [including proper display]
}

function cartesianProduct() {
	return _.reduce(arguments, function(a, b) {
		return _.flatten(_.map(a, function(x) {
			return _.map(b, function(y) {
				return x.concat([y]);
			});
		}), true);
	}, [ [] ]);
};

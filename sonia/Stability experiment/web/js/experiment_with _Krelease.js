var quants = ['Most', 'More than half', 'Fewer than half', 'Many', 'Few'];
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

// the below depends on 'Most' and 'More than half' being the first two quantifiers in quants
var most_percents = get_balanced_percents(AB_pairs.length);
var mthalf_percents = get_balanced_percents(AB_pairs.length);
var fthalf_percents = get_balanced_percents(AB_pairs.length);
//var maj_percents = get_balanced_percents(AB_pairs.length);
var other_percents = _.map(_.range((quants.length-3)*AB_pairs.length), function() {
	return _.sample(_.without(_.range(1, 100), 50)) });
var percents = _.flatten([most_percents, mthalf_percents, fthalf_percents, other_percents])
var pairs = cartesianProduct(quants, AB_pairs);
var with_percent = _.zip(pairs, percents);
var all_stims = _.shuffle(_.map(with_percent, function(ls) {
	    return {A: ls[0][1][0], B: ls[0][1][1], Q: ls[0][0], percent: ls[1]}
}));

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
		    // TODO: make this an argument
		   // CHAR = 40; // down arrow
		    press_and_hold(CHAR, display_one);

		    function press_and_hold(char_code, fn_to_call) {
			    $(document).unbind('keydown');
			    clearAll();
			    $(document).keydown(function(event) {
				    if(event.which == char_code) {
					    press_time = Date.now()
					    fn_to_call(press_time);
				    }
			    });
		    }

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
			    $(".display_condition").html(stim.percent + "% of the " + stim.A + "s are " + stim.B + ".");
			    $(".display_condition").show();
			    //var keyup_time;
          left_text = exp.condition == "J" ? "True" : "False";
  				right_text = exp.condition == "J" ? "False" : "True";
  				$(".left_response").html("Press <b>&larr; (J)</b> for " + left_text + ".");
  				$(".left_response").show();
  		  	$(".right_response").html("Press <b>&rarr; (L)</b> for " + right_text + ".");
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

			    /*
			  var keyup_time;

			  $(document).keyup(function(event) {
				    if(event.which == CHAR) {
					    $('.err').hide();
					    keyup_time = Date.now();
					    _s.read_time_two = keyup_time - init_time; // in milliseconds
					    //press_and_hold(CHAR, display_three);
					    /*left_text = exp.condition == "left arrow" ? "True" : "False";
					    right_text = exp.condition == "left arrow" ? "False" : "True";
					    $(".left_response").html("Press <b>&larr; (left arrow)</b> for " + left_text + ".");
					    $(".left_response").show();
					    $(".right_response").html("Press <b>&rarr; (right arrow)</b> for " + right_text + ".");
					    $(".right_response").show();


					    true_code = exp.condition == "left arrow" ? 37 : 39;

				    }
				    else {
					    $(".err").html("Release the ARROW DOWN BUTTON to advance.");
					    $(".err").show();
				    }
			    });
*/
/*

		    function display_three(init_time) {
			    $(document).unbind('keydown');
			    $(document).unbind('keyup');
			    // brief white screen before the new sentence?
			    $(".display_condition").html("Was the sentence true or false?")
			    $(".display_condition").show();
			    // TODO: make this dependent on condition?
		    }
*/

    log_responses : function() {
      exp.data_trials.push({
	      "quant": this.stim.Q,
	      "percent": this.stim.percent,
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


/*
  slides.introduction = slide({
    name : "introduction",
    present : ['dummy'],
 	  present_handle : function() {
    $(document).unbind('keydown');
    $(document).unbind('keyup');
 		  $(document).keydown(function(event) {
 			  if(event.which == CHAR) {
 				  exp.go();
 			  }
 		  });
 	  }
  });
*/

  slides.instructions = slide({
    name : "instructions",
	  present : ['dummy'],
	  present_handle : function() {
      $(document).unbind('keydown');
			$(document).unbind('keyup');
		  $("#true_button").html(exp.condition);
		  $("#false_button").html(exp.condition == "J" ? "L" : "J");
		  $(document).keydown(function(event) {
			  if(event.which == CHAR) {
				  exp.go();
			  }
		  });
	  }
	  /*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
  });

  slides.training = slide_builder("training", [
	  {A: 'glerb', B: 'fizzda', Q: 'All', percent: 20},
	  {A: 'thonk', B: 'krangly', Q: 'Some', percent: 82},
	  {A: 'slarm', B: 'briddle', Q: 'None', percent: 11},
	  {A: 'klong', B: 'nooty', Q: 'All', percent: 62},
	  {A: 'dring', B: 'larfy', Q: 'None', percent: 28},
	  {A: 'floom', B: 'plerful', Q: 'Some', percent: 92},
	  {A: 'blek', B: 'orkital', Q: 'None', percent: 54},
	  {A: 'tenk', B: 'glurgy', Q: 'All', percent: 8}
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
	  /*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
  });

  slides.single_trial = slide_builder("single_trial", all_stims);

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
	// TODO: MAKE CERTAIN ONES REQUIRED
	$(".err").hide();
	if($("#age").val() == "" || $("#gender").val() == "" || $("#language").val() == "" || $("#education").val() == -1 || $("#prolific_id").val() == "") {
    $(".err").html("<b>Please provide required information.</b>");
    $(".err").show();
	} else {
	      exp.subj_data = {
		language : $("#language").val(),
		//enjoyment : $("#enjoyment").val(),
		asses : $('input[name="assess"]:checked').val(),
		age : $("#age").val(),
		gender : $("#gender").val(),
		education : $("#education").val(),
		comments : $("#comments").val(),
		// problems: $("#problems").val(),
		//fairprice: $("#fairprice").val(),
		fluent: $('input[name="fluent"]:checked').val(),
    prolific_id: $("#prolific_id").val(),
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
      $(".complete").hide();
			$(".click_complete").hide();
			$(".err").html("<b>Please wait!</b>");
			$(".err").show();
			save_data(exp.data);
		},
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
		},
	});

	return slides;
}

function save_data (data) {
	//save data...
	//...on the web
  //TODO: add UvA server address
  //http://www.lingexp.uni-tuebingen.de/b1/brenta/save_data.php
		postAjax('http://research.illc.uva.nl/cosaqexperiments/save_data.php',
					{ json: JSON.stringify(data)},
					//show_completion_link
          show_completion_link
		);
}

/*
//to try
function success(){
  console.log("saved");
}
*/

function show_completion_link () {
	setTimeout(function(){
				show_done();
				$(".click_complete").show();
        //TODO: change to new completion single_trial_second_block
				$(".complete").attr("href", "https://app.prolific.co/submissions/complete?cc=32B37DCD");
				$(".complete").show();
	},500)
}

function show_done () {
		$(".err").html("<b>Done!</b>");
		$(".err").show();
}

function uniqid(a = "",b = false){
    var c = Date.now()/1000;
    var d = c.toString(16).split(".").join("");
    while(d.length < 14){
        d += "0";
    }
    var e = "";
    if(b){
        e = ".";
        var f = Math.round(Math.random()*100000000);
        e += f;
    }
    return a + d + e;
}


function postAjax(url, data, success) {
	var params = typeof data == 'string' ? data : Object.keys(data).map(
		function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
	).join('&');
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//var xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState>3 && xhr.status==200) { success(); }
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(params);
	return xhr;
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
//  exp.structure=["i0", "introduction", "instructions", "training", "begin_slide", "single_trial", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  var elem = document.documentElement;

	// TODO: add I disagree and stop experiment
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) { /* Firefox */
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) { /* IE/Edge */
				elem.msRequestFullscreen();
			}
      exp.go();
    }
  });

  exp.go(); //show first slide
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

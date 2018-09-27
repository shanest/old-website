//TODO: sentence "There are more blue/yellow dots then blue/yellow"
var quants = ['Most', 'More than half', 'Fewer than half', 'Many', 'Few', 'More'];
var colour = ['blue', 'yellow'];
//proportions
var colour_more= {
	'yellow': [["b5_y10"],
	["b6_y9"],
	["b6_y8"],
	["b5_y6"],
	["b7_y8"],
	["b8_y9"],
	["b10_y20"],
	["b12_y18"],
	["b12_y16"],
	["b15_y18"],
	["b14_y16"],
	["b16_y18"],
	["b15_y30"],
	["b18_y27"],
	["b18_y24"],
	["b20_y24"],
	["b21_y24"],
	["b24_y27"]],
	'blue': [["b10_y5"],
	["b9_y6"],
	["b8_y6"],
	["b6_y5"],
	["b8_y7"],
	["b9_y8"],
	["b20_y10"],
	["b18_y12"],
	["b16_y12"],
	["b18_y15"],
	["b16_y14"],
	["b18_y16"],
	["b30_y15"],
	["b27_y18"],
	["b24_y18"],
	["b24_y20"],
	["b24_y21"],
	["b27_y24"]]
};

var P_to_idx = {
	'b24_y27': '11',
  'b21_y24': '5',
	'b20_y24': '5',
	'b18_y27': '5',
	'b18_y24': '5',
	'b16_y18': '7',
	'b15_y30': '5',
	'b15_y18': '1',
	'b14_y16': '1',
	'b12_y18': '1',
	'b12_y16': '1',
	'b10_y20': '1',
	'b8_y9': '9',
	'b5_y10': '3',
	'b7_y8': '3',
	'b6_y9': '3',
	'b6_y8': '3',
	'b5_y6': '3',
	'b10_y5': '0',
  'b9_y6': '0',
	'b8_y6': '0',
	'b6_y5': '0',
	'b8_y7': '0',
	'b9_y8': '6',
	'b20_y10': '4',
	'b18_y12': '4',
	'b16_y12': '4',
	'b18_y15': '4',
	'b16_y14': '4',
	'b18_y16': '10',
	'b30_y15': '2',
	'b27_y18': '2',
	'b24_y18': '2',
	'b24_y20': '2',
	'b24_y21': '2',
	'b27_y24': '8'
};

//0,2,4,6,8 blue right
var side = [[0,2,4,6,8], [1,3,5,7,9]];

//TODO:pairs lenght should be 25 each element
var pairs = cartesianProduct(quants, colour);

function sample_with_replacement(ls, n) {
	return _.map(_.range(n), function (idx) { return _.sample(ls) })
}

//balanced for right-left side
function get_balanced_side(N) {
	blue_right = sample_with_replacement(side[0], N/2);
	blue_left = sample_with_replacement(side[1], N/2);
	balance_side = [blue_right, blue_left];
	return _.shuffle(_.flatten(balance_side))
}

//balanced for colour
function get_balanced_colour(N){
	yellow_more = sample_with_replacement(colour_more['yellow'], N/2);
	blue_more = sample_with_replacement(colour_more['blue'], N/2);
	balance_colour = [yellow_more, blue_more];
	return _.shuffle(_.flatten(balance_colour))
}

var most_side = get_balanced_side(52);
var mthalf_side = get_balanced_side(52);
var fthalf_side = get_balanced_side(52);
var many_side = get_balanced_side(52);
var few_side = get_balanced_side(52);
var more_side = get_balanced_side(52);
/*
var most_colour_one = get_balanced_colour(26);
var most_colour_two = get_balanced_colour(26);
var mthalf_colour_one = get_balanced_colour(26);
var mthalf_colour_two = get_balanced_colour(26);
var fthalf_colour_one = get_balanced_colour(26);
var fthalf_colour_two = get_balanced_colour(26);
var many_colour = get_balanced_colour(52);
var few_colour = get_balanced_colour(52);
var more_colour_one = get_balanced_colour(26);
var more_colour_two = get_balanced_colour(26);
*/
var side_all = _.flatten([most_side, mthalf_side, fthalf_side, many_side, few_side, more_side]);
//var colour_all = [most_colour_one, most_colour_two, mthalf_colour_one, mthalf_colour_two, fthalf_colour_one, fthalf_colour_two, many_colour, few_colour, more_colour_one, more_colour_two];

var pairs_with_colours = _.flatten(_.map(pairs, //['most', 'yellow']
	function(pair) { return _.map(get_balanced_colour(26),
		function(colour) { return [pair, colour]; });
	}), true);

var together = _.zip(pairs_with_colours, side_all);
var all_stims = _.shuffle(_.map(together, function(ls) {
	    return {Q: ls[0][0][0], C: ls[0][0][1], P: ls[0][1], S: ls[1]};
}));

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
			    $(".image_display").hide();
		    }

		    clearAll();
		    // TODO: make this an argument
		    CHAR = 40; // down arrow
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
			    // get image here, to load it; but don't display it until display_two
			    $(".image_display").html("<img src="+fname+" width='95%' />");
			    fname = "images/scattered_split_"+stim.P+"_"+stim.S+"_"+P_to_idx[stim.P]+".png";
			    if (stim.Q=='More') {
				 if (stim.C=='yellow') {
				 	var sec_colour = colour[0];
				 } else {
				 	var sec_colour = colour[1];
				 }
				    $(".display_condition").html("There are more " + stim.C + " dots than " + sec_colour +".");
				    $(".display_condition").show();
			    } else {
				    $(".display_condition").html(stim.Q + " of the dots are " + stim.C + ".");
				    $(".display_condition").show();
			    }

			    // record the initial time
			    // init_time = Date.now();

			    // listen for a space bar
			    $(document).keyup(function(event) {
				    if(event.which == CHAR) {
					    _s.read_time_one = Date.now() - init_time; // in milliseconds
					    press_and_hold(CHAR, display_two);
				    } else {
					    $(".err").html("Release the ARROW DOWN BUTTON to advance.");
					    $(".err").show();
				    }
			    });
		    }

		    function display_two(init_time) {
			    $(document).unbind('keydown');
			    $(document).unbind('keyup');

//last number 0-11? scattered_split_"+stim.P+"_"+stim.S+"_"+number+".png
			    $(".image_display").show();

					//$(".display_condition").html("dots ");
			    //$(".display_condition").show();
			    //var keyup_time;
			  left_text = exp.condition == "left arrow" ? "True" : "False";
			  right_text = exp.condition == "left arrow" ? "False" : "True";
			  $(".left_response").html("Press <b>&larr; (left arrow)</b> for " + left_text + ".");
			  $(".left_response").show();
			  $(".right_response").html("Press <b>&rarr; (right arrow)</b> for " + right_text + ".");
			  $(".right_response").show();

			  true_code = exp.condition == "left arrow" ? 37 : 39;

			    $(document).keydown(function(event) {
				    if(event.which == 37 || event.which == 39 ) { // left = 37, right = 39
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
	      //"percent": this.stim.percent,
	      "color": this.stim.C,
				"proportion": this.stim.P,
				"side": this.stim.S,
	      //"B": this.stim.B,
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
		  $("#false_button").html(exp.condition == "left arrow" ? "right arrow" : "left arrow");
		  $(document).keydown(function(event) {
			  if(event.which == 40) {
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
		{Q: 'All', C: "blue", P: "b7_y8", S: 9},
		{Q: 'Some', C: "yellow", P: "b24_y20", S: 9},
		{Q: 'None', C: 'blue', P: "b12_y16", S: 8},
		{Q: 'An even number', C: 'yellow', P: "b18_y16", S: 8},
		{Q: 'At least ten', C: 'blue', P: "b15_y30", S: 9},
		{Q: 'Some', C: 'yellow', P: "b6_y9", S: 8}
  ]);


  slides.begin_slide = slide({
    name : "begin_slide",
	  present : ['dummy'],
	  present_handle : function() {
		  $(document).keydown(function(event) {
			  if(event.which == 40) {
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
  exp.condition = _.sample(["left arrow", "right arrow"]); //can randomize between subject conditions here
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

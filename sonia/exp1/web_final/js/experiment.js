var quants = ['Most', 'More than half', 'Fewer than half', 'Many', 'Few'];
var AB_pairs = [
  ['kustle', 'reshix'],
	['beckel', 'racual'],
	['puggle', 'entand'],
	['chadop', 'shaple'],
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
var percents = _.map(_.range(quants.length*AB_pairs.length), function() {
	return _.sample(_.without(_.range(1, 100), 50)) });
var pairs = cartesianProduct(AB_pairs, quants);
var with_percent = _.zip(pairs, percents);

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

  slides.single_trial = slide({
    name : "single_trial",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
	  // TODO: make trials! 5Qs, each with 50 A/B pairs; percents are 1-99, without 50, drawn randomly
    present : _.shuffle(_.map(with_percent, function(ls) {
	    return {A: ls[0][0][0], B: ls[0][0][1], Q: ls[0][1], percent: ls[1]}
    })),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {

            this.stim = stim; //I like to store this information in the slide so I can record it later
	    $(document).unbind('keydown');

	    function clearAll() {
		    $(".err").hide();
		    $(".right_response").hide();
		    $(".left_response").hide();
		    $(".display_condition").hide();
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

	    // TODO: white screens between displays?
	    function display_one(init_time) {
		    $(document).unbind('keydown');
		    $(document).unbind('keyup');
		    $(".display_condition").html(stim.percent + "% of the " + stim.A + "s are " + stim.B + ".");
		    $(".display_condition").show();
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
		    // brief white screen before the new sentence?
		    $(".display_condition").html(stim.Q + " of the " + stim.A + "s are " + stim.B + ".");
		    $(".display_condition").show();

		    $(document).keyup(function(event) {
			    if(event.which == CHAR) { // space bar = 32
				    _s.read_time_two = Date.now() - init_time; // in milliseconds
				    press_and_hold(CHAR, display_three);
			    }
			    else {
				    $(".err").html("Release the ARROW DOWN BUTTON to advance.");
				    $(".err").show();
			    }
		    });
	    }

	    function display_three(init_time) {
		    $(document).unbind('keydown');
		    $(document).unbind('keyup');
		    // brief white screen before the new sentence?
		    $(".display_condition").html("Was the sentence true or false?");
		    $(".display_condition").show();
		    // TODO: make this dependent on condition?
		    left_text = exp.condition == "left arrow" ? "TRUE" : "FALSE";
		    right_text = exp.condition == "left arrow" ? "FALSE" : "TRUE";
		    $(".left_response").html("Press <b>LEFT ARROW</b> for <b>" + left_text + "</b>.");
		    $(".left_response").show();
        $(".img_left img").attr('scr');
        //$(".img_left").show();
		    $(".right_response").html("Press <b>RIGHT ARROW</b> for <b>" + right_text + "</b>.");
		    $(".right_response").show();

		    true_code = exp.condition == "left arrow" ? 37 : 39;

		    $(document).keydown(function(event) {
			    if(event.which == 37 || event.which == 39 ) { // left = 37, right = 39
				    _s.decision_time = Date.now() - init_time; // in milliseconds
				    _s.response = event.which == true_code ? "True" : "False"; // TODO: depends on condition?
				    clearAll();
				    _s.log_responses();
			    }
		    });
	    }

    },

    log_responses : function() {
      exp.data_trials.push({
	      "quant": this.stim.Q,
	      "percent": this.stim.percent,
	      "A": this.stim.A,
	      "B": this.stim.B,
	      "read_time_one": this.read_time_one,
	      "read_time_two": this.read_time_two,
	      "decision_time": this.decision_time,
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
  });

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
  exp.structure=["i0", "instructions", "single_trial", 'subj_info', 'thanks'];

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

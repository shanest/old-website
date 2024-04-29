function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions1 = slide({
    name : "instructions1",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.instructions2 = slide({
    name : "instructions2",
    start : function() {
	    $("#numtestright").text(exp.numtestwrong);
    },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.rest = slide({
	  name : "rest", 
	  start: function () {
		  $("#restgobutton").hide();
		  var count = 30;
		  counter = setInterval(countDown, 1000);
		  function countDown() {
			  if(count > 0) {
			  	count = count - 1;
			  	$("#secondcount").text(count);
			  } else {
				  clearInterval(counter);
				  //exp.go();
				  $("#restgobutton").show();
			  }
		  }
	  },
	  button: function () {
		  exp.go();
	  }
  });


  /*
  slides.one_slider = slide({
    name : "one_slider",
    start : function() {
      $(".err").hide();
      this.init_sliders();
      exp.sliderPost = null;
    },
    button : function() {
      if (exp.sliderPost != null) {
        exp.go(); //use exp.go() if and only if there is no "present" data.
        this.log_responses();
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "one_slider",
        "response" : exp.sliderPost
      });
    }
  });
  */

  slides.familiarization = slide(trial_slide_obj("familiarization"));

  slides.easytrialslide = slide(trial_slide_obj("easy"));

  slides.hardtrialslide = slide(trial_slide_obj("hard"));

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      var lang = $("#language").val();
      var enjoy = $("#enjoyment").val();
      var asses = $('input[name="assess"]:checked').val();
      var age = $("#age").val();
      var gender = $("#gender").val();
      var education = $("#education").val();
      if ( !lang || enjoy == "-1" || asses == undefined || !age || gender == "" || education == "-1") {
	      alert('Please fill in all required form values.');
      } else {
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
	  "numwrong" : exp.numwrong,
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

//factored out code common to easy vs hard trials since they're so similar.
var trial_slide_obj = function(whichtype) {
	var tobepresent;
	if (whichtype == "familiarization") {
		tobepresent = cartesianProduct(["E","F"],[11],["random","pairs"]);
	} else {
		 //true/false x 10 trials x 2 image type x 2 memory cond
		tobepresent = cartesianProduct(["E","F"],[1,2,3,4,5,6,7,8,9,10],["random","pairs"]); 
		    //smaller set, for testing purposes
		//tobepresent = cartesianProduct(["blue","yellow"],[1],["random","pairs"]); 
	}
	return {
		name : whichtype == "easy" ? "easytrialslide" : whichtype == "hard" ? "hardtrialslide" : "familiarization",
    present : _.shuffle(
	    _.map(
		    tobepresent ,
		    function(ls) { return {"col": ls[0], "num": ls[1], "type": ls[2], "cond": whichtype} }
		    )
	    ),
  
    present_handle : function(stim) {
      $(document).unbind('keydown');
      this.stim = stim; //FRED: allows you to access stim in helpers
      console.log(stim)

      this.YNresponse;
      this.digits;
      this.digitidx;
      this.digitresponse;
      this.ynRT;
      this.digRT;

      clearAll();
      setTimeout(showDigits, 500);

      function clearAll() {
      	$(".err").hide();
	$("#"+stim.cond+"_five_digit_table").hide();
	$("#"+stim.cond+"_image_display").hide();
	$("#"+stim.cond+"_ms_instruction").hide();
      }

      function showDigits() {
      	$('#'+stim.cond+'_ms_instruction').text("Memorize the following sequence of digits."); //FRED
	$("#"+stim.cond+"_ms_instruction").show();
      	//which digits based on memory condition
      	var digits = stim.cond == "easy" ? [0,1,2,3,4] : _.shuffle([0,1,2,3,4]);
	  	for(var i = 0; i < digits.length; i++) {
			  $("#"+stim.cond+"_dig"+i).text(digits[i]);
	  	}

      	this.digits = digits;
	_s.digits = digits;
      	$("#"+stim.cond+"_five_digit_table").show();
      	timeout = setTimeout(clearImage, 1500);
      }

      function clearImage() {
	      clearAll();
	      setTimeout(showImage, 850);

	      //load the image during 850ms delay to help loading
	      var add = 0;
	      //mult so as not to re-use stimuli
	      var mult = stim.cond == "easy" ? 1 : 2;
	      /*
	      if(stim.col == "yellow")
		     add = 25; 
		     */
	      var num = stim.num * mult + add;
	      //exp.condition is the prop
	      fname = "images/EF_scattered_"+stim.type+"/"+exp.condition+"_"+num+"_"+stim.col+".png";
	      $("#"+stim.cond+"_image_display").html("<img src="+fname+" height='85%' />");
      }

      function showImage() {

	      $("#"+stim.cond+"_image_display").show();
	      $('#'+stim.cond+'_ms_instruction').text("Are more than half of the letters 'E'? (y/n)");
	      $("#"+stim.cond+"_ms_instruction").show();

	      var initTime = Date.now();

	      $(document).keydown(function(event) {
		      console.log( "Handler for .keydown() called." );
		      console.log(event.which);
		      //listen for "y" or "n" keypress
		      if(event.which == 89 || event.which == 78) {
			      _s.ynRT = Date.now() - initTime;
			      if (event.which == 89) {
				      _s.YNresponse = "y";
			      }
			      if (event.which == 78) {
				      _s.YNresponse = "n";
			      }
			      console.log(_s.YNresponse);
			      //handle wrong answers
			      if ( (_s.YNresponse == "y" && stim.col == "F") || (_s.YNresponse == "n" && stim.col == "E") ) {
				      if (stim.cond == "familiarization") {
					      exp.numtestwrong++;
				      } else {
				     	      exp.numwrong++;
				      }
				      _s.YNcorrect = 0;
				      console.log("Num wrong: " + exp.numwrong);
			      } else {
				      _s.YNcorrect = 1;
			      }
			      if (exp.numwrong > 5 && !exp.alerted) {
				      exp.alerted = true;
				      alert("You have gotten more than 5 y/n questions wrong; try and stay focused!");
			      }
			      showForm();
		      } else {
			      $("#"+stim.cond+"_ynerr").show();
		      }
	      });
      }

      function showForm() {
	      $("#"+stim.cond+"_image_display").hide();
	      $(".err").hide();
	      $(document).unbind('keydown');
	      //remove the last digit, since none follow it
	      var choices = digits.slice(0,-1);
	      console.log(choices);
	      console.log(digits);
	      //get random digit 
	      var digit = random_choice(choices);
	      $('#'+stim.cond+'_ms_instruction').text("What digit in the original sequence followed: " + digit + " ?");
	      _s.digitidx = digit;

	      var initTime = Date.now();

	      $(document).keydown(function(event) {
		      if(event.which == 48 || event.which == 49 || event.which == 50 || event.which == 51 || event.which == 52) {
			      _s.digRT = Date.now() - initTime;
			      _s.digitresponse = event.which - 48;
			       //if we want to do anything with wrong digit responses
			      if (_s.digitresponse != digits[digits.indexOf(digit) + 1]) {
				      _s.digCorrect = 0;
			      } else {
				      _s.digCorrect = 1;
			      }
			      _s.log_responses();
		      } else {
				$("#"+stim.cond+"_digerr").show();
		      }
	      });
      }

    },

    log_responses : function() {
	    /*
	    exp.data_trials.push({
		    "stim": this.stim,
	            "response": {
			    "YN": this.YNresponse,
	    		    "ynRT": this.ynRT,
	    		    "digits": this.digits,
	    		    "digitidx": this.digitidx,
	    		    "digit": this.digitresponse,
		    	    "digRT": this.digRT
		    }
	    });
	    */
	    if (this.stim.cond != "familiarization") {
	    exp.data_trials.push({
		    "stim_col": this.stim.col,
	    	    "stim_num": this.stim.num,
	    	    "stim_type": this.stim.type,
	            "stim_cond": this.stim.cond,
		    "YN": this.YNresponse,
	    	    "ynRT": this.ynRT,
	     	    "ynCorrect": this.YNcorrect,
	    	    "digits": this.digits,
	    	    "digitidx": this.digitidx,
	    	    "digit": this.digitresponse,
	    	    "digRT": this.digRT,
    		    "digCorrect": this.digCorrect
	    });
	    console.log(exp.data_trials);
	    }
	    if(_s.present.length > 0) {
	    	_stream.apply(this);
	    } else {
		    //end of block, move on
		    console.log("End of block; calling exp.go");
      		    $(document).unbind('keydown');
		    exp.go();
	    }
    },
   
 }
};

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  //between-subjects: prop 7/8 8/9 9/10
  exp.condition = random_choice(["87", "98", "109"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  //we randomize whether the hard or easy block comes first
  if (Math.random() >= 0.5) {
  	exp.structure=["i0", "instructions1", "familiarization", "instructions2", "easytrialslide", "rest", "hardtrialslide", "subj_info", 'thanks'];
  } else {
  	exp.structure=["i0", "instructions1", "familiarization", "instructions2", "hardtrialslide", "rest", "easytrialslide", "subj_info", 'thanks'];
  }
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  exp.numwrong = 0;
  exp.numtestwrong = 0;
  exp.alerted = false;

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}

var stimuli = cartesianProduct(['nurse', 'teacher', 'executive', 'program'], ['sing', 'pl']);
var data = {}; 
var trialnum = 0;

//code for randomizing between two conditions
/*
var conds = [1, 2];
var cond = random_choice(conds);
var stimuli = cond == 1 ? 
	['Bill doesn\'t have any money', 'Furiously sleep green ideas colorless'] 
	:
	['Bill has any money', 'Colorless green ideas sleep furiously']; 
*/

var fillnames = cartesianProduct(['filler'], ['0','1','2','3','4','5','6','7']);
//['filler0', 'filler1', 'filler2', 'filler3', 'filler4', 'filler5', 'filler6', 'filler7'];

var fillers = [ 
	['Two friends played basketball yesterday.', 'They had a great time'],
	['A pilot will make an announcement to all of the passengers.', 'He will likely mumble.'],
	['Some students were late to the exam.', 'She apologized to the teacher.'],
	['Three friends went to the bar.', 'One of them ordered nothing.'],
	['A student argued that every question was unfair.', 'The other student agreed.'],
	['John wrote a letter to Sue.', 'It was very sweet.'],
	['Two pilots went to the zoo yesterday.', 'Giraffes moon ate many.'],
	['A friend met up with Joe.', 'They saw jump three went.']
];

var allstims = shuffle(stimuli.concat(fillnames));

var slidetotal = allstims.length;

function getSentences(stim) {
	if (stim.substring(0,6) == 'filler') {
		//stim is of form "fillern", get filler[n]
		return fillers[stim[stim.length-1]];
	} else {
		console.log(stim);
		console.log('hello!!!');
		switch(stim) {
			case 'nursesing':
				return ['A nurse will ensure that every patient gets a shot.', 'The nurse is going to be exhausted.'];
			case 'nursepl':
				return ['A nurse will ensure that every patient gets a shot.', 'The nurses are going to be exhausted.'];
			case 'teachersing':
				return ['A teacher will ensure that every student gets a test.', 'The teacher is going to sit at the front of the room.'];
			case 'teacherpl':
				return ['A teacher will ensure that every student gets a test.', 'The teachers are going to sit at the front of the room.'];
			case 'executivesing':
				return ['An executive will ensure that every employee gets a bonus.', 'The executive is going to be appreciated.'];
			case 'executivepl':
				return ['An executive will ensure that every employee gets a bonus.', 'The executives are going to be appreciated.'];
			case 'programsing':
				return ['A government program will ensure that every citizen gets a living wage.', 'The program is going to be expensive.'];
			case 'programpl':
				return ['A government program will ensure that every citizen gets a living wage.', 'The programs are going to be expensive.'];
		}
	}
}

$(document).ready(function() {
    showSlide("intro");
    $('#gotoInstructions').click(function() {
        showSlide('instructions');
    });
    $('#startbutton').click(function() {
        stepExperiment();
    });
    $('#langsubmit').click(function() {
	    if( $('#langinput').val().length > 0 ) {
	    	data['userlang'] = $('#langinput').val();
	    	data['usercomments'] = $('#usercomments').val();
	    	showSlide('finish');
	    	setTimeout(function() { turk.submit(data)}, 1000);
	    } else {
		    $('#userwarning').show();
	    }
    });
});

function showSlide (slideName) {
    $('.slide').hide();
    $('#' + slideName).show();
}

function stepExperiment () {
    if (allstims.length == 0) { // end the experiment
	    $('#userwarning').hide();
        showSlide('langinfo');
    } else { 
        trialnum += 1;
        var trialdata = {
            trialnum: trialnum
        };

            // create object to hold data from current trial
	var stimulus = allstims.shift();
        trialdata.stimulus = stimulus.join('');
            // remove 1st element of shuffled stimuli array
            // and record it as current stimulus
	trialdata.trialtype = $.inArray(stimulus, fillers) > -1 ? 'filler' : 'trial';
	//record whether the trial was a filler or a real trial
	console.log(trialdata.stimulus);
	var sentences = getSentences(trialdata.stimulus);
	console.log(sentences);

	$('#warningtext').hide();
	$('#responseForm').hide();
	$('#continue').hide();
	// update progress "bar"
	$('#slidenum').html(trialnum);
	$('#slidetot').html(slidetotal);
	$('#nextsentence').show();

        $('#currentStim').html(sentences[0]);
            // then, write it into 'currentStim' HTML placeholder
        showSlide('stage'); 
            // reveal the result to participant
	
	$('#nextsentence').click(function() {
		$('#nextsentence').unbind('click');
		$('#nextsentence').hide();

		$('#currentStim').html(sentences[1]);
		$('#responseForm').show();
		$('#continue').show();
	});

        $('#continue').click(function() {
            response = $('#responseForm').serialize();
	    //serialize has form "response=3"; just get the "3" out
            if (response.length > 0) { 
	    	response = response.split("=")[1];
                    // check for valid answer
                $("#continue").unbind('click');
                    // make continue button available for re-use 
                $(".response").prop('checked', false);
                    // ensure response options unticked next time
                trialdata.response = response;
                    // record response
                data['q' + trialnum] = trialdata;
                    // write trial data into global data object
                stepExperiment();
                    // go to next trial
            } else {
		    $("#warningtext").show();
	    }
        });
    }
}

function shuffle(v) { // non-destructive.
    newarray = v.slice(0);
    for (var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);
    return newarray;
}

function random_choice(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
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

//TODO: stimuli with multiple substitutions, randomly chosen from two lists
//without modifying the lists
//Therefore, will need a different end-experiment test (e.g. maintain a counter up to
//a specified number)

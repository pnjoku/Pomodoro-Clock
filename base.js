var sessionLength = null;
var breakLength = null;
var interval = null;
var sessionMinutesRemaining = null;
var breakMinutesRemaining = null;
var secondsRemaining = 0;
var val = 0;

function SessionPlus() {
  sessionLength = $('#sessionLength').text();
  sessionLength = (parseInt(sessionLength)) + 1;
  $('#sessionLength').html(sessionLength);
}

function SessionMinus() {
  sessionLength = $('#sessionLength').text();
  sessionLength = (parseInt(sessionLength));
  if(sessionLength > 1)
  sessionLength = sessionLength - 1;
  $('#sessionLength').html(sessionLength);
}

function BreakPlus() {
  breakLength = $('#breakLength').text();
  breakLength = (parseInt(breakLength)) + 1;
  $('#breakLength').html(breakLength);
}

function BreakMinus() {
  breakLength = $('#breakLength').text();
  breakLength = (parseInt(breakLength));
  if(breakLength > 1 )
    breakLength = breakLength - 1;
  $('#breakLength').html(breakLength);
}

function Stop() {
  clearInterval(interval);
  $('#StopButton').css("display", 'none');
  $('#actualClock').text('');
  $('#id').text('start');
  $("#clockBorder").prop('disabled', false);
}

function countDown() {
  if (sessionMinutesRemaining > 0 && secondsRemaining === 0) {
    sessionMinutesRemaining--;
    secondsRemaining = 59;

    $('#actualClock').html(sessionMinutesRemaining + ":" + ("0" + secondsRemaining).slice(-2));

  } else if (sessionMinutesRemaining >= 0 && secondsRemaining !== 0) {
    secondsRemaining--;

    $('#actualClock').html(sessionMinutesRemaining + ":" + ("0" + secondsRemaining).slice(-2));

  } else {
    $.playSound('http://audiosoundclips.com/wp-content/uploads/2012/01/Bird');
    breakMinutesRemaining = $('#breakLength').text();
    breakMinutesRemaining = (parseInt(breakMinutesRemaining));
    $('#id').text('Break');
    $('#clockBorder').css('border-color', 'green')
    clearInterval(interval);
    interval = setInterval(breakCountDown, 1000);
  }
}

function breakCountDown() {
  if (breakMinutesRemaining > 0 && secondsRemaining === 0) {
    breakMinutesRemaining--;
    secondsRemaining = 59;

    $('#actualClock').html(breakMinutesRemaining + ":" + ("0" + secondsRemaining).slice(-2));
  } else if (breakMinutesRemaining >= 0 && secondsRemaining !== 0) {
    secondsRemaining--;

    $('#actualClock').html(breakMinutesRemaining + ":" + ("0" + secondsRemaining).slice(-2));
  } else {
    $.playSound('http://audiosoundclips.com/wp-content/uploads/2012/01/Bird');
    $('#clockBorder').css('border-color', 'red');
    sessionMinutesRemaining = $('#sessionLength').text();
    sessionMinutesRemaining = (parseInt(sessionMinutesRemaining));
    $('#id').text('Session');
    clearInterval(interval);
    interval = setInterval(countDown, 1000);
  }

}

$('#breakMinus').click(BreakMinus);
$('#breakPlus').click(BreakPlus);
$('#sessionMinus').click(SessionMinus);
$('#sessionPlus').click(SessionPlus);

$("#clockBorder").click(function() {
  $('#clockBorder').css('border-color', 'red');
  sessionLength = $('#sessionLength').text();
  sessionLength = (parseInt(sessionLength));
  breakLength = $('#breakLength').text();
  breakLength = (parseInt(breakLength));
  secondsRemaining = 0;
  sessionMinutesRemaining = sessionLength;
  breakMinutesRemaining = breakLength;
  $('#id').text('Session');
  $('#StopButton').show();
  interval = setInterval(countDown, 1000);
  $(this).prop('disabled', true);
});

$('#StopButton').click(Stop);

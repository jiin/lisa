/*
*  LISA - BRING COLORS INTO MUSIC
*
*     
*
*
*
*
*/

(function() {

  var audio = new Audio();

  audio.src      = CONFIG.path + CONFIG.music[0] + '.mp3';
  audio.autoplay = CONFIG.autoplay;
  audio.controls = CONFIG.showPlayer;

  document.getElementById('player').appendChild(audio);

  var open_playlist = document.getElementById('open_playlist');
      playlist      = document.getElementById('playlist'),
      turn_off      = false;

  Object(CONFIG.music).forEach(function (song) {
    playlist.innerHTML += '<span onClick="selectSong(\'' + song + '\')">' + song + '</span><br>';
  });

  this.selectSong = function (songName) {
    audio.src = CONFIG.path + songName + '.mp3';
  };

  open_playlist.addEventListener('click', function(e) {
    var display = playlist.style.display;

    playlist.style.display = (display == 'block') ? 'none' : 'block';
  }, false);

  var core = {
    c:     {},
    ctx:   {}
  };

  core.c.frequency  = document.getElementById('frequency'),
  core.c.time       = document.getElementById('time');

  core.ctx.frequency  = core.c.frequency.getContext('2d'),
  core.ctx.time       = core.c.time.getContext('2d');

  core.c.frequency.width  = core.c.time.width  = 2800;
  core.c.frequency.height = core.c.time.height = 400;

  var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

  if (!contextClass) {
    alert('Sorry but AudioContext is not avalaible in this browser, update or pass to Google Chrome.');
    return 0;
  }

  var context = new contextClass(),
      filter  = context.createBiquadFilter();

  filter.type = 3;
  filter.frequency.value = 440;
  filter.Q.value = 0;
  filter.gain.value = 0;

  document.getElementById('bass-slider').addEventListener('change', function(e) {
    filter.gain.value = e.srcElement.value;
    document.getElementById('bass-adding').innerHTML = filter.gain.value;
  }, false);

  document.getElementById('turn-off').addEventListener('click', function(e) {
    var info = document.getElementById("info").getElementsByTagName("div");

    if (turn_off) {
      core.c.time.style.visibility = 'visible';

      for(var i = 0; i < info.length; i++)
        info[i].style.visibility = 'visible';

      document.getElementById('player').style.visibility = 'visible';
      document.getElementById('turn-off').innerHTML = 'Turn off the lights';

      turn_off = false;
    } else {
      core.c.time.style.visibility = 'hidden';

      for(var i = 0; i < info.length; i++)
        info[i].style.visibility = 'hidden';

      document.getElementById('player').style.visibility = 'hidden';
      document.getElementById('turn-off').innerHTML = 'Turn on the lights';

      turn_off = true;
    }
  }, false);

  audio.addEventListener("canplay", function(e) {
    var source   = context.createMediaElementSource(audio),
        analyser = context.createAnalyser();

    var components = {};

    Object(CONFIG.fields).forEach(function(field) {
      components[field] = document.getElementById(field);
    });

    source.connect(analyser);
    source.connect(filter);

    filter.connect(context.destination);
    analyser.connect(context.destination);

    analyser.smoothingTimeConstant = 0.9;

    components.fft_size.innerHTML = analyser.fftSize;
    components.frequency_bin_count.innerHTML = analyser.frequencyBinCount;
    components.minimum_power.innerHTML = analyser.minDecibels;
    components.maximum_power.innerHTML = analyser.maxDecibels;
    components.sample_rate.innerHTML = context.sampleRate;

    var frequencyData = new Uint8Array(analyser.frequencyBinCount),
        timeData      = new Uint8Array(analyser.frequencyBinCount);

    var frequencyFloat = new Float32Array(analyser.frequencyBinCount);

    var step = 0;

    var update = function() {

      requestAnimationFrame(update);

      Object(['frequency', 'time']).forEach(function (field) {
        core.ctx[field].setTransform(1, 0, 0, 1, 0, 0);
        core.ctx[field].clearRect(0, 0, core.c[field].width, core.c[field].height);
        core.ctx[field].restore();
      });

      analyser.getByteFrequencyData(frequencyData);
      analyser.getByteTimeDomainData(timeData);

      var total = analyser.frequencyBinCount,
          mid   = [];

      var i, j, sum = 0;

      for(i = 0; i < total; i++)
        sum += frequencyData[i];

      analyser.getFloatFrequencyData(frequencyFloat);

      var size  = frequencyFloat.length,
          parts = parseInt(size / 3),
          max   = Math.abs(Math.min.apply( Math, frequencyFloat ));

      for(i = 0; i < 3; i++) {
        sum = 0;

        for(j = parts * i; j < parts * (i + 1); j++)
          sum += frequencyFloat[j];

        mid.push(
          (turn_off) ? 0 : parseInt(((Math.abs(sum / parts) * (0.4 * (3 - i))) / max) * 255)
        );
      }

      var rgba = 'rgba(' + mid[0] + ', ' + mid[1] + ', ' + mid[2] + ', 1)';

      document.body.style['background-color'] = rgba;

      components.background_color.innerHTML = rgba;
      components.frame_number.innerHTML = step;

      for(i = 0; i < analyser.frequencyBinCount; i++) {
        core.ctx.frequency.fillStyle = (turn_off) ? '#e67e22' : '#fff';
        core.ctx.frequency.fillRect(i + 250, frequencyData[i] * 1.5, 2, 2);

        core.ctx.time.fillStyle = '#fff';
        core.ctx.time.fillRect(i + 250, timeData[i], 2, 2);
      }

      step += 1;
    };

    update();
  });
})(document);
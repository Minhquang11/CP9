const stopwatches = [];

function createStopwatch(appId, btnStartId, btnPauseId, btnStopId) {
  const app = document.getElementById(appId);
  const btnStart = document.getElementById(btnStartId);
  const btnPause = document.getElementById(btnPauseId);
  const btnStop = document.getElementById(btnStopId);
  let watchInterval;
  let miliseconds = 0;
  let seconds = 0;
  let minutes = 0;

  function startWatch() {
    watchInterval = setInterval(() => {
      miliseconds++;
      if (miliseconds === 100) {
        miliseconds = 0;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
      }
      display(minutes, seconds, miliseconds);
    }, 10);
  }

  function pauseWatch() {
    clearInterval(watchInterval);
  }

  function stopWatch() {
    clearInterval(watchInterval);
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    display(0, 0, 0);
  }

  function display(minutes, seconds, miliseconds) {
    var display = pad(minutes, 2) + ':' + pad(seconds, 2) + ', ' + pad(miliseconds, 2);
    app.innerHTML = display;
  }

  function pad(number, size) {
    return ('0' + number).slice(-size);
  }

  btnStart.onclick = function () {
    btnStart.classList.add('hidden');
    btnPause.classList.remove('hidden');
    btnStop.classList.remove('hidden');
    startWatch();
  };

  btnPause.onclick = function () {
    btnPause.classList.add('hidden');
    btnStart.classList.remove('hidden');
    pauseWatch();
  };

  btnStop.onclick = function () {
    btnStop.classList.add('hidden');
    btnStart.classList.remove('hidden');
    btnPause.classList.add('hidden');
    stopWatch();
  };

  stopwatches.push({
    start: btnStart.onclick,
    pause: btnPause.onclick,
    stop: btnStop.onclick
  });
}

createStopwatch('app1', 'btn_start1', 'btn_pause1', 'btn_stop1');
createStopwatch('app2', 'btn_start2', 'btn_pause2', 'btn_stop2');
createStopwatch('app3', 'btn_start3', 'btn_pause3', 'btn_stop3');
createStopwatch('app4', 'btn_start4', 'btn_pause4', 'btn_stop4');
createStopwatch('app5', 'btn_start5', 'btn_pause5', 'btn_stop5');

document.getElementById('btn_start_all').onclick = function() {
  stopwatches.forEach(sw => sw.start());
};

document.getElementById('btn_pause_all').onclick = function() {
  stopwatches.forEach(sw => sw.pause());
};

document.getElementById('btn_stop_all').onclick = function() {
  stopwatches.forEach(sw => sw.stop());
};
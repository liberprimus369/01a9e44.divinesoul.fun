// ------------------------ PLAYER SETUP ------------------------------



! function(a) {
    var b = /iPhone/i,
      c = /iPod/i,
      d = /iPad/i,
      e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
      f = /Android/i,
      g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
      h =
      /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
      i = /IEMobile/i,
      j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
      k = /BlackBerry/i,
      l = /BB10/i,
      m = /Opera Mini/i,
      n = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
      o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
      p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
      q = function(a, b) {
        return a.test(b)
      },
      r = function(a) {
        var r = a || navigator.userAgent,
          s = r.split("[FBAN");
        return "undefined" != typeof s[1] && (r = s[0]), s = r.split("Twitter"),
          "undefined" != typeof s[1] && (r = s[0]), this.apple = {
            phone: q(b, r),
            ipod: q(c, r),
            tablet: !q(b, r) && q(d, r),
            device: q(b, r) || q(c, r) || q(d, r)
          }, this.amazon = {
            phone: q(g, r),
            tablet: !q(g, r) && q(h, r),
            device: q(g, r) || q(h, r)
          }, this.android = {
            phone: q(g, r) || q(e, r),
            tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)),
            device: q(g, r) || q(h, r) || q(e, r) || q(f, r)
          }, this.windows = {
            phone: q(i, r),
            tablet: q(j, r),
            device: q(i, r) || q(j, r)
          }, this.other = {
            blackberry: q(k, r),
            blackberry10: q(l, r),
            opera: q(m, r),
            firefox: q(o, r),
            chrome: q(n, r),
            device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r)
          }, this.seven_inch = q(p, r), this.any = this.apple.device || this.android
          .device || this.windows.device || this.other.device || this.seven_inch,
          this.phone = this.apple.phone || this.android.phone || this.windows.phone,
          this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet,
          "undefined" == typeof window ? this : void 0
      },
      s = function() {
        var a = new r;
        return a.Class = r, a
      };
    "undefined" != typeof module && module.exports && "undefined" == typeof window ?
      module.exports = r : "undefined" != typeof module && module.exports &&
      "undefined" != typeof window ? module.exports = s() : "function" == typeof define &&
      define.amd ? define("isMobile", [], a.isMobile = s()) : a.isMobile = s()
  }(this);
  
  
  
  function stopVideo() {
    // player_vt.togglePlay();
    // player_vt.destroy();
    document.getElementsByClassName('first-layer')[0].style.display = "none";
    // document.getElementById('player0_vt').style.display = "none";
    // document.getElementById('player0_vt').remove();
    document.getElementById('player0_gt').style.display = "none";
    document.getElementById('player0_gt').remove();
  }
  
  var progress = document.getElementById('progress-bar');
  
  function updateProgress(player_time, player_duration) {
    let percentage = (100 * player_time) / player_duration;
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    if (percentage < 3) { // 27 p
      percentage = percentage * 9;
    } else if (percentage < 10) { // 48 p
      percentage = 27 + ((percentage - 3) * 3);
    } else if (percentage < 50) { // 88 p
      percentage = percentage + 38;
    } else if (percentage >= 50) { // 100 p
      percentage = 88 + (12 * (percentage - 50) / 50);
    }
    progress.style.width = percentage + "%";
  }
  
  
  function exitFullscreen() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ||
      document.msFullscreenElement) {
      document.webkitExitFullscreen();
    }
  }
  
  
  // ------------------------ ANALYTICS ------------------------------
  
  
  function generateViewId() {
    // Combina um número aleatório com o timestamp atual para garantir unicidade
    return Math.floor(Math.random() * 1000000) + Date.now();
  }
  
  function generateSessionId() {
    // Combina um número aleatório com o timestamp atual para gerar o ID da sessão
    let sessionId = Math.floor(Math.random() * 1000000) + Date.now();
    localStorage.setItem('KP_session_id', sessionId);
    return sessionId;
  }
  
  
  
  async function sendVii(data) {
    const url = atob(
      'aHR0cHM6Ly9uOG4ucGFnYW1lcmljYW4uY29tL3dlYmhvb2sva3AtYW5hbHl0aWNz');
  
    const response = await fetch(url, {
      method: "POST",
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      },
      body: JSON.stringify(data),
    });
    // const res = await response.json();
  }
  
  
  
  // ------------------------ CONTROLS ------------------------------
  
  function mobilePause() {
    if (!player.paused) {
      player.toggleControls();
      player.togglePlay();
    }
  }
  
  // Change "{}" to your options:
  
  var player, player_vt;
  
  function initPlayer(availableQualities) {
    player = new Plyr("#player0", {
      type: 'video',
      controls: ['play-large', 'play', ],
      muted: false,
      speed: {
        selected: 1.25
      },
      default: availableQualities[0],
      options: availableQualities,
      forced: true,
      onChange: (newQuality) => {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            console.log("Found quality match with " +
              newQuality);
            window.hls.currentLevel = levelIndex;
          }
        });
      },
    });
  
    // Expose player so it can be used from the console
    window.player = player;
    window.x_salesman = "XGB";
    window.x_vsl = "DAS19";
    var lastSentProgress = 0;
  
    var dnone = true;
    player.on('timeupdate', () => {
      exitFullscreen();
      player.volume = 1;
      player.muted = false;
      player.elements.poster.style.display = 'none';
      if (player.currentTime > 2079 && dnone) {
  
  
        document.getElementById('callaction_b0fa099042565e73b008e9b0_0').style
          .display = "block";
        // document.getElementById('hid2').style.display = "block";
  
        dnone = false;
      }
      progress = document.getElementById('progress-bar');
      updateProgress(player.currentTime, player.duration);
  
  
      // ------------- KPA snippet -------------
      let percentage = (100 * player.currentTime) / player.duration;
  
      var percent = Math.floor((player.currentTime / player.duration) * 100);
  
      // console.log(percentage);
      if (percent >= lastSentProgress + 5) { // Verifica se o próximo incremento de 5% foi atingido
        lastSentProgress = percent - (percent % 5); // Atualiza o último progresso enviado arredondando para baixo para o múltiplo de 5 mais próximo
  
        // console.log(lastSentProgress);
  
        let ViiData = {
          "viewer_id": eval(localStorage.getItem('KP_session_id')),
          "vTag": x_vsl,
          "progress": lastSentProgress,
          "play_time": player.currentTime,
          "watch_status": "play",
        };
        sendVii(ViiData);
        console.log('====================================');
        console.log('KPA event');
        console.log('====================================');
        // console.log(ViiData);
  
        // sendProgress(lastSentProgress); // Envia o progresso
      }
  
      switch (percentage) {
        case 0:
          let ViiData = {
            "viewer_id": eval(localStorage.getItem('KP_session_id')),
            "vTag": x_vsl,
            "progress": 0,
            "play_time": 0,
            "watch_status": "play",
          };
          // console.log(ViiData);
          sendVii(ViiData);
          console.log('====================================');
          console.log('KPA event');
          console.log('====================================');
  
          break;
      }
  
      // ------------- END KPA snippet -------------
  
  
    });
  
    player.on('ready', () => {
      player.currentTime = 0;
      player.volume = 0;
      // player.elements.original.setAttribute(
      // "onClick", "player.toggleControls(); player.togglePlay();");
      player.elements.poster.setAttribute(
        "onClick", "player.togglePlay();");
      // document.getElementsByClassName("plyr__controls")[0].style.display =
      //   'none';
      document.getElementsByClassName("plyr__controls")[0].setAttribute(
        "onClick", "player.toggleControls(); player.togglePlay();");
      // player.elements.container.setAttribute(
      //   "onClick", "mobilePause()");
  
  
      // ------------- KPA snippet -------------
      // Inicializa o view_id e o session_id
      const viewId = generateViewId();
      const sessionId = !localStorage.getItem('KP_session_id') ?
        generateSessionId() : eval(localStorage.getItem('KP_session_id'));
  
      console.log('View ID: ', viewId);
      console.log('Session ID: ', sessionId);
  
      let params = {};
      window.location.search.replace(
        /^\?/, "&").split("&").forEach(part => {
        const [key, value] = part.split('=').map(decodeURIComponent);
        if (key) params[key.toLowerCase()] = value;
      });
  
      var countryCode = "";
      var ipv4 = "";
      var ipv6 = "";
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
          countryCode = JSON.parse(this.response).YourFuckingCountryCode;
          window.countryCode = JSON.parse(this.response).YourFuckingCountryCode;
          ipv4 = JSON.parse(this.response).ip;
          window.ipv4 = JSON.parse(this.response).ip;
          ipv6 = JSON.parse(this.response).YourFuckingIPAddress;
          window.ipv6 = JSON.parse(this.response).YourFuckingIPAddress;
  
          let device = window.isMobile.any ? 'Mobile ' : 'Desktop ';
          device += navigator.platform;
  
          let browser = 'unknown';
          if (navigator.userAgentData && navigator.userAgentData.brands.length >
            0) {
            browser = navigator.userAgentData.brands[navigator.userAgentData
              .brands.length - 1].brand;
          } else {
            if (navigator.vendor == 'Google Inc.') {
              browser = 'Chrome'
            } else if (navigator.vendor == 'Apple Computer, Inc.') {
              browser = 'Safari';
            } else {
              browser = navigator.appCodeName + ' ' + navigator.vendor;
            }
          }
  
  
          let ViiData = {
            "viewer_id": sessionId,
            "vTag": x_vsl,
            "progress": 0,
            "play_time": 0,
            "watch_status": "video_view",
            "ip": ipv4 && ipv4 != '' ? ipv4 : ipv6,
            "country": countryCode,
            "xpromo": x_salesman + "-" + x_vsl +
              "-" + utm_source + "-" + utm_campaign + "-" + utm_medium +
              "-" + utm_content,
            "domain": window.location.host,
            "page_url": location.href.replace(/\?.*/, ""),
            "device": device,
            "browser": browser,
            "params": params,
          };
          // console.log('VII Data: ', ViiData);
          sendVii(ViiData);
          console.log('====================================');
          console.log('Init KPA');
          console.log('====================================');
  
        }
      }
      xhttp.open("GET", "https://wtfismyip.com/json", true);
      xhttp.send();
      // ------------- END KPA snippet -------------
  
  
    });
  
    var sound = false;
  
    player.on('playing', () => {
      player.volume = 1;
      player.muted = false;
      player.elements.poster.style.opacity = 0;
      player.elements.poster.style.display = 'none';
      player.elements.poster.style.cursor = 'pointer';
      if (!sound) {
        player.currentTime = 0;
        sound = true;
        if (isMobile.any) {
          setTimeout(() => {
            player.togglePlay();
          }, 300)
          setTimeout(() => {
            player.togglePlay();
          }, 300)
        }
        setTimeout(() => {
          player.elements.poster.style.backgroundImage =
            "url('img/vsl-paused-eng.gif')";
          player.elements.poster.style.backgroundSize =
            "cover";
          player.elements.poster.style.backgroundPosition =
            "50% 100%";
        }, 1000);
      }
  
    });
  
    player.on('pause', () => {
      player.elements.poster.style.display = 'block';
      player.elements.poster.style.opacity = 1;
      player.elements.poster.style.zIndex = 8;
      exitFullscreen();
    });
  
  
  
    player_vt = new Plyr("#player0_vt", {
      type: 'video',
      controls: [],
      muted: true,
      playsinline: true,
      loop: {
        active: true
      },
    });
  
    player_vt.on('ready', () => {
      player_vt.currentTime = 0;
      player_vt.volume = 0;
      player_vt.togglePlay();
      player_vt.elements.container.style =
        "position: absolute;z-index: 109;top: 0;width: 100%;";
    });
  
  }
  
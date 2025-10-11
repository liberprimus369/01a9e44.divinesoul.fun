class SmartPlayer {

    player;
    video;
    overlay;
    overlayButton;
    overlayBezel;
    params;
    window;
  
    constructor(player, index, has_clk) {
      this.index = index;
      this.player = player;
      this.has_clk = has_clk;
      // this.instances = instances;
      this.params = new URLSearchParams(window.location.search);
      this.container = this.player.parentNode;
  
      // console.log(has_clk);
      // console.log(index);
      // console.log(instances);
  
      // this.instances.shift();
      // this.instances.shift();
      // this.instances.shift();
      // console.log(instances);
  
  
      this.player.innerHTML += this.video_markup2;
      this.container.innerHTML += this.videothumbnail_markup + this.first_layer;
      // this.container.innerHTML += this.first_layer + this.videothumbnail_markup1;
      // this.container.innerHTML += this.first_layer;
  
  
  
      document.addEventListener("DOMContentLoaded", () => {
        const video = document.querySelector("video");
        const source =
          'https://vz-b9b2ec9f-18a.b-cdn.net/66913caa-2cf1-4e25-b2a1-11ca587607c2/playlist.m3u8';
  
        // For more options see: https://github.com/sampotts/plyr/#options
        // captions.update is required for captions to work with hls.js
        const defaultOptions = [640];
  
        if (Hls.isSupported()) {
          // For more Hls.js options, see https://github.com/dailymotion/hls.js
          const hls = new Hls();
          hls.loadSource(source);
  
          // From the m3u8 playlist, hls parses the manifest and returns
          // all available video qualities. This is important, in this approach,
          // we will have one source on the Plyr player.
          hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
  
            // Transform available levels into an array of integers (height values).
            const availableQualities = hls.levels.map((l) => l.height)
            console.log(availableQualities);
            // Add new qualities to option
  
  
            // Initialize here
            // const player = new Plyr(video, defaultOptions);
            initPlayer(availableQualities);
          });
          hls.attachMedia(video);
          window.hls = hls;
        } else {
          // default options with no quality update in case Hls is not supported
          initPlayer(defaultOptions);
  
          // const player = new Plyr(video, defaultOptions);
        }
      });
  
      initPlayer();
  
  
  
      // this.video = this.player.querySelector('video');
      // this.container = this.video.parentNode();
      // this.video.remove();
      // this.container;
  
      // this.overlay = this.player.querySelector('.ytless-player--overlay');
      // this.overlayButton = this.overlay.querySelector('.ytless-player--button');
      // this.overlayBezelPause = this.player.querySelector('.ytp-bezel-pause');
      // this.overlayBezelPlay = this.player.querySelector('.ytp-bezel-play');
  
      // this.overlay.style.backgroundImage = this.poster;
  
      // this.player.addEventListener('click', this._click);
    }
  
    get poster() {
      return `url(${this.video.poster})`
    }
  
    get video_id() {
      // return this.params.get('v')
      return 'GN9Bmy4sFLM'
    }
  
    get videothumbnail_id() {
      // return '1zYM5t98bXs'
      return 'GN9Bmy4sFLM'
    }
  
    get video_markup2() {
  
      let html, sources;
  
      if (this.has_clk) {
        html =
          `
        <video id="player${this.index}" webkit-playsinline playsinline controlsList="nofullscreen">
          <source src="https://converteaii.b-cdn.net/AM%20%5BEN%5D/VSL_Wealth-Flow.mp4">
        </video>`;
      } else {
        html =
          `
        <video id="player${this.index}" webkit-playsinline playsinline controlsList="nofullscreen">
          <source src="https://vz-b9b2ec9f-18a.b-cdn.net/66913caa-2cf1-4e25-b2a1-11ca587607c2/playlist.m3u8">
        </video>`;
  
        // html =
        //   `
        // <video id="player${this.index}" webkit-playsinline playsinline controlsList="nofullscreen">
        //   <source src="https://vz-b9b2ec9f-18a.b-cdn.net/17d37256-14a7-4b51-8027-17d4d641f539/play_240p.mp4">
        //   <source src="https://vz-b9b2ec9f-18a.b-cdn.net/17d37256-14a7-4b51-8027-17d4d641f539/play_360p.mp4">
        //   <source src="https://vz-b9b2ec9f-18a.b-cdn.net/17d37256-14a7-4b51-8027-17d4d641f539/play_420p.mp4">
        //   <source src="https://vz-b9b2ec9f-18a.b-cdn.net/17d37256-14a7-4b51-8027-17d4d641f539/play_720p.mp4">
        //   <source src="https://converteaii.b-cdn.net/AM%20%5BEN%5D/VSL_AM_4x5.mp4">
        // </video>`;
      }
  
  
      return html
    }
  
    get videothumbnail_markup1() {
  
      let html, sources;
  
      // sources = this.instances.map(instance => {
      //
      //   const sources =
      //     `
      //     <source src="https://cdn-zilian.b-cdn.net/DespertarNeural_v2.mp4">
      //   `;
      //
      //   return sources
      // }).join("");
  
      if (this.has_clk) {
        html =
          `
        <video id="player${this.index}_vt" class="smartplayer-videothumbnail" webkit-playsinline playsinline controlsList="nofullscreen">
          <source src="https://converteaii.b-cdn.net/AM%20%5BEN%5D/VSL_Wealth-Flow.mp4">
        </video>`;
      } else {
  
        html =
          `
        <video id="player${this.index}_vt" class="smartplayer-videothumbnail" webkit-playsinline playsinline controlsList="nofullscreen">
          <source src="https://converteaii.b-cdn.net/AM%20%5BEN%5D/VSL_AM_4x5.mp4">
        </video>`;
      }
  
      return html
    }
  
  
    get videothumbnail_markup() {
  
      let html, sources;
  
      // sources = this.instances.map(instance => {
      //
      //   const sources =
      //     `
      //     <source src="https://cdn-zilian.b-cdn.net/DespertarNeural_v2.mp4">
      //   `;
      //
      //   return sources
      // }).join("");
  
      if (this.has_clk) {
        html =
          `
          <div class="gifthumb-layer" id="player${this.index}_gt" style="overflow:hidden;" onClick="stopVideo();player.toggleControls(); player.togglePlay();">
            <img src="https://vz-b9b2ec9f-18a.b-cdn.net/e5fc2073-688f-40cf-a0df-418b6d58246c/preview.webp" class="gif-thumb" alt="thumb">
          </div>
        `;
      } else {
  
        html =
          `
          <div class="gifthumb-layer" id="player${this.index}_gt" style="overflow:hidden;" onClick="stopVideo();player.toggleControls(); player.togglePlay();">
            <img src="img/DAS_VThumb.gif" class="gif-thumb" alt="thumb">
          </div>
          `;
      }
  
      return html
    }
  
    get first_layer1() {
      let html;
  
      html =
        `
        <div class="first-layer" id="player${this.index}_gt" onClick="stopVideo();player.toggleControls(); player.togglePlay();">
          <img src="img/thumb.gif" class="gif-thumb" alt="thumb">
        </div>
      `;
  
      return html
    }
  
    get first_layer() {
      let html;
  
      html =
        `
        <div class="first-layer" onClick="stopVideo();player.toggleControls(); player.togglePlay();">
          <div class="box">
            <center>
              <span class="fl-span">The video has already started</span>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="96.75px" height="80.563px" viewBox="7.999 9.062 46.75 32.563" enable-background="new 7.999 9.062 46.75 32.563" xml:space="preserve">
                <style>@-webkit-keyframes BLINK {0% { opacity: 0; }33% { opacity: 1; }66% { opacity: 1; }100% { opacity: 0; }}@keyframes BLINK {0% { opacity: 0; }33% { opacity: 1; }66% { opacity: 1; }100% { opacity: 0; }}.blink_1 {-webkit-animation: BLINK 2s infinite;animation: BLINK 2s infinite;opacity: 0;} .blink_2 {-webkit-animation: BLINK 2s infinite .3s;animation: BLINK 2s infinite .3s;opacity: 0;}.blink_3 {-webkit-animation: BLINK 2s infinite .6s;animation: BLINK 2s infinite .6s;opacity: 0;}.smartplay-svg-color {fill: #FFFFFF !important;}.adjustable {border: 4px solid red;}</style>
                <g class="adjustable fg">
                <path class="smartplay-svg-color" d="M53.249,39.616c-0.186,0-0.371-0.051-0.537-0.157l-43.5-27.75c-0.466-0.297-0.603-0.916-0.306-1.381c0.298-0.466,0.917-0.601,1.381-0.306l43.5,27.75c0.467,0.297,0.604,0.916,0.307,1.381C53.901,39.453,53.579,39.616,53.249,39.616z"></path><path class="blink_3 smartplay-svg-color" d="M48.896,33.467l1.699,1.085c3.497-7.791,2.073-17.271-4.313-23.659c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414C50.581,18.019,51.913,26.463,48.896,33.467z"></path>
                <path class="blink_3 smartplay-svg-color" d="M46.926,36.956c-0.612,0.863-1.286,1.695-2.059,2.469c-0.392,0.391-0.392,1.023,0,1.414c0.194,0.195,0.45,0.293,0.707,0.293c0.256,0,0.512-0.098,0.706-0.293c0.878-0.878,1.642-1.824,2.333-2.807L46.926,36.956z"></path><path class="blink_2 smartplay-svg-color" d="M42.543,29.415l1.777,1.135c1.545-5.315,0.229-11.293-3.953-15.476c-0.392-0.391-1.023-0.391-1.414,0c-0.392,0.391-0.392,1.023,0,1.414C42.454,19.987,43.639,24.925,42.543,29.415z"></path>
                <path class="blink_2 smartplay-svg-color" d="M41,33.174c-0.563,0.94-1.235,1.837-2.047,2.646c-0.391,0.392-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.916-0.914,1.676-1.924,2.317-2.984L41,33.174z"></path><path class="blink_1 smartplay-svg-color" d="M35.771,25.094l2.003,1.277c0.012-0.203,0.029-0.404,0.029-0.609c0-3.079-1.2-5.974-3.381-8.153c-0.391-0.391-1.022-0.391-1.414,0c-0.391,0.391-0.391,1.023,0,1.414C34.652,20.666,35.613,22.802,35.771,25.094z"></path>
                <path class="blink_1 smartplay-svg-color" d="M35.084,29.401c-0.474,1.145-1.172,2.197-2.076,3.1c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293c0.257,0,0.513-0.098,0.707-0.293c1.008-1.006,1.795-2.17,2.361-3.43L35.084,29.401z"></path><polygon class="smartplay-svg-color" points="28.124,20.215 28.124,14.991 24.635,17.99  "></polygon><path class="smartplay-svg-color" d="M20.921,20.366h-6.423c-0.553,0-1,0.508-1,1.135v8.229c0,0.627,0.447,1.135,1,1.135h7.375l6.25,5.875V24.96L20.921,20.366z"></path>
                </g>
              </svg>
              <span class="fl-span">Tap here to listen!</span>
            </center>
          </div>
        </div>
      `;
  
      return html
    }
  
  }
  
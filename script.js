(function () {
  if (window.__ENDURO_LOADED) return;
  window.__ENDURO_LOADED = true;

  function boot() {
    var host = document.getElementById('enduro')
      || document.getElementById('jogo')
      || document.querySelector('[data-enduro]');
    if (!host) {
      host = document.createElement('div');
      host.id = 'enduro';
      (document.querySelector('main') || document.body).appendChild(host);
    }

    if (!document.getElementById('enduro-font')) {
      var f1 = document.createElement('link');
      f1.id = 'enduro-font';
      f1.rel = 'stylesheet';
      f1.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap';
      document.head.appendChild(f1);
    }
    if (!document.getElementById('enduro-css')) {
      var st = document.createElement('style');
      st.id = 'enduro-css';
      st.textContent = [
        '#enduro, #jogo, [data-enduro]{position:relative;width:100%;max-width:960px;margin:0 auto;min-height:420px;height:min(70vh,620px);background:#070709;color:#fff;font-family:VT323,monospace;overflow:hidden;border:3px solid #3a2a1a;box-shadow:0 0 0 4px #24180e,0 18px 50px rgba(255,106,0,.18);}',
        '#enduro *, #jogo *, [data-enduro] *{box-sizing:border-box;-webkit-user-select:none;user-select:none;}',
        '.ed-wrap{position:absolute;inset:0;display:flex;flex-direction:column;background:#0c0c10;}',
        '.ed-top{display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:linear-gradient(#2a1a0c,#140e08);border-bottom:2px solid rgba(255,106,0,.4);font-family:"Press Start 2P",cursive;font-size:8px;color:#ff6a00;z-index:5;}',
        '.ed-top b{color:#ffc14a;font-size:10px;text-shadow:0 0 10px #ff6a00;}',
        '.ed-top button{font-family:"Press Start 2P",cursive;font-size:7px;padding:5px 8px;background:rgba(0,0,0,.45);color:#ffc14a;border:1px solid rgba(255,106,0,.4);cursor:pointer;}',
        '.ed-screen{position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;background:#000;overflow:hidden;}',
        '.ed-screen canvas{display:block;image-rendering:pixelated;image-rendering:crisp-edges;background:#000;}',
        '.ed-screen:before{content:"";position:absolute;inset:0;pointer-events:none;z-index:4;background:repeating-linear-gradient(0deg,rgba(0,0,0,.13) 0 1px,transparent 1px 3px);}',
        '.ed-screen:after{content:"";position:absolute;inset:0;pointer-events:none;z-index:4;background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.45) 100%);}',
        '.ed-hud{position:absolute;inset:0;z-index:6;pointer-events:none;display:none;}',
        '.ed-hud.on{display:block;}',
        '.ed-hud-top,.ed-hud-bot{position:absolute;left:0;right:0;display:flex;justify-content:space-between;align-items:flex-end;padding:8px 10px;}',
        '.ed-hud-top{top:0;align-items:flex-start;background:linear-gradient(rgba(0,0,0,.7),transparent);}',
        '.ed-hud-bot{bottom:0;background:linear-gradient(transparent,rgba(0,0,0,.8));}',
        '.ed-lab{font-family:"Press Start 2P",cursive;font-size:7px;color:#ff6a00;}',
        '.ed-num{font-family:VT323,monospace;font-size:32px;line-height:1;color:#fff;}',
        '.ed-spd{font-size:48px;color:#ff6a00;text-align:center;}',
        '.ed-mid{flex:1;padding:0 10px;}',
        '.ed-row{display:flex;justify-content:space-between;font-family:"Press Start 2P",cursive;font-size:7px;color:#ffc14a;margin-bottom:4px;}',
        '.ed-bar{height:8px;background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.2);position:relative;overflow:hidden;}',
        '.ed-bar>span{display:block;height:100%;background:linear-gradient(90deg,#ffb347,#ff6a00,#1a1a4e);width:0;}',
        '.ed-bar>i{position:absolute;top:50%;width:10px;height:10px;margin-top:-5px;border-radius:50%;background:#ffe566;box-shadow:0 0 8px #ffe566;left:0;}',
        '.ed-msg{font-family:"Press Start 2P",cursive;font-size:8px;text-align:center;margin-top:4px;height:12px;color:#fff;}',
        '.ed-overlay{position:absolute;inset:0;z-index:8;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.5);}',
        '.ed-overlay.hide{display:none;}',
        '.ed-panel{width:92%;max-width:420px;text-align:center;padding:18px 16px;background:rgba(0,0,0,.78);border:1px solid rgba(255,106,0,.3);}',
        '.ed-panel h1{font-family:"Press Start 2P",cursive;font-size:22px;color:#ff6a00;margin:0 0 6px;text-shadow:0 0 12px #ff6a00;}',
        '.ed-panel h2{font-family:"Press Start 2P",cursive;font-size:13px;color:#ffc14a;margin:0 0 12px;}',
        '.ed-panel p{margin:0 0 12px;font-size:18px;color:rgba(255,255,255,.85);}',
        '.ed-panel ul{text-align:left;font-size:17px;margin:0 0 14px;padding:0 0 0 6px;list-style:none;color:rgba(255,255,255,.9);}',
        '.ed-panel li{margin:6px 0;}',
        '.ed-panel .grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;text-align:left;margin:0 0 14px;font-size:18px;}',
        '.ed-panel .grid div{background:rgba(0,0,0,.4);padding:8px;border:1px solid rgba(255,255,255,.1);}',
        '.ed-btn{display:block;width:100%;font-family:"Press Start 2P",cursive;font-size:11px;padding:12px 8px;margin:0 0 8px;border:0;cursor:pointer;background:#ff6a00;color:#000;}',
        '.ed-btn.alt{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);font-size:10px;}',
        '.ed-btn:active{transform:translateY(2px);}',
        '.ed-touch{display:none;position:absolute;left:0;right:0;bottom:56px;z-index:9;padding:0 10px;justify-content:space-between;align-items:flex-end;pointer-events:none;visibility:hidden;}',
        '.ed-touch .col,.ed-touch .row{display:flex;gap:8px;pointer-events:auto;}',
        '.ed-touch .col{flex-direction:column;}',
        '.ed-pad{width:58px;height:58px;border:0;border-radius:6px;background:rgba(255,106,0,.85);color:#fff;font-size:20px;font-family:"Press Start 2P",cursive;box-shadow:0 5px 0 #3a1400;cursor:pointer;}',
        '.ed-pad.g{background:rgba(34,187,85,.85);}',
        '.ed-pad.d{background:rgba(68,68,68,.85);height:50px;}',
        '.ed-pad:active,.ed-pad.held{transform:translateY(4px);box-shadow:0 2px 0 #3a1400;}',
        '.ed-bot{padding:4px 10px;background:#140e08;color:#9a7a4a;font-size:13px;border-top:1px solid rgba(255,106,0,.2);}',
        '@media (hover:none) and (pointer:coarse){.ed-touch{display:flex;}}'
      ].join('\n');
      document.head.appendChild(st);
    }

    host.innerHTML = ''
      + '<div class="ed-wrap">'
      + '  <div class="ed-top"><span>ATARI · 1983</span><b>ENDURO</b><span><button type="button" data-ed="mute">SOM: ON</button> <button type="button" data-ed="fs">TELA</button></span></div>'
      + '  <div class="ed-screen">'
      + '    <canvas width="800" height="500"></canvas>'
      + '    <div class="ed-hud">'
      + '      <div class="ed-hud-top">'
      + '        <div><div class="ed-lab">DIA</div><div class="ed-num" data-ed="day">1</div></div>'
      + '        <div class="ed-mid"><div class="ed-row"><span data-ed="weather">ENSOLARADO</span><span data-ed="quota">0 / 20 CARROS</span></div>'
      + '          <div class="ed-bar"><span data-ed="daybar"></span><i data-ed="sundot"></i></div>'
      + '          <div class="ed-msg" data-ed="msg"></div></div>'
      + '        <div style="text-align:right"><div class="ed-lab">PONTOS</div><div class="ed-num" data-ed="score">0</div></div>'
      + '      </div>'
      + '      <div class="ed-hud-bot">'
      + '        <div><div class="ed-lab">KM</div><div class="ed-num" style="font-size:26px;color:#ddd" data-ed="km">0.0</div></div>'
      + '        <div style="text-align:center"><div class="ed-num ed-spd" data-ed="speed">0</div><div class="ed-lab" style="color:#ffc14a">KM/H</div>'
      + '          <div class="ed-bar" style="width:180px;margin:4px auto 0"><span data-ed="spdbar" style="background:linear-gradient(90deg,#2d5,#ffc14a,#ff3a00)"></span></div></div>'
      + '        <div style="text-align:right"><div class="ed-lab" style="color:#888">RECORDE</div><div class="ed-num" style="font-size:26px;color:#ffc14a" data-ed="best">0</div></div>'
      + '      </div>'
      + '    </div>'
      + '    <div class="ed-overlay"><div class="ed-panel"></div></div>'
      + '    <div class="ed-touch">'
      + '      <div class="row"><button type="button" class="ed-pad" data-key="left">◀</button><button type="button" class="ed-pad" data-key="right">▶</button></div>'
      + '      <div class="col"><button type="button" class="ed-pad g" data-key="up">▲</button><button type="button" class="ed-pad d" data-key="down">▼</button></div>'
      + '    </div>'
      + '  </div>'
      + '  <div class="ed-bot">← → dirigir · ↑ acelerar · ↓ frear · P pausar</div>'
      + '</div>';

    runGame(host);
  }

  function runGame(root) {
    const W = 800, H = 500;
    const SEGMENT_LENGTH = 200;
    const ROAD_WIDTH = 2000;
    const CAMERA_HEIGHT = 1000;
    const FOV = 100;
    const CAMERA_DEPTH = 1 / Math.tan((FOV / 2) * Math.PI / 180);
    const DRAW_DISTANCE = 140;
    const LANES = 3;
    const BUF = 700;
    const RUMBLE = 3;
    const MAX_SPEED = 6200;
    const ACCEL = 2100;
    const BREAKING = 5200;
    const DECEL = 900;
    const OFF_DECEL = 2800;
    const OFF_LIMIT = 2600;
    const CENTRIFUGAL = 0.28;
    const SPRITE_SCALE = 0.3 * (1 / CAMERA_DEPTH);
    const DAY_SECONDS = 62;

    const canvas = root.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const screenEl = root.querySelector('.ed-screen');
    const overlay = root.querySelector('.ed-overlay');
    const panel = root.querySelector('.ed-panel');
    const hud = root.querySelector('.ed-hud');
    const $ = (k) => root.querySelector('[data-ed="' + k + '"]');

    const keys = { left:false, right:false, up:false, down:false };
    let state = 'menu';
    let last = performance.now();
    let mute = false;

    const world = {
      z:0, x:0, vx:0, speed:0, day:1, dayTime:0, carsPassed:0, quota:20,
      qualified:false, score:0, totalCars:0, km:0, invuln:0, shake:0, flash:0,
      countT:0, countN:3, banner:'', bannerT:0, weather:'sun', mountainX:0,
      gen:null, segments:new Array(BUF), cars:[], flakes:[], particles:[], popups:[], clouds:[]
    };

    let best = 0;
    try { best = parseInt(localStorage.getItem('enduro-js-best') || '0', 10) || 0; } catch (e) {}

    const SFX = {
      ctx:null, eng:null, engG:null, filt:null,
      init() {
        if (this.ctx) return;
        const AC = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AC();
        this.filt = this.ctx.createBiquadFilter();
        this.filt.type = 'lowpass';
        this.filt.frequency.value = 420;
        this.engG = this.ctx.createGain();
        this.engG.gain.value = 0;
        this.eng = this.ctx.createOscillator();
        this.eng.type = 'sawtooth';
        this.eng.frequency.value = 50;
        this.eng.connect(this.filt);
        this.filt.connect(this.engG);
        this.engG.connect(this.ctx.destination);
        this.eng.start();
      },
      engine(speed) {
        if (!this.ctx || mute) { if (this.engG) this.engG.gain.value = 0; return; }
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const r = speed / MAX_SPEED;
        this.eng.frequency.value = 42 + r * 110 + Math.sin(performance.now() / 40) * 2;
        this.filt.frequency.value = 280 + r * 900;
        this.engG.gain.value = (state === 'playing' || state === 'countdown') ? 0.025 + r * 0.045 : 0.012;
      },
      beep(freq, dur, type, vol) {
        if (!this.ctx || mute) return;
        type = type || 'square'; vol = vol == null ? 0.08 : vol;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = type; o.frequency.value = freq;
        g.gain.setValueAtTime(vol, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
        o.connect(g); g.connect(this.ctx.destination);
        o.start(); o.stop(this.ctx.currentTime + dur);
      },
      crash() {
        if (!this.ctx || mute) return;
        const len = 0.28;
        const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * len, this.ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
        const src = this.ctx.createBufferSource(); src.buffer = buf;
        const f = this.ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 320;
        const g = this.ctx.createGain(); g.gain.value = 0.22;
        src.connect(f); f.connect(g); g.connect(this.ctx.destination); src.start();
        this.beep(90, 0.2, 'sawtooth', 0.06);
      },
      pass() { this.beep(520, 0.07, 'square', 0.05); this.beep(780, 0.09, 'square', 0.03); },
      qualify() { [440, 554, 659, 880].forEach((f, i) => setTimeout(() => this.beep(f, 0.15, 'square', 0.07), i * 120)); },
      gameover() { [392, 349, 311, 262].forEach((f, i) => setTimeout(() => this.beep(f, 0.22, 'sawtooth', 0.07), i * 180)); },
      tick() { this.beep(220, 0.08, 'square', 0.06); },
      go() { this.beep(660, 0.2, 'square', 0.08); }
    };

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const rand = (a, b) => a + Math.random() * (b - a);
    const choice = (arr) => arr[(Math.random() * arr.length) | 0];
    const parseColor = (c) => {
      if (Array.isArray(c)) return c;
      if (typeof c !== 'string') return [255, 255, 255];
      const s = c.trim();
      if (s[0] === '#') {
        let h = s.slice(1);
        if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        return [parseInt(h.slice(0, 2), 16) || 0, parseInt(h.slice(2, 4), 16) || 0, parseInt(h.slice(4, 6), 16) || 0];
      }
      const m = s.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
      if (m) return [+m[1], +m[2], +m[3]];
      return [255, 255, 255];
    };
    const rgb = (r, g, b, a) => a == null || a === 1 ? ('rgb(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ')') : ('rgba(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ',' + a + ')');
    const mixHex = (h1, h2, t) => {
      const a = parseColor(h1), b = parseColor(h2);
      return rgb(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t));
    };
    const fogMix = (col, fog, t) => {
      const a = parseColor(col);
      return rgb(lerp(a[0], fog[0], t), lerp(a[1], fog[1], t), lerp(a[2], fog[2], t));
    };
    function rumbleW(w, lanes) { return w / Math.max(6, 2 * lanes); }
    function laneW(w, lanes) { return w / Math.max(32, 8 * lanes); }
    function poly(x1, y1, x2, y2, x3, y3, x4, y4, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.lineTo(x4, y4);
      ctx.closePath(); ctx.fill();
    }
    function quotaFor(day) { return 18 + (day - 1) * 8; }
    function weatherFor(day) {
      return ['sun', 'sun', 'dusk', 'night', 'fog', 'snow', 'ice'][(day - 1) % 7];
    }
    function weatherName(w) {
      return { sun:'ENSOLARADO', dusk:'ENTARDECER', night:'NOITE', fog:'NEBLINA', snow:'NEVE', ice:'GELO' }[w] || w;
    }

    function resetGen() {
      world.gen = { index:0, curve:0, y:0, dy:0, left:0, targetCurve:0, targetDy:0 };
      world.segments = new Array(BUF);
      for (let i = 0; i < BUF; i++) generateSegment();
    }
    function nextSection() {
      const g = world.gen;
      g.left = 18 + (Math.random() * 70) | 0;
      const r = Math.random();
      if (r < 0.32) g.targetCurve = 0;
      else if (r < 0.55) g.targetCurve = 2.2 * (Math.random() < 0.5 ? 1 : -1);
      else if (r < 0.82) g.targetCurve = 4.2 * (Math.random() < 0.5 ? 1 : -1);
      else g.targetCurve = 6.4 * (Math.random() < 0.5 ? 1 : -1);
      g.targetDy = Math.random() < 0.42 ? 0 : (Math.random() - 0.5) * 18;
    }
    function generateSegment() {
      const g = world.gen;
      if (g.left <= 0) nextSection();
      g.left--;
      if (g.curve < g.targetCurve) g.curve = Math.min(g.targetCurve, g.curve + 0.18);
      else if (g.curve > g.targetCurve) g.curve = Math.max(g.targetCurve, g.curve - 0.18);
      if (g.dy < g.targetDy) g.dy = Math.min(g.targetDy, g.dy + 0.28);
      else if (g.dy > g.targetDy) g.dy = Math.max(g.targetDy, g.dy - 0.28);
      const p1y = g.y, p1z = g.index * SEGMENT_LENGTH;
      g.y += g.dy;
      const seg = {
        index: g.index, curve: g.curve,
        color: (Math.floor(g.index / RUMBLE) % 2) ? 'dark' : 'light',
        sprites: [],
        p1: { world:{ y:p1y, z:p1z }, camera:{}, screen:{} },
        p2: { world:{ y:g.y, z:(g.index + 1) * SEGMENT_LENGTH }, camera:{}, screen:{} }
      };
      if (Math.random() < 0.34) {
        const side = Math.random() < 0.5 ? -1 : 1;
        const kind = Math.random() < 0.7 ? 'tree' : (Math.random() < 0.5 ? 'rock' : 'bush');
        seg.sprites.push({ type: kind, offset: side * (1.35 + Math.random() * 1.6) });
      }
      if (Math.random() < 0.08) seg.sprites.push({ type:'tree', offset:(Math.random() < 0.5 ? -1 : 1) * (2.4 + Math.random()) });
      world.segments[g.index % BUF] = seg;
      g.index++;
      return seg;
    }
    function segAt(i) { return world.segments[((i % BUF) + BUF) % BUF]; }
    function findSeg(z) { return segAt(Math.floor(z / SEGMENT_LENGTH)); }
    function ensureRoad() {
      const need = Math.floor(world.z / SEGMENT_LENGTH) + DRAW_DISTANCE + 8;
      while (world.gen.index <= need) generateSegment();
    }
    function project(p, camX, camY, camZ) {
      p.camera.x = (p.world.x || 0) - camX;
      p.camera.y = (p.world.y || 0) - camY;
      p.camera.z = (p.world.z || 0) - camZ;
      if (p.camera.z === 0) p.camera.z = 0.0001;
      p.screen.scale = CAMERA_DEPTH / p.camera.z;
      p.screen.x = Math.round(W / 2 + p.screen.scale * p.camera.x * W / 2);
      p.screen.y = Math.round(H / 2 - p.screen.scale * p.camera.y * H / 2);
      p.screen.w = Math.round(p.screen.scale * ROAD_WIDTH * W / 2);
    }

    function carColor(i) {
      return ['#2d5be3', '#e3b02d', '#1aae5a', '#d42d7a', '#8b2de3', '#e35a2d', '#2db7e3', '#d0d0d0'][i % 8];
    }
    function spawnCars() {
      world.cars = [];
      const n = 12 + Math.min(10, world.day);
      for (let i = 0; i < n; i++) world.cars.push(makeCar(i, world.z + 1800 + i * (3800 - Math.min(1600, world.day * 80))));
    }
    function makeCar(i, z) {
      const off = choice([-0.62, -0.22, 0.22, 0.62]);
      return { z:z, offset:off, target:off, speed:MAX_SPEED * rand(0.32, 0.62), color:carColor(i), passed:false, w:0.28, laneT:rand(1, 5) };
    }
    function recycleCar(car) {
      car.z = world.z + rand(4200, 14000);
      car.offset = choice([-0.66, -0.22, 0.22, 0.66]);
      car.target = car.offset;
      car.speed = MAX_SPEED * rand(0.30, 0.64 + Math.min(0.12, world.day * 0.015));
      car.passed = false;
      car.color = carColor((Math.random() * 8) | 0);
    }

    const P = {
      dawn:  { sky1:'#1a1440', sky2:'#ff6b4a', sky3:'#ffd19a', roadL:'#6a6460', roadD:'#585250', grassL:'#3a6a38', grassD:'#2c542c', rumbleL:'#eeeeee', rumbleD:'#c42b2b', lane:'#dddddd', fog:[255,170,130], sun:'#ff9955' },
      day:   { sky1:'#1a5fbf', sky2:'#6ec4ef', sky3:'#c8e89a', roadL:'#6e6e6e', roadD:'#585858', grassL:'#3c9a3c', grassD:'#2e7c2e', rumbleL:'#eeeeee', rumbleD:'#c42b2b', lane:'#e8e8e8', fog:[170,200,220], sun:'#ffe566' },
      dusk:  { sky1:'#2a1048', sky2:'#ff7a3a', sky3:'#ffb070', roadL:'#5c5654', roadD:'#4a4442', grassL:'#2f6a32', grassD:'#245228', rumbleL:'#eeddcc', rumbleD:'#c42b2b', lane:'#ddccbb', fog:[255,140,90], sun:'#ff7722' },
      night: { sky1:'#02010a', sky2:'#0a1230', sky3:'#12182a', roadL:'#2a2a32', roadD:'#1c1c24', grassL:'#0e1e10', grassD:'#08140a', rumbleL:'#888899', rumbleD:'#801818', lane:'#666677', fog:[10,14,28], sun:'#e8e8ff' },
      fog:   { sky1:'#7a8894', sky2:'#b4c0c8', sky3:'#c8d0d4', roadL:'#6a6a6a', roadD:'#585858', grassL:'#6a7a62', grassD:'#586850', rumbleL:'#dddddd', rumbleD:'#aa4444', lane:'#cccccc', fog:[180,190,198], sun:'#ddddde' },
      snow:  { sky1:'#6aa0c8', sky2:'#d0e8f8', sky3:'#f2f7fb', roadL:'#5a5a62', roadD:'#484850', grassL:'#e8eef4', grassD:'#d0d8e0', rumbleL:'#ffffff', rumbleD:'#cc4444', lane:'#eeeeee', fog:[220,230,240], sun:'#fff6d0' },
      ice:   { sky1:'#3a5680', sky2:'#8ab0d0', sky3:'#c0d8e8', roadL:'#8aa0b4', roadD:'#6e8498', grassL:'#c8d4de', grassD:'#aebcc8', rumbleL:'#eeeeff', rumbleD:'#bb4444', lane:'#eef6ff', fog:[190,210,225], sun:'#eeeeff' }
    };
    function themeNow() {
      const w = world.weather;
      const t = clamp(world.dayTime / DAY_SECONDS, 0, 1);
      let base;
      if (w === 'fog' || w === 'snow' || w === 'ice') base = P[w];
      else if (w === 'night') base = t < 0.25 ? lerpTheme(P.dusk, P.night, t / 0.25) : P.night;
      else if (w === 'dusk') base = t < 0.45 ? lerpTheme(P.day, P.dusk, t / 0.45) : lerpTheme(P.dusk, P.night, clamp((t - 0.45) / 0.55, 0, 1));
      else {
        if (t < 0.12) base = lerpTheme(P.dawn, P.day, t / 0.12);
        else if (t < 0.55) base = P.day;
        else if (t < 0.72) base = lerpTheme(P.day, P.dusk, (t - 0.55) / 0.17);
        else base = lerpTheme(P.dusk, P.night, clamp((t - 0.72) / 0.22, 0, 1));
      }
      base = Object.assign({}, base);
      base.fogDensity = (w === 'fog') ? 0.82 : (w === 'night' || (t > 0.78 && w !== 'snow')) ? 0.45 : (w === 'snow' ? 0.35 : 0.18);
      base.slip = w === 'ice' ? 2.4 : 1;
      base.night = (w === 'night') || (t > 0.78 && w !== 'fog' && w !== 'snow' && w !== 'ice');
      base.vis = w === 'fog' ? 0.55 : 1;
      return base;
    }
    function lerpTheme(A, B, t) {
      const o = {};
      for (const k of Object.keys(A)) {
        if (typeof A[k] === 'string' && A[k][0] === '#') o[k] = mixHex(A[k], B[k], t);
        else if (Array.isArray(A[k])) o[k] = A[k].map((v, i) => lerp(v, B[k][i], t));
        else o[k] = B[k];
      }
      return o;
    }

    function resetRace(keepScore) {
      world.z = 0; world.x = 0; world.vx = 0; world.speed = 0;
      world.dayTime = 0; world.carsPassed = 0; world.qualified = false;
      world.invuln = 0; world.shake = 0; world.flash = 0;
      world.km = keepScore ? world.km : 0;
      world.quota = quotaFor(world.day);
      world.weather = weatherFor(world.day);
      world.banner = ''; world.bannerT = 0;
      world.particles = []; world.popups = [];
      world.flakes = [];
      for (let i = 0; i < 80; i++) world.flakes.push({ x:Math.random() * W, y:Math.random() * H, s:rand(1, 3), v:rand(40, 110), o:Math.random() * 6 });
      world.clouds = [];
      for (let i = 0; i < 6; i++) world.clouds.push({ x:rand(0, W), y:rand(20, 110), s:rand(0.6, 1.6), v:rand(4, 12) });
      resetGen();
      spawnCars();
      world.mountainX = 0;
    }
    function startGame() {
      SFX.init();
      world.day = 1; world.score = 0; world.totalCars = 0; world.km = 0;
      resetRace(false);
      state = 'countdown';
      world.countT = 0; world.countN = 3;
      SFX.tick();
      showHud(true);
      overlay.classList.add('hide');
    }
    function nextDay() {
      world.day++;
      world.score += 1000 + world.carsPassed * 20;
      resetRace(true);
      state = 'countdown';
      world.countT = 0; world.countN = 3;
      SFX.tick();
      overlay.classList.add('hide');
      showHud(true);
    }
    function gameOver() {
      state = 'gameover';
      SFX.gameover();
      if (world.score > best) {
        best = world.score;
        try { localStorage.setItem('enduro-js-best', String(best)); } catch (e) {}
      }
      showHud(true);
      overlay.classList.remove('hide');
      panel.innerHTML = '<h2 style="color:#ff3a00">FIM DE JOGO</h2>'
        + '<p style="color:#ffc14a">O sol se pôs...</p>'
        + '<p>Você não ultrapassou os ' + world.quota + ' carros do dia ' + world.day + '.</p>'
        + '<div class="grid"><div>Dia <b style="color:#ff6a00">' + world.day + '</b></div><div>Carros <b style="color:#ff6a00">' + world.totalCars + '</b></div>'
        + '<div>Pontos <b style="color:#ffc14a">' + world.score + '</b></div><div>Recorde <b style="color:#ffc14a">' + best + '</b></div></div>'
        + '<button class="ed-btn" data-act="start">TENTAR DE NOVO</button>'
        + '<button class="ed-btn alt" data-act="menu">MENU</button>';
    }
    function showHud(on) { hud.classList.toggle('on', on); }
    function menuHTML() {
      return '<h1>ENDURO</h1><p style="font-family:\'Press Start 2P\',cursive;font-size:8px;color:#ffc14a">HOMENAGEM AO CLÁSSICO ATARI</p>'
        + '<p>Ultrapasse os carros antes do anoitecer.<br>Cada dia a cota sobe e o clima piora.</p>'
        + '<button class="ed-btn" data-act="start">▶  CORRER</button>'
        + '<button class="ed-btn alt" data-act="howto">COMO JOGAR</button>'
        + '<p style="color:#ffc14a">RECORDE: ' + best + '</p>'
        + '<p style="color:rgba(255,255,255,.4);font-size:14px">↑ acelerar · ← → dirigir · ↓ frear</p>';
    }
    function howtoHTML() {
      return '<h2>COMO JOGAR</h2><ul>'
        + '<li>🎯 Ultrapasse a cota de carros antes do fim do dia.</li>'
        + '<li>🌅 O dia avança com o tempo — não perca velocidade.</li>'
        + '<li>🌿 Fora da pista você fica lento.</li>'
        + '<li>💥 Bater em outro carro te freia na hora.</li>'
        + '<li>🌫️ Neblina reduz a visão · ❄️ neve e gelo escorregam.</li>'
        + '<li>🌙 À noite, siga as lanternas vermelhas.</li>'
        + '<li>✅ Qualificando, você segue para o próximo dia.</li>'
        + '</ul><button class="ed-btn" data-act="start">CORRER</button>'
        + '<button class="ed-btn alt" data-act="menu">VOLTAR</button>';
    }
    function showMenu() {
      state = 'menu';
      overlay.classList.remove('hide');
      showHud(false);
      panel.innerHTML = menuHTML();
      if (!world.gen) resetRace(false);
      world.speed = MAX_SPEED * 0.48;
    }
    function showPause() {
      overlay.classList.remove('hide');
      panel.innerHTML = '<h2>PAUSA</h2><button class="ed-btn" data-act="resume">CONTINUAR</button><button class="ed-btn alt" data-act="menu">MENU</button>';
    }

    panel.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      SFX.init();
      const act = btn.getAttribute('data-act');
      if (act === 'start') startGame();
      if (act === 'howto') panel.innerHTML = howtoHTML();
      if (act === 'menu') showMenu();
      if (act === 'resume') { state = 'playing'; overlay.classList.add('hide'); }
      if (act === 'next') nextDay();
    });

    const mapKey = (k) => {
      k = k.toLowerCase();
      if (k === 'arrowleft' || k === 'a') return 'left';
      if (k === 'arrowright' || k === 'd') return 'right';
      if (k === 'arrowup' || k === 'w') return 'up';
      if (k === 'arrowdown' || k === 's') return 'down';
      return null;
    };
    window.addEventListener('keydown', (e) => {
      const k = mapKey(e.key);
      if (k) { keys[k] = true; e.preventDefault(); }
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        if (state === 'playing') { state = 'paused'; showPause(); }
        else if (state === 'paused') { state = 'playing'; overlay.classList.add('hide'); }
      }
      if (e.key === 'm' || e.key === 'M') toggleMute();
      if (e.key === 'Enter' && (state === 'menu' || state === 'gameover')) startGame();
    });
    window.addEventListener('keyup', (e) => {
      const k = mapKey(e.key);
      if (k) { keys[k] = false; e.preventDefault(); }
    });

    function bindHold(el, key) {
      const on = (e) => { e.preventDefault(); keys[key] = true; el.classList.add('held'); };
      const off = (e) => { e.preventDefault(); keys[key] = false; el.classList.remove('held'); };
      el.addEventListener('pointerdown', on);
      el.addEventListener('pointerup', off);
      el.addEventListener('pointercancel', off);
      el.addEventListener('pointerleave', off);
    }
    root.querySelectorAll('.ed-pad').forEach((b) => bindHold(b, b.getAttribute('data-key')));

    function toggleMute() {
      mute = !mute;
      $('mute').textContent = mute ? 'SOM: OFF' : 'SOM: ON';
      if (mute && SFX.engG) SFX.engG.gain.value = 0;
    }
    $('mute').addEventListener('click', toggleMute);
    $('fs').addEventListener('click', () => {
      if (!document.fullscreenElement) root.requestFullscreen?.();
      else document.exitFullscreen?.();
    });

    function update(dt) {
      ensureRoad();
      const demo = state === 'menu';
      const play = state === 'playing';
      const th = themeNow();

      if (state === 'countdown') {
        world.countT += dt;
        world.speed = Math.max(0, world.speed - DECEL * dt);
        if (world.countT > 0.8) {
          world.countT = 0;
          world.countN--;
          if (world.countN > 0) SFX.tick();
          else if (world.countN === 0) SFX.go();
          else state = 'playing';
        }
      }

      if (demo) {
        world.speed = MAX_SPEED * 0.5;
        const seg = findSeg(world.z);
        const sr = world.speed / MAX_SPEED;
        const turn = dt * 2.15 * (0.38 + 0.62 * sr);
        world.x += Math.sin(performance.now() / 900) * 0.25 * dt;
        world.x -= turn * sr * CENTRIFUGAL * (seg && seg.curve || 0);
        world.x += (0 - world.x) * 2.2 * dt;
        world.x = clamp(world.x, -1.1, 1.1);
      }

      if (play) {
        if (keys.up) world.speed += ACCEL * dt;
        else if (keys.down) world.speed -= BREAKING * dt;
        else world.speed -= DECEL * dt;

        const off = Math.abs(world.x) > 1;
        if (off) {
          if (world.speed > OFF_LIMIT) world.speed -= OFF_DECEL * dt;
          if (Math.random() < 0.6) {
            world.particles.push({ x:W / 2 + rand(-30, 30), y:H - 40, vx:rand(-40, 40), vy:rand(-30, -8), life:0.5, color:th.grassL });
          }
        }

        const ice = th.slip > 1.2;
        const speedRatio = world.speed / MAX_SPEED;
        const turn = dt * 2.15 * (0.38 + 0.62 * speedRatio);
        const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
        if (ice) {
          world.vx += dir * 2.4 * dt;
          world.vx *= Math.pow(0.18, dt);
          world.x += world.vx * dt + dir * turn * 0.35;
        } else {
          world.vx += dir * 8 * dt;
          world.vx *= Math.pow(0.002, dt);
          world.x += dir * turn;
        }
        const seg = findSeg(world.z + CAMERA_HEIGHT * CAMERA_DEPTH);
        const curve = seg ? seg.curve : 0;
        world.x -= turn * speedRatio * CENTRIFUGAL * curve * th.slip;
        world.x = clamp(world.x, -2, 2);

        world.invuln = Math.max(0, world.invuln - dt);
        world.dayTime += dt;
        const prog = world.dayTime / DAY_SECONDS;

        if (!world.qualified && world.carsPassed >= world.quota) {
          world.qualified = true;
          world.banner = 'COTA ATINGIDA!';
          world.bannerT = 2.4;
          SFX.qualify();
          world.score += 500;
        }
        if (prog >= 1) {
          if (world.qualified) {
            overlay.classList.remove('hide');
            panel.innerHTML = '<h2>DIA ' + world.day + ' COMPLETO</h2>'
              + '<p>Ultrapassagens: ' + world.carsPassed + '</p>'
              + '<p style="color:#ff6a00">Próximo: ' + weatherName(weatherFor(world.day + 1)) + ' · cota ' + quotaFor(world.day + 1) + '</p>'
              + '<button class="ed-btn" data-act="next">PRÓXIMO DIA</button>';
            state = 'dayend';
          } else gameOver();
        }
      }

      world.speed = clamp(world.speed, 0, MAX_SPEED);
      world.z += world.speed * dt;
      world.km += world.speed * dt * 0.00042;
      world.mountainX += (findSeg(world.z) && findSeg(world.z).curve || 0) * world.speed * dt * 0.00035;
      world.shake *= Math.pow(0.04, dt * 4);
      world.flash = Math.max(0, world.flash - dt * 3);
      world.bannerT = Math.max(0, world.bannerT - dt);

      for (let i = 0; i < world.cars.length; i++) {
        const c = world.cars[i];
        c.z += c.speed * dt;
        c.laneT -= dt;
        if (c.laneT < 0) { c.laneT = rand(2.5, 7); c.target = choice([-0.66, -0.22, 0.22, 0.66]); }
        c.offset += (c.target - c.offset) * 1.6 * dt;
        if (c.z < world.z - 800) recycleCar(c);
        if (!c.passed && c.z < world.z && (play || demo)) {
          if (play) {
            c.passed = true;
            world.carsPassed++; world.totalCars++; world.score += 100;
            SFX.pass();
            world.popups.push({ x:W / 2 + c.offset * 80, y:H - 120, t:0.8, text:'+1' });
          } else c.passed = true;
        }
        if (play && world.invuln <= 0) {
          const dz = c.z - world.z;
          if (dz > -140 && dz < 180 && Math.abs(c.offset - world.x) < 0.26) {
            world.speed *= 0.38;
            world.vx += (world.x < c.offset ? -1 : 1) * 0.9;
            world.invuln = 1.05; world.shake = 12; world.flash = 1;
            SFX.crash();
            if (navigator.vibrate) navigator.vibrate(90);
            world.banner = 'COLISÃO!'; world.bannerT = 0.8;
          }
        }
      }

      for (let i = world.particles.length - 1; i >= 0; i--) {
        const p = world.particles[i];
        p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 80 * dt;
        if (p.life <= 0) world.particles.splice(i, 1);
      }
      for (let i = world.popups.length - 1; i >= 0; i--) {
        world.popups[i].t -= dt; world.popups[i].y -= 40 * dt;
        if (world.popups[i].t <= 0) world.popups.splice(i, 1);
      }
      for (const f of world.flakes) {
        f.y += f.v * dt * (1 + world.speed / MAX_SPEED);
        f.x += Math.sin(f.o + performance.now() / 400) * 18 * dt;
        if (f.y > H) { f.y = -4; f.x = Math.random() * W; }
      }
      for (const c of world.clouds) {
        c.x -= c.v * dt + world.speed * 0.0008;
        if (c.x < -180) { c.x = W + 80; c.y = rand(20, 120); }
      }

      SFX.engine(world.speed);
      updateHud();
      const touchOn = state === 'playing' || state === 'countdown';
      root.querySelector('.ed-touch').style.visibility = touchOn ? 'visible' : 'hidden';
    }

    function updateHud() {
      if (!hud.classList.contains('on')) return;
      $('day').textContent = world.day;
      $('score').textContent = world.score;
      $('best').textContent = best;
      $('km').textContent = world.km.toFixed(1);
      const kmh = Math.round(world.speed / MAX_SPEED * 218);
      $('speed').textContent = kmh;
      $('spdbar').style.width = (world.speed / MAX_SPEED * 100) + '%';
      const prog = clamp(world.dayTime / DAY_SECONDS, 0, 1);
      $('daybar').style.width = (prog * 100) + '%';
      $('sundot').style.left = (prog * 100) + '%';
      $('weather').textContent = weatherName(world.weather);
      const q = $('quota');
      q.textContent = world.qualified ? ('OK  ' + world.carsPassed + ' CARROS') : (world.carsPassed + ' / ' + world.quota + ' CARROS');
      q.style.color = world.qualified ? '#5dff8a' : '#ffc14a';
      $('msg').textContent = world.bannerT > 0 ? world.banner : '';
    }

    function render() {
      const th = themeNow();
      const shx = (Math.random() - 0.5) * world.shake;
      const shy = (Math.random() - 0.5) * world.shake * 0.5;
      ctx.save();
      ctx.translate(shx, shy);
      drawSky(th);
      drawRoad(th);
      drawWeather(th);
      drawPlayer(th);
      ctx.restore();
      if (world.flash > 0) {
        ctx.fillStyle = rgb(180, 20, 10, world.flash * 0.35);
        ctx.fillRect(0, 0, W, H);
      }
      if (state === 'countdown') {
        ctx.fillStyle = 'rgba(0,0,0,.35)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ffc14a';
        ctx.font = '48px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(world.countN > 0 ? String(world.countN) : 'VAI!', W / 2, H / 2);
      }
      for (const p of world.popups) {
        ctx.globalAlpha = clamp(p.t * 2, 0, 1);
        ctx.fillStyle = '#5dff8a';
        ctx.font = '16px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(p.text, p.x, p.y);
        ctx.globalAlpha = 1;
      }
    }

    function drawSky(th) {
      const g = ctx.createLinearGradient(0, 0, 0, H * 0.55);
      g.addColorStop(0, th.sky1);
      g.addColorStop(0.55, th.sky2);
      g.addColorStop(1, th.sky3);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      const prog = clamp(world.dayTime / DAY_SECONDS, 0, 1);
      const sunX = lerp(W * 0.18, W * 0.86, prog) - world.mountainX * 0.15;
      const sunY = 40 + Math.sin(prog * Math.PI) * -8 + prog * prog * 90;
      ctx.fillStyle = th.sun;
      ctx.beginPath(); ctx.arc(sunX, sunY, th.night ? 14 : 22, 0, Math.PI * 2); ctx.fill();
      const sunRgb = parseColor(th.sun || '#ffe566');
      ctx.fillStyle = rgb(sunRgb[0], sunRgb[1], sunRgb[2], 0.18);
      ctx.beginPath(); ctx.arc(sunX, sunY, th.night ? 28 : 48, 0, Math.PI * 2); ctx.fill();
      if (!th.night && world.weather !== 'fog') {
        ctx.fillStyle = 'rgba(255,255,255,.55)';
        for (const c of world.clouds) cloud(c.x, c.y, c.s);
      }
      const mx = -world.mountainX % W;
      drawMountRange(mx, H * 0.42, 90, mixHex('#2a3344', th.sky1, 0.2), 1.0);
      drawMountRange(mx * 1.4 + 80, H * 0.45, 60, mixHex('#3a4a3a', th.sky3, 0.35), 0.75);
    }
    function cloud(x, y, s) {
      ctx.beginPath();
      ctx.ellipse(x, y, 38 * s, 14 * s, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 24 * s, y + 4 * s, 28 * s, 12 * s, 0, 0, Math.PI * 2);
      ctx.ellipse(x - 22 * s, y + 3 * s, 22 * s, 10 * s, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    function drawMountRange(ox, baseY, h, color, scale) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-40, H); ctx.lineTo(-40, baseY);
      for (let i = 0; i < 14; i++) {
        const x = ox + i * (W / 8) - W;
        const hh = h * (0.45 + Math.abs(Math.sin(i * 1.3 + scale)) * 0.7) * scale;
        ctx.lineTo(x + 40, baseY - hh);
        ctx.lineTo(x + 90, baseY - hh * 0.4);
      }
      ctx.lineTo(W + 40, baseY); ctx.lineTo(W + 40, H);
      ctx.closePath(); ctx.fill();
    }

    function drawRoad(th) {
      const baseZ = world.z;
      const playerZ = CAMERA_HEIGHT * CAMERA_DEPTH;
      const camZ = baseZ;
      const pSeg = findSeg(baseZ + playerZ);
      const pIdx = Math.floor((baseZ + playerZ) / SEGMENT_LENGTH);
      const camY = CAMERA_HEIGHT + ((pSeg && pSeg.index === pIdx) ? pSeg.p1.world.y : 0);
      const camX = world.x * ROAD_WIDTH;
      const baseSegI = Math.floor(baseZ / SEGMENT_LENGTH);
      const basePercent = (baseZ % SEGMENT_LENGTH) / SEGMENT_LENGTH;
      const startSeg = segAt(baseSegI);
      if (!startSeg) return;
      let x = 0;
      let dx = -(startSeg.curve * basePercent);
      let maxy = H;
      const drawN = Math.floor(DRAW_DISTANCE * th.vis);
      const projected = [];
      for (let n = 0; n < drawN; n++) {
        const seg = segAt(baseSegI + n);
        if (!seg || seg.index !== baseSegI + n) continue;
        project(seg.p1, camX - x, camY, camZ);
        project(seg.p2, camX - x - dx, camY, camZ);
        x += dx; dx += seg.curve;
        projected.push(seg);
      }
      for (let n = 0; n < projected.length; n++) {
        const seg = projected[n];
        const p1 = seg.p1.screen, p2 = seg.p2.screen;
        if (seg.p1.camera.z <= CAMERA_DEPTH) continue;
        if (p2.y >= p1.y) continue;
        if (p2.y >= maxy) continue;
        const fogT = Math.pow(n / drawN, 1.4) * th.fogDensity;
        const light = seg.color === 'light';
        const grass = fogMix(light ? th.grassL : th.grassD, th.fog, fogT);
        const road = fogMix(light ? th.roadL : th.roadD, th.fog, fogT);
        const rumble = fogMix(light ? th.rumbleL : th.rumbleD, th.fog, fogT);
        const lane = light ? fogMix(th.lane, th.fog, fogT) : null;
        ctx.fillStyle = grass;
        ctx.fillRect(0, p2.y, W, Math.max(1, p1.y - p2.y));
        const r1 = rumbleW(p1.w, LANES), r2 = rumbleW(p2.w, LANES);
        poly(p1.x - p1.w - r1, p1.y, p1.x - p1.w, p1.y, p2.x - p2.w, p2.y, p2.x - p2.w - r2, p2.y, rumble);
        poly(p1.x + p1.w + r1, p1.y, p1.x + p1.w, p1.y, p2.x + p2.w, p2.y, p2.x + p2.w + r2, p2.y, rumble);
        poly(p1.x - p1.w, p1.y, p1.x + p1.w, p1.y, p2.x + p2.w, p2.y, p2.x - p2.w, p2.y, road);
        if (lane) {
          const l1 = laneW(p1.w, LANES), l2 = laneW(p2.w, LANES);
          const lw1 = p1.w * 2 / LANES, lw2 = p2.w * 2 / LANES;
          let lx1 = p1.x - p1.w + lw1, lx2 = p2.x - p2.w + lw2;
          for (let laneI = 1; laneI < LANES; laneI++) {
            poly(lx1 - l1 / 2, p1.y, lx1 + l1 / 2, p1.y, lx2 + l2 / 2, p2.y, lx2 - l2 / 2, p2.y, lane);
            lx1 += lw1; lx2 += lw2;
          }
        }
        seg.clip = maxy;
        maxy = p2.y;
      }
      for (let n = projected.length - 1; n >= 0; n--) {
        const seg = projected[n];
        if (seg.p1.camera.z <= CAMERA_DEPTH) continue;
        const scale = seg.p1.screen.scale;
        const clip = seg.clip || H;
        for (const sp of seg.sprites) {
          const sx = seg.p1.screen.x + sp.offset * seg.p1.screen.w;
          const sprW = 700 * SPRITE_SCALE * scale * W / 2;
          drawProp(sp.type, sx, seg.p1.screen.y, sprW, clip);
        }
        for (const car of world.cars) {
          const ci = Math.floor(car.z / SEGMENT_LENGTH);
          if (ci !== seg.index) continue;
          const pct = (car.z % SEGMENT_LENGTH) / SEGMENT_LENGTH;
          const sx = lerp(seg.p1.screen.x, seg.p2.screen.x, pct) + car.offset * lerp(seg.p1.screen.w, seg.p2.screen.w, pct);
          const sy = lerp(seg.p1.screen.y, seg.p2.screen.y, pct);
          const sw = lerp(seg.p1.screen.w, seg.p2.screen.w, pct);
          const carW = sw * 0.30;
          if (carW < 1.5) continue;
          ctx.save();
          ctx.beginPath(); ctx.rect(0, 0, W, clip); ctx.clip();
          drawCar(sx, sy, carW, carW * 0.72, car.color, false, th.night, 0);
          ctx.restore();
        }
      }
      if (th.night) {
        ctx.fillStyle = 'rgba(0,0,10,0.32)';
        ctx.fillRect(0, 0, W, H);
        const hg = ctx.createRadialGradient(W / 2, H + 10, 30, W / 2, H - 90, 430);
        hg.addColorStop(0, 'rgba(255,230,160,0.22)');
        hg.addColorStop(0.4, 'rgba(255,210,120,0.06)');
        hg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.moveTo(W / 2 - 28, H);
        ctx.lineTo(W / 2 - 310, H * 0.38);
        ctx.lineTo(W / 2 + 310, H * 0.38);
        ctx.lineTo(W / 2 + 28, H);
        ctx.closePath(); ctx.fill();
      }
    }

    function drawProp(type, x, y, w, clip) {
      if (w < 2) return;
      ctx.save();
      ctx.beginPath(); ctx.rect(0, 0, W, clip); ctx.clip();
      const snow = world.weather === 'snow' || world.weather === 'ice';
      if (type === 'tree' || type === 'bush') {
        const h = type === 'bush' ? w * 1.1 : w * 2.2;
        if (type === 'tree') { ctx.fillStyle = '#5a3310'; ctx.fillRect(x - w * 0.08, y - h * 0.45, w * 0.16, h * 0.45); }
        ctx.fillStyle = snow ? '#eef4fa' : (type === 'bush' ? '#2d7a28' : '#1f6b24');
        ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x + w * 0.55, y - h * 0.28); ctx.lineTo(x - w * 0.55, y - h * 0.28); ctx.closePath(); ctx.fill();
        ctx.fillStyle = snow ? '#dfe8f0' : '#16551c';
        ctx.beginPath(); ctx.moveTo(x, y - h * 0.72); ctx.lineTo(x + w * 0.48, y); ctx.lineTo(x - w * 0.48, y); ctx.closePath(); ctx.fill();
      } else if (type === 'rock') {
        ctx.fillStyle = snow ? '#c8d0d8' : '#6a6460';
        ctx.beginPath(); ctx.moveTo(x - w * 0.4, y); ctx.lineTo(x - w * 0.15, y - w * 0.55); ctx.lineTo(x + w * 0.2, y - w * 0.4); ctx.lineTo(x + w * 0.42, y); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    }

    function drawCar(x, y, w, h, color, isPlayer, night, steer) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(steer * 0.12);
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath(); ctx.ellipse(0, h * 0.06, w * 0.48, h * 0.1, 0, 0, Math.PI * 2); ctx.fill();
      const dark = shade(color, -40);
      ctx.fillStyle = '#111';
      ctx.fillRect(-w * 0.46, -h * 0.22, w * 0.16, h * 0.28);
      ctx.fillRect(w * 0.30, -h * 0.22, w * 0.16, h * 0.28);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-w * 0.42, -h * 0.08);
      ctx.lineTo(-w * 0.34, -h * 0.55);
      ctx.lineTo(-w * 0.16, -h * 0.78);
      ctx.lineTo(w * 0.16, -h * 0.78);
      ctx.lineTo(w * 0.34, -h * 0.55);
      ctx.lineTo(w * 0.42, -h * 0.08);
      ctx.lineTo(w * 0.36, 0);
      ctx.lineTo(-w * 0.36, 0);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = dark;
      ctx.fillRect(-w * 0.18, -h * 0.74, w * 0.36, h * 0.22);
      ctx.fillStyle = night ? '#223' : '#7ec8e8';
      ctx.fillRect(-w * 0.14, -h * 0.70, w * 0.28, h * 0.16);
      if (isPlayer) { ctx.fillStyle = '#f2f2f2'; ctx.fillRect(-w * 0.06, -h * 0.55, w * 0.12, h * 0.48); }
      ctx.fillStyle = '#222';
      ctx.fillRect(-w * 0.38, -h * 0.1, w * 0.76, h * 0.1);
      if (isPlayer) {
        ctx.fillStyle = '#ffd36a';
        ctx.fillRect(-w * 0.34, -h * 0.08, w * 0.12, h * 0.06);
        ctx.fillRect(w * 0.22, -h * 0.08, w * 0.12, h * 0.06);
      }
      ctx.fillStyle = night || !isPlayer ? '#ff2a2a' : '#8a1010';
      ctx.fillRect(-w * 0.32, -h * 0.18, w * 0.1, h * 0.07);
      ctx.fillRect(w * 0.22, -h * 0.18, w * 0.1, h * 0.07);
      if (night && !isPlayer) {
        ctx.fillStyle = 'rgba(255,40,40,0.45)';
        ctx.beginPath(); ctx.arc(-w * 0.27, -h * 0.14, w * 0.12, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(w * 0.27, -h * 0.14, w * 0.12, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = dark;
      ctx.fillRect(-w * 0.28, -h * 0.82, w * 0.56, h * 0.06);
      ctx.restore();
    }
    function shade(hex, amt) {
      const c = parseColor(hex);
      return rgb(clamp(c[0] + amt, 0, 255), clamp(c[1] + amt, 0, 255), clamp(c[2] + amt, 0, 255));
    }
    function drawPlayer(th) {
      const bounce = (Math.abs(world.x) > 1 ? 3 : 1) * (world.speed / MAX_SPEED) * ((Math.random() * 2) | 0);
      const steer = clamp(world.vx * 1.8 + (keys.right ? 1 : 0) - (keys.left ? 1 : 0), -1.5, 1.5);
      if (world.invuln > 0 && Math.floor(world.invuln * 20) % 2 === 0) return;
      drawCar(W / 2, H - 18 - bounce, 92, 68, '#d42018', true, th.night, steer);
    }
    function drawWeather() {
      if (world.weather === 'snow' || world.weather === 'ice') {
        ctx.fillStyle = '#fff';
        for (const f of world.flakes) {
          ctx.globalAlpha = 0.55 + f.s * 0.1;
          ctx.fillRect(f.x, f.y, f.s, f.s * 1.6);
        }
        ctx.globalAlpha = 1;
      }
      if (world.weather === 'fog') {
        const fg = ctx.createLinearGradient(0, H * 0.25, 0, H * 0.7);
        fg.addColorStop(0, 'rgba(190,198,205,0.55)');
        fg.addColorStop(1, 'rgba(190,198,205,0)');
        ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H * 0.7);
      }
      for (const p of world.particles) {
        ctx.globalAlpha = clamp(p.life * 2, 0, 1);
        ctx.fillStyle = p.color || '#c8b070';
        ctx.fillRect(p.x, p.y, 3, 3);
      }
      ctx.globalAlpha = 1;
    }

    function fit() {
      const r = screenEl.getBoundingClientRect();
      const aspect = W / H;
      let cw = r.width, ch = r.height;
      if (!cw || !ch) return;
      if (cw / ch > aspect) cw = ch * aspect; else ch = cw / aspect;
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
    }
    window.addEventListener('resize', fit);
    new ResizeObserver(fit).observe(root);
    fit();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && state === 'playing') { state = 'paused'; showPause(); }
    });

    function frame(now) {
      requestAnimationFrame(frame);
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.05) dt = 0.05;
      if (state !== 'paused' && state !== 'gameover' && state !== 'dayend') update(dt);
      else SFX.engine(0);
      render();
    }

    showMenu();
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

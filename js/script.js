/* ==========================================================================
   ANEYA ✦ CHAPTER 19 — ADVANCE CELEBRATION SCRIPT
   Aesthetic Minimal Logic • Web Audio Ambient Synth • Moodboard & Cinema
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. DATA & CONSTANTS
  // ==========================================
  // Universal Date constructor: Year, Month (0-indexed: 10 = Nov), Day, Hour, Min, Sec
  const TARGET_BIRTHDAY = new Date(2026, 10, 12, 0, 0, 0); // 19th Birthday: Nov 12, 2026

  // Affection Capsule Whispers
  const WHISPERS = [
    "“You are the softest, most peaceful part of my everyday life, my Vavee.”",
    "“Two days early, but my heart wanted to remind you: you are deeply cherished, Vavee.”",
    "“Every memory with my Vavee is tucked away safely as my greatest treasure.”",
    "“Vavee's smile is my favorite view in this entire world.”",
    "“I would choose you in every lifetime, over and over again, Vavee.”",
    "“You make turning 19 look like pure, effortless magic, my Vavee.”",
    "“Thank you for being the sunshine on my cloudiest days, my sweet Vavee.”"
  ];

  // Keepsake Gifts
  const GIFTS = {
    gift1: {
      emoji: "🎟️",
      title: "The Golden Day Pass for Vavee",
      text: "Grants Vavee full authority over our next date. Any restaurant, any treats, any shopping spree—I will happily say 'yes' to everything you desire!"
    },
    gift2: {
      emoji: "🫂",
      title: "Lifetime Warmth & Kisses",
      text: "An unlimited lifetime reservation for warm, tight hugs and sweet forehead kisses. Redeemable anytime, anywhere, with zero expiration date."
    },
    gift3: {
      emoji: "🤍",
      title: "My Entire Heart Forever",
      text: "Unconditional devotion, loyalty, and affection. Always by Vavee's side to protect your peace, celebrate your victories, and love you gently."
    }
  };

  // ==========================================
  // 2. WEB AUDIO AMBIENT SYNTHESIZER
  // ==========================================
  let audioCtx = null;
  let isMuted = false;
  let isMelodyPlaying = false;
  let melodyTimer = null;

  function initAudio() {
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          audioCtx = new AudioContext();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn("Audio Context init suppressed:", e);
    }
  }

  // Soft Celesta / Music-Box Note
  function playNote(freq, duration = 0.8, gainLevel = 0.09) {
    if (isMuted || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // Sound: Stardust Chime
  function playChime() {
    initAudio();
    const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chord.forEach((f, i) => {
      setTimeout(() => playNote(f, 1.2, 0.08), i * 110);
    });
  }

  // Sound: Gentle Ceramic Click / Pop
  function playSoftClick() {
    initAudio();
    if (isMuted || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  // Sound: Candle Breath Whoosh
  function playBreathSound() {
    initAudio();
    if (isMuted || !audioCtx) return;
    try {
      const bufferSize = audioCtx.sampleRate * 0.5;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(160, audioCtx.currentTime + 0.5);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();
    } catch (e) {}
  }

  // Sound: Soft Heartbeat Resonance
  function playHeartbeat() {
    initAudio();
    if (isMuted || !audioCtx) return;
    playNote(65, 0.22, 0.2);
    setTimeout(() => playNote(55, 0.28, 0.16), 180);
  }

  // Romantic Lofi Chord Progression (Happy Birthday in C Major Motif)
  const MELODY_SEQUENCE = [
    { n: 261.63, d: 400 }, { n: 261.63, d: 400 }, { n: 293.66, d: 800 }, { n: 261.63, d: 800 }, { n: 349.23, d: 800 }, { n: 329.63, d: 1400 },
    { n: 261.63, d: 400 }, { n: 261.63, d: 400 }, { n: 293.66, d: 800 }, { n: 261.63, d: 800 }, { n: 392.00, d: 800 }, { n: 349.23, d: 1400 },
    { n: 261.63, d: 400 }, { n: 261.63, d: 400 }, { n: 523.25, d: 800 }, { n: 440.00, d: 800 }, { n: 349.23, d: 800 }, { n: 329.63, d: 800 }, { n: 293.66, d: 1100 },
    { n: 466.16, d: 400 }, { n: 466.16, d: 400 }, { n: 440.00, d: 800 }, { n: 349.23, d: 800 }, { n: 392.00, d: 800 }, { n: 349.23, d: 1500 }
  ];

  let seqIdx = 0;
  function runMelodyLoop() {
    if (!isMelodyPlaying) return;
    if (isMuted) {
      melodyTimer = setTimeout(runMelodyLoop, 900);
      return;
    }
    const current = MELODY_SEQUENCE[seqIdx];
    playNote(current.n, (current.d / 1000) * 0.95, 0.08);

    seqIdx = (seqIdx + 1) % MELODY_SEQUENCE.length;
    melodyTimer = setTimeout(runMelodyLoop, current.d + 100);
  }

  function toggleMelody() {
    isMelodyPlaying = !isMelodyPlaying;
    const disc = document.getElementById('music-disc');
    const playIcon = document.getElementById('play-icon');
    const stateText = document.getElementById('music-state-text');

    if (isMelodyPlaying) {
      initAudio();
      disc.classList.remove('paused');
      playIcon.textContent = '❚❚';
      stateText.textContent = 'Melody: Playing';
      runMelodyLoop();
    } else {
      clearTimeout(melodyTimer);
      disc.classList.add('paused');
      playIcon.textContent = '▶';
      stateText.textContent = 'Melody: Paused';
    }
  }

  document.getElementById('music-toggle').addEventListener('click', toggleMelody);

  // Sound FX Toggle
  const soundToggle = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  soundToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    soundIcon.textContent = isMuted ? '🔇' : '🔊';
    if (!isMuted) playSoftClick();
  });

  // ==========================================
  // 3. EDITORIAL ENTRANCE (WAX SEAL MODAL)
  // ==========================================
  const entranceModal = document.getElementById('entrance-modal');
  const openExpBtn = document.getElementById('open-experience-btn');
  const envTrigger = document.getElementById('envelope-trigger');
  const mainContent = document.getElementById('main-content');

  function openCelebrationExperience(e) {
    if (e && e.type === 'touchstart') {
      e.preventDefault();
    }
    
    // Always hide modal and show main content first
    entranceModal.classList.add('hidden');
    mainContent.classList.add('visible');

    // Remove from layout after fade-out transition so it can never block touches
    setTimeout(() => {
      entranceModal.style.display = 'none';
    }, 850);

    // Audio & Particle FX safely isolated in try-catch
    try {
      initAudio();
      playChime();
    } catch (err) {
      console.warn("Audio setup warning:", err);
    }

    try {
      triggerGoldDust(60);
      spawnDelicatePetals(12);
    } catch (err) {}

    // Start background acoustic melody
    try {
      isMelodyPlaying = true;
      runMelodyLoop();
    } catch (err) {}
  }

  openExpBtn.addEventListener('click', openCelebrationExperience);
  openExpBtn.addEventListener('touchend', openCelebrationExperience);
  envTrigger.addEventListener('click', openCelebrationExperience);
  envTrigger.addEventListener('touchend', openCelebrationExperience);

  // ==========================================
  // 4. LIVE MINIMAL COUNTDOWN TIMER
  // ==========================================
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownStatusEl = document.getElementById('countdown-status-text');

  function updateCountdown() {
    const now = new Date();
    const diff = TARGET_BIRTHDAY - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      countdownStatusEl.innerHTML = "✦ <b>HAPPY 19TH BIRTHDAY, VAVEE! TODAY IS YOUR DAY.</b> ✦";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Celebrate in Advance Button
  document.getElementById('btn-celebrate-early').addEventListener('click', () => {
    playChime();
    triggerGoldDust(100);
    spawnDelicatePetals(18);
    showMinimalToast("✦ Advance Celebration Mode: Forever Cherished, my Vavee 🤍");
  });

  // ==========================================
  // 5. MINIMAL CANDLE CEREMONY (CHAPTER 19)
  // ==========================================
  const flame1 = document.getElementById('flame-1');
  const flame2 = document.getElementById('flame-2');
  const blowBtn = document.getElementById('blow-candles-btn');
  const relightBtn = document.getElementById('relight-candles-btn');
  const wishReveal = document.getElementById('wish-reveal-card');

  let candleExtinguished = false;

  function extinguishCandles() {
    if (candleExtinguished) return;
    candleExtinguished = true;

    playBreathSound();

    flame1.classList.add('extinguished');
    flame2.classList.add('extinguished');

    setTimeout(() => {
      playChime();
      triggerGoldDust(120);
      spawnDelicatePetals(15);
      wishReveal.classList.add('revealed');
      blowBtn.style.display = 'none';
      relightBtn.style.display = 'inline-block';
    }, 450);
  }

  function relightCandles() {
    candleExtinguished = false;
    playSoftClick();
    flame1.classList.remove('extinguished');
    flame2.classList.remove('extinguished');
    wishReveal.classList.remove('revealed');
    relightBtn.style.display = 'none';
    blowBtn.style.display = 'inline-flex';
  }

  blowBtn.addEventListener('click', extinguishCandles);
  flame1.addEventListener('click', extinguishCandles);
  flame2.addEventListener('click', extinguishCandles);
  relightBtn.addEventListener('click', relightCandles);

  // ==========================================
  // 6. MOODBOARD MEMORY ARCHIVE & LIGHTBOX
  // ==========================================
  const moodboardItems = document.querySelectorAll('.moodboard-item');
  const photoLightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxHeartBtn = document.getElementById('lightbox-heart-btn');

  moodboardItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.heart-pill-btn')) {
        playSoftClick();
        const touchX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
        const touchY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);
        spawnHeartBubble(touchX, touchY);
        return;
      }

      const photoSrc = item.getAttribute('data-photo');
      const title = item.getAttribute('data-title');
      const note = item.getAttribute('data-note');

      lightboxImg.src = photoSrc;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = note;

      photoLightbox.classList.add('active');
      playSoftClick();
    });
  });

  lightboxClose.addEventListener('click', () => {
    photoLightbox.classList.remove('active');
  });

  photoLightbox.addEventListener('click', (e) => {
    if (e.target === photoLightbox || e.target.classList.contains('lightbox-bg')) {
      photoLightbox.classList.remove('active');
    }
  });

  lightboxHeartBtn.addEventListener('click', (e) => {
    playChime();
    triggerGoldDust(60);
    const originX = e.clientX || window.innerWidth / 2;
    const originY = e.clientY || window.innerHeight / 2;
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        spawnHeartBubble(
          originX + (Math.random() * 80 - 40),
          originY + (Math.random() * 80 - 40)
        );
      }, i * 60);
    }
  });

  // ==========================================
  // 7. CINEMA FILM REELS (3 VIDEOS)
  // ==========================================
  function setupCinemaReel(vidId, overlayId) {
    const video = document.getElementById(vidId);
    const overlay = document.getElementById(overlayId);
    if (!video || !overlay) return;

    function handleTogglePlay(e) {
      if (e) e.stopPropagation();
      initAudio();

      if (video.paused) {
        // Pause all other video elements
        document.querySelectorAll('video').forEach(v => {
          if (v !== video) {
            v.pause();
            const parent = v.closest('.cinema-viewport');
            if (parent) {
              const ov = parent.querySelector('.cinema-overlay');
              if (ov) ov.classList.remove('playing');
            }
          }
        });

        // Safe mobile video play with fallback to muted play if needed
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              overlay.classList.add('playing');
            })
            .catch(() => {
              // If unmuted autoplay blocked on mobile, mute and play safely
              video.muted = true;
              const retryPromise = video.play();
              if (retryPromise !== undefined) {
                retryPromise
                  .then(() => overlay.classList.add('playing'))
                  .catch(() => {});
              }
            });
        }
      } else {
        video.pause();
        overlay.classList.remove('playing');
      }
    }

    overlay.addEventListener('click', handleTogglePlay);
    video.addEventListener('click', handleTogglePlay);
    video.addEventListener('ended', () => {
      overlay.classList.remove('playing');
    });
  }

  setupCinemaReel('vid1', 'overlay-vid1');
  setupCinemaReel('vid2', 'overlay-vid2');
  setupCinemaReel('vid3', 'overlay-vid3');

  // Mute / Unmute for Reels
  document.querySelectorAll('.cinema-audio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const vid = document.getElementById(targetId);
      if (vid) {
        vid.muted = !vid.muted;
        btn.textContent = vid.muted ? '🔇' : '🔊';
        playSoftClick();
      }
    });
  });

  // ==========================================
  // 8. INTERACTIVE LOUNGE (MINIMAL & CUTE)
  // ==========================================
  // Card 1: Cuteness Meter
  const runCutenessBtn = document.getElementById('run-cuteness-btn');
  const cutenessFill = document.getElementById('cuteness-fill');
  const cutenessNum = document.getElementById('cuteness-num');
  const meterLog = document.getElementById('meter-log');

  runCutenessBtn.addEventListener('click', () => {
    initAudio();
    playSoftClick();
    runCutenessBtn.disabled = true;
    meterLog.textContent = "Scanning sunlit smile & dimple frequency... ✦";
    cutenessFill.style.width = '0%';
    cutenessNum.textContent = '0%';

    let val = 0;
    const meterInterval = setInterval(() => {
      val += 5;
      if (val <= 100) {
        cutenessFill.style.width = `${val}%`;
        cutenessNum.textContent = `${val}%`;
        playNote(180 + val * 6, 0.05, 0.04);

        if (val === 40) meterLog.textContent = "Measuring Vavee's natural elegance & laugh... 🌸";
        if (val === 75) meterLog.textContent = "Analyzing auto-ride cheekiness quotient... 🚕";
        if (val === 95) meterLog.textContent = "Reaching maximum capacity... ✦";
      } else {
        clearInterval(meterInterval);
        cutenessNum.textContent = '9999% ✧';
        cutenessFill.style.width = '100%';
        meterLog.innerHTML = "✦ <b>RESONANCE OVERLOAD!</b> Vavee's natural charm exceeds all measurable limits. Pure magic. 🤍";
        playChime();
        triggerGoldDust(80);
        runCutenessBtn.disabled = false;
      }
    }, 60);
  });

  // Card 2: Affection Capsule Whispers
  const whisperBox = document.getElementById('whisper-box');
  const nextWhisperBtn = document.getElementById('next-whisper-btn');
  let whisperIdx = 0;

  nextWhisperBtn.addEventListener('click', () => {
    playSoftClick();
    whisperIdx = (whisperIdx + 1) % WHISPERS.length;
    whisperBox.style.opacity = '0';
    setTimeout(() => {
      whisperBox.innerHTML = `<span class="whisper-quote">${WHISPERS[whisperIdx]}</span>`;
      whisperBox.style.opacity = '1';
    }, 200);
  });

  // Card 3: Keepsake Boxes
  const giftCapsules = document.querySelectorAll('.gift-capsule');
  const giftModal = document.getElementById('gift-modal');
  const giftEmoji = document.getElementById('gift-emoji');
  const giftTitle = document.getElementById('gift-title');
  const giftText = document.getElementById('gift-text');
  const closeGiftBtn = document.getElementById('close-gift-btn');

  giftCapsules.forEach(cap => {
    cap.addEventListener('click', () => {
      const key = cap.getAttribute('data-gift');
      const data = GIFTS[key];

      playChime();
      triggerGoldDust(70);

      giftEmoji.textContent = data.emoji;
      giftTitle.textContent = data.title;
      giftText.textContent = data.text;

      giftModal.classList.add('active');
    });
  });

  closeGiftBtn.addEventListener('click', () => giftModal.classList.remove('active'));
  giftModal.addEventListener('click', (e) => {
    if (e.target === giftModal) giftModal.classList.remove('active');
  });

  // ==========================================
  // 10. VIRTUAL WARM HUG (TOUCH & HOLD)
  // ==========================================
  const hugBtn = document.getElementById('hug-btn');
  const hugStatus = document.getElementById('hug-status');
  let hugTimer = null;
  let hugScore = 0;

  function handleHugStart() {
    initAudio();
    hugScore = 0;
    hugStatus.textContent = "Holding Vavee gently... feel the warmth 🤍";
    document.body.style.filter = "brightness(1.03) contrast(0.98)";

    playHeartbeat();
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try { navigator.vibrate([80, 50, 80]); } catch (e) {}
    }

    hugTimer = setInterval(() => {
      hugScore += 20;
      playHeartbeat();
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try { navigator.vibrate(50); } catch (e) {}
      }

      if (hugScore >= 100) {
        clearInterval(hugTimer);
        hugStatus.innerHTML = "✦ <b>EMBRACE COMPLETE:</b> Wrapped in all my love, always, Vavee 🤍";
        playChime();
        triggerGoldDust(90);
        spawnDelicatePetals(14);
        document.body.style.filter = "none";
      } else {
        hugStatus.textContent = `Embracing Vavee... ${hugScore}% warm 🤍`;
      }
    }, 380);
  }

  function handleHugEnd() {
    clearInterval(hugTimer);
    document.body.style.filter = "none";
    if (hugScore < 100) {
      hugStatus.textContent = "Hold a little longer for the complete embrace, Vavee... 🤍";
    }
  }

  hugBtn.addEventListener('mousedown', handleHugStart);
  hugBtn.addEventListener('mouseup', handleHugEnd);
  hugBtn.addEventListener('mouseleave', handleHugEnd);

  hugBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleHugStart();
  }, { passive: false });
  hugBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    handleHugEnd();
  }, { passive: false });
  hugBtn.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    handleHugEnd();
  }, { passive: false });

  // ==========================================
  // 11. GOLD DUST & DELICATE PETALS CANVAS
  // ==========================================
  const confettiCanvas = document.getElementById('confetti-canvas');
  const ctx = confettiCanvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const DUST_COLORS = ['#C5A059', '#D47984', '#F4E8D2', '#FFFDF9', '#E8B4B8'];

  class AestheticParticle {
    constructor() {
      this.x = window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 0.75;
      this.y = window.innerHeight * 0.58;
      this.size = Math.random() * 6 + 3;
      this.color = DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)];
      this.vx = (Math.random() - 0.5) * 12;
      this.vy = -(Math.random() * 12 + 6);
      this.gravity = 0.32;
      this.opacity = 1;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 4;
      this.isPetal = Math.random() > 0.4;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.rotation += this.rotSpeed;
      this.opacity -= 0.009;
    }

    draw(c) {
      if (this.opacity <= 0) return;
      c.save();
      c.globalAlpha = Math.max(0, this.opacity);
      c.translate(this.x, this.y);
      c.rotate((this.rotation * Math.PI) / 180);
      c.fillStyle = this.color;

      if (this.isPetal) {
        c.beginPath();
        c.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
        c.fill();
      } else {
        c.beginPath();
        c.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        c.fill();
      }
      c.restore();
    }
  }

  function triggerGoldDust(count = 70) {
    for (let i = 0; i < count; i++) {
      particles.push(new AestheticParticle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.opacity <= 0 || p.y > confettiCanvas.height + 50) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Floating Petals Toggle
  let petalsActive = true;
  document.getElementById('hearts-toggle').addEventListener('click', () => {
    petalsActive = !petalsActive;
    showMinimalToast(petalsActive ? "🌸 Soft Petals Enabled" : "Petals Paused");
  });

  function spawnDelicatePetals(num = 8) {
    if (!petalsActive) return;
    for (let i = 0; i < num; i++) {
      setTimeout(() => {
        spawnHeartBubble(Math.random() * window.innerWidth, window.innerHeight + 15);
      }, i * 160);
    }
  }

  function spawnHeartBubble(x, y) {
    const bubble = document.createElement('div');
    bubble.textContent = ['🤍', '🌸', '✦', '✧', '🤍'][Math.floor(Math.random() * 5)];
    bubble.style.position = 'fixed';
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    bubble.style.fontSize = `${Math.random() * 0.8 + 1}rem`;
    bubble.style.pointerEvents = 'none';
    bubble.style.zIndex = '9999';
    bubble.style.transition = 'transform 2.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 2.4s ease-out';
    document.body.appendChild(bubble);

    requestAnimationFrame(() => {
      const driftX = (Math.random() - 0.5) * 90;
      bubble.style.transform = `translate(${driftX}px, -220px) scale(1.1)`;
      bubble.style.opacity = '0';
    });

    setTimeout(() => bubble.remove(), 2400);
  }

  // Periodic ambient petals
  setInterval(() => {
    if (petalsActive && mainContent.classList.contains('visible')) {
      spawnHeartBubble(Math.random() * window.innerWidth, window.innerHeight + 10);
    }
  }, 4200);

  // Subtle Sparkle Trail on Mouse & Touch Move
  function spawnCursorSparkle(clientX, clientY) {
    if (Math.random() > 0.82) {
      const dot = document.createElement('div');
      dot.style.position = 'fixed';
      dot.style.left = `${clientX}px`;
      dot.style.top = `${clientY}px`;
      dot.style.width = '4px';
      dot.style.height = '4px';
      dot.style.borderRadius = '50%';
      dot.style.background = '#C5A059';
      dot.style.boxShadow = '0 0 6px rgba(197, 160, 89, 0.6)';
      dot.style.pointerEvents = 'none';
      dot.style.zIndex = '9999';
      dot.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
      document.body.appendChild(dot);

      requestAnimationFrame(() => {
        dot.style.transform = `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px) scale(0)`;
        dot.style.opacity = '0';
      });

      setTimeout(() => dot.remove(), 800);
    }
  }

  window.addEventListener('mousemove', (e) => spawnCursorSparkle(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      spawnCursorSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // Scroll to Top
  document.getElementById('scroll-top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSoftClick();
  });

  // Minimal Toast
  function showMinimalToast(text) {
    const toast = document.createElement('div');
    toast.innerHTML = text;
    toast.style.position = 'fixed';
    toast.style.bottom = '28px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.background = 'rgba(45, 36, 38, 0.92)';
    toast.style.backdropFilter = 'blur(12px)';
    toast.style.color = '#FFFDF9';
    toast.style.padding = '10px 22px';
    toast.style.borderRadius = '999px';
    toast.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.18)';
    toast.style.fontSize = '0.84rem';
    toast.style.fontWeight = '500';
    toast.style.zIndex = '100000';
    toast.style.transition = 'all 0.3s ease';
    toast.style.textAlign = 'center';
    toast.style.maxWidth = '90vw';
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 350);
    }, 2600);
  }
});

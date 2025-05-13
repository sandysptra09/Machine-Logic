let fadeInterval: NodeJS.Timeout | null = null;

declare global {
  interface Window {
    __GLOBAL_SOUNDS__?: { [key: string]: HTMLAudioElement };
  }
}

// get global sounds
function getGlobalSounds() {
  if (typeof window === "undefined") return {};

  if (!window.__GLOBAL_SOUNDS__) {
    window.__GLOBAL_SOUNDS__ = {
      spin: new Audio('/assets/sounds/wheel.wav'),
      win: new Audio('/assets/sounds/win.wav'),
      lose: new Audio('/assets/sounds/lose.mp3'),
      doorOpen: new Audio('/assets/sounds/doorOpened.mp3'),
      doorLocked: new Audio('/assets/sounds/doorLocked.mp3'),
      bgm: new Audio('/assets/sounds/bgm.mp3'),
    };

    const bgm = window.__GLOBAL_SOUNDS__.bgm;
    bgm.loop = true;
    bgm.volume = 0;
  }

  return window.__GLOBAL_SOUNDS__;
}

// fade in
function fadeIn(audio: HTMLAudioElement, targetVolume: number = 0.1, duration: number = 2000) {
  if (fadeInterval) clearInterval(fadeInterval);

  const steps = 20;
  const stepTime = duration / steps;
  const volumeStep = targetVolume / steps;

  audio.volume = 0;
  let currentStep = 0;

  fadeInterval = setInterval(() => {
    if (currentStep >= steps) {
      clearInterval(fadeInterval!);
      fadeInterval = null;
      return;
    }

    audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
    currentStep++;
  }, stepTime);
}

// play sound
export const playSound = (key: keyof ReturnType<typeof getGlobalSounds>) => {
  if (typeof window === "undefined") return;

  const sounds = getGlobalSounds();
  const sound = sounds[key];
  if (!sound) return;

  if (key === 'bgm') {
    if (sound.paused) {
      sound.play().then(() => {
        fadeIn(sound);
      });
    }
    return;
  }

  sound.currentTime = 0;
  sound.play();
};

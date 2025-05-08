let sounds: { [key: string]: HTMLAudioElement } = {};

if (typeof window !== "undefined") {
  sounds = {
    spin: new Audio('/assets/sounds/wheel.wav'),
    win: new Audio('/assets/sounds/win.wav'),
    lose: new Audio('/assets/sounds/lose.mp3'),
  };
}

export const playSound = (key: 'spin' | 'win' | 'lose') => {
  if (typeof window === "undefined") return; // Pastikan kode hanya dijalankan di browser
  const sound = sounds[key];
  if (!sound) return;
  sound.currentTime = 0; 
  sound.play();
};

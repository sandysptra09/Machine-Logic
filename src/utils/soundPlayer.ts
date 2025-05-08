let sounds: { [key: string]: HTMLAudioElement } = {};

// check if the code is running in a browser environment before creating audio objects
if (typeof window !== "undefined") {
  sounds = {
    spin: new Audio('/assets/sounds/wheel.wav'),
    win: new Audio('/assets/sounds/win.wav'),
    lose: new Audio('/assets/sounds/lose.mp3'),
  };
}

// function to play sound based on the key provided
export const playSound = (key: 'spin' | 'win' | 'lose') => {
  if (typeof window === "undefined") return; // Pastikan kode hanya dijalankan di browser
  const sound = sounds[key];
  if (!sound) return;
  sound.currentTime = 0; 
  sound.play();
};

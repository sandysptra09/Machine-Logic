export const playSound = (type: 'spin' | 'win' | 'lose') => {
    try {
      const sounds = {
        spin: '/sounds/spin.mp3', // File lokal di public/sounds/
        win: '/sounds/win.mp3',
        lose: '/sounds/lose.mp3'
      };
      const audio = new Audio(sounds[type]);
      audio.play().catch(e => console.log("Audio error:", e));
    } catch (e) {
      console.log("Sound error:", e);
    }
  };
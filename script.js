function playElectronicSound() {
        // 1. Initialize the browser's audio engine
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();

        // 2. Create the tone generator (Oscillator)
        const oscillator = audioCtx.createOscillator();
        
        // 3. Create a volume controller (Gain node) to prevent harsh popping
        const gainNode = audioCtx.createGain();

        // 4. Configure the electronic waveform style
        // Options: 'sine' (pure beep), 'square' (retro 8-bit), 'sawtooth', 'triangle'
        oscillator.type = 'square'; 
        
        // Set pitch frequency in Hertz (Hz)
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 

        // 5. Configure the duration/fade out
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime); // Master volume at 30%
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15); // Fade out over 0.15 seconds

        // 6. Connect the chain: Oscillator -> Volume -> Speakers
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // 7. Start and stop the wave generation
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.15);
    }

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Audio, AudioSource } from 'expo-audio';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  image: string;
  uri: string;
  duration: number;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  position: number;
  duration: number;
  queue: Track[];
  currentIndex: number;

  // Actions
  playTrack: (track: Track) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  stop: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  skipNext: () => Promise<void>;
  skipPrevious: () => Promise<void>;
  addToQueue: (tracks: Track[]) => void;
  removeFromQueue: (index: number) => void;
  setRepeat: (mode: 'off' | 'all' | 'one') => void;
  setShuffle: (enabled: boolean) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

// Sample tracks with audio URLs from various free sources
const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Forest Lullaby',
    artist: 'Nature Sounds',
    image: 'https://picsum.photos/400/400?random=1',
    uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Free sample
    duration: 120000
  },
  {
    id: '2',
    title: 'Peaceful Piano',
    artist: 'Relaxing Music',
    image: 'https://picsum.photos/400/400?random=2',
    uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Free sample
    duration: 180000
  },
  {
    id: '3',
    title: 'Ocean Waves',
    artist: 'Nature Collection',
    image: 'https://picsum.photos/400/400?random=3',
    uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Free sample
    duration: 150000
  }
];

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(sampleTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Track[]>(sampleTracks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Setup audio session
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false
        });
      } catch (error) {
        console.log('Error setting up audio:', error);
      }
    };

    setupAudio();
  }, []);

  // Update position while playing
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setPosition((prev) => {
          const newPosition = prev + 1000;
          if (newPosition >= currentTrack.duration) {
            if (repeatMode === 'one') {
              setPosition(0);
              return 0;
            } else {
              skipNext();
              return 0;
            }
          }
          return newPosition;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, currentTrack, repeatMode]);

  const playTrack = async (track: Track) => {
    try {
      setIsLoading(true);

      // Stop current sound if playing
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      setCurrentTrack(track);
      setPosition(0);
      setDuration(track.duration);

      // For demo purposes, we'll just simulate playback without actual audio
      // In a real app, you would load the audio file here:
      // const { sound: newSound } = await Audio.Sound.createAsync(
      //   { uri: track.uri },
      //   { shouldPlay: true }
      // );
      // setSound(newSound);

      setIsPlaying(true);
      setIsLoading(false);

      // Find track in queue and update current index
      const trackIndex = queue.findIndex(t => t.id === track.id);
      if (trackIndex !== -1) {
        setCurrentIndex(trackIndex);
      }

    } catch (error) {
      console.log('Error playing track:', error);
      setIsLoading(false);
    }
  };

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
    setIsPlaying(false);
  };

  const resume = async () => {
    if (sound) {
      await sound.playAsync();
    }
    setIsPlaying(true);
  };

  const stop = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    setIsPlaying(false);
    setPosition(0);
  };

  const seekTo = async (newPosition: number) => {
    setPosition(newPosition);
    if (sound) {
      await sound.setPositionAsync(newPosition);
    }
  };

  const skipNext = async () => {
    let nextIndex = currentIndex + 1;

    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    setCurrentIndex(nextIndex);
    await playTrack(queue[nextIndex]);
  };

  const skipPrevious = async () => {
    if (position > 5000) {
      // If more than 5 seconds in, restart current track
      await seekTo(0);
      return;
    }

    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      if (repeatMode === 'all') {
        prevIndex = queue.length - 1;
      } else {
        await seekTo(0);
        return;
      }
    }

    setCurrentIndex(prevIndex);
    await playTrack(queue[prevIndex]);
  };

  const addToQueue = (tracks: Track[]) => {
    setQueue(prev => [...prev, ...tracks]);
  };

  const removeFromQueue = (index: number) => {
    setQueue(prev => prev.filter((_, i) => i !== index));

    if (index < currentIndex) {
      setCurrentIndex(prev => prev - 1);
    } else if (index === currentIndex && queue.length > 1) {
      // If removing current track, play next one
      skipNext();
    }
  };

  const setRepeat = (mode: 'off' | 'all' | 'one') => {
    setRepeatMode(mode);
  };

  const setShuffle = (enabled: boolean) => {
    setShuffleEnabled(enabled);

    if (enabled) {
      // Shuffle queue but keep current track at current position
      const currentTrackData = queue[currentIndex];
      const otherTracks = queue.filter((_, i) => i !== currentIndex);
      const shuffledOthers = [...otherTracks].sort(() => Math.random() - 0.5);

      const newQueue = [
        ...shuffledOthers.slice(0, currentIndex),
        currentTrackData,
        ...shuffledOthers.slice(currentIndex)
      ];

      setQueue(newQueue);
    } else {
      // Restore original order (this would need to be implemented based on your app's logic)
      setQueue(sampleTracks);
      setCurrentIndex(sampleTracks.findIndex(t => t.id === currentTrack?.id) || 0);
    }
  };

  const value: AudioContextType = {
    currentTrack,
    isPlaying,
    isLoading,
    position,
    duration,
    queue,
    currentIndex,
    playTrack,
    pause,
    resume,
    stop,
    seekTo,
    skipNext,
    skipPrevious,
    addToQueue,
    removeFromQueue,
    setRepeat,
    setShuffle
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
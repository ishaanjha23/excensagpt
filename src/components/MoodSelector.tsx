import React from 'react';

interface Mood {
  emoji: string;
  label: string;
  value: string;
}

interface MoodSelectorProps {
  moods: Mood[];
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ moods, selectedMood, onMoodChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-white/80 font-medium">vibe check:</span>
      <div className="flex space-x-1">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onMoodChange(mood.value)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 ${
              selectedMood === mood.value
                ? 'bg-white/20 ring-2 ring-purple-400 scale-110'
                : 'bg-white/5 hover:bg-white/10'
            }`}
            title={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
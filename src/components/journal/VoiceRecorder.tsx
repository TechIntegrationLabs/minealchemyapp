import React, { useState, useRef } from 'react';
import { Mic, Square, Loader } from 'lucide-react';
import { OPENAI_API_KEY } from '../../lib/openai';

interface Props {
  onTranscriptionComplete: (text: string) => void;
}

export const VoiceRecorder: React.FC<Props> = ({ onTranscriptionComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp3' });
        await transcribeAudio(audioBlob);
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Could not access microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    setError(null);

    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not configured');
      }

      // Create form data with the audio file
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.mp3');
      formData.append('model', 'whisper-1');

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error?.message || `Transcription failed: ${response.statusText}`);
      }

      const data = await response.json();
      onTranscriptionComplete(data.text);
    } catch (err) {
      console.error('Error transcribing audio:', err);
      setError('Failed to transcribe audio: ' + (err as Error).message);
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isTranscribing}
        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
          isRecording
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isTranscribing ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Transcribing...
          </>
        ) : isRecording ? (
          <>
            <Square className="w-4 h-4 mr-2" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 mr-2" />
            Record Voice
          </>
        )}
      </button>

      {error && (
        <div className="absolute top-full left-0 mt-2 w-full">
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

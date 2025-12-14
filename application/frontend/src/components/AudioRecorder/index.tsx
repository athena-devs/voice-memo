import { useState, useRef } from 'react';
// import { FormStyle } from './styles';
// import { Button } from '../Button/styles';

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  
  const audioChunks = useRef<Blob[]>([]);
  
  const stream = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorder.current = new MediaRecorder(stream.current);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      
      if (stream.current) {
          stream.current.getTracks().forEach(track => track.stop());
      }
      
      setIsRecording(false);
    }
  };

  const deleteAudio = () => {
    setAudioURL('');
    if (audioURL) {
        URL.revokeObjectURL(audioURL); 
    }
  };

  return (
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
        {audioURL && (
          <div>
            <audio src={audioURL} controls />
            <button onClick={deleteAudio}>Delete</button>
          </div>
        )}
      </div>
    );
}
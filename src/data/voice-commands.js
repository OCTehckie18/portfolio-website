export function initializeVoiceCommands(onCommand) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported in this browser');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    console.log('Voice input started...');
  };

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    transcript = transcript.trim().toLowerCase();

    // Convert common speech patterns to commands
    const voiceToCommand = {
      'help': '/help',
      'about': '/about',
      'about me': '/about',
      'work': '/work',
      'projects': '/work',
      'skills': '/skills',
      'contact': '/contact',
      'contact me': '/contact',
      'social': '/social',
      'articles': '/articles',
      'testimonials': '/testimonials',
      'philosophy': '/philosophy',
      'clients': '/clients',
      'clear': '/clear',
      'dark mode': '/dark',
      'light mode': '/light',
      'light theme': '/light',
      'retro mode': '/retro',
      'glass mode': '/glass',
      'shortcuts': '/shortcuts',
    };

    const command = voiceToCommand[transcript] || `/${transcript.replace(/\s+/g, '-')}`;
    onCommand(command);
  };

  recognition.onerror = (event) => {
    console.error('Voice error:', event.error);
  };

  recognition.onend = () => {
    console.log('Voice input ended');
  };

  return recognition;
}

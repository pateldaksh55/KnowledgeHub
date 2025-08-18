import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, Send, Users, Clock, Star, MessageCircle } from 'lucide-react';
import image1 from './images/image.png';
import { FaStar, FaLinkedin } from 'react-icons/fa';

 

const LiveTutoring: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedTutor, setSelectedTutor] = useState<number | null>(null);

  const tutors = [
     {
    id: 1,
    name: 'Dr. Pooja Sapra',
    subject: 'Mathematics',
    rating: 4.9,
    experience: '8 years',
    image: image1,
    status: 'online',
    linkedin: 'https://www.linkedin.com/in/pooja-sapra/'
  },
  {
    id: 2,
    name: 'Dr. Vipul Vekaria',
    subject: 'Physics',
    rating: 4.8,
    experience: '12 years',
    image: image1,
    status: 'online',
    linkedin: 'https://www.linkedin.com/in/vipul-vekaria/'
  },
  {
    id: 3,
    name: 'Prof Pawan Shah',
    subject: 'Chemistry',
    rating: 4.9,
    experience: '6 years',
    image: image1,
    status: 'busy',
    linkedin: 'https://www.linkedin.com/in/pawan-shah/'
  },
  {
    id: 4,
    name: 'Dr. Chetan',
    subject: 'Biology',
    rating: 4.7,
    experience: '10 years',
    image: image1,
    status: 'online',
    linkedin: 'https://www.linkedin.com/in/dr-chetan/'
  }
  ];

  const chatMessages = [
    { type: 'tutor', message: 'Hello! I\'m here to help you with your math problem.', time: '2:30 PM' },
    { type: 'student', message: 'Hi! I\'m struggling with quadratic equations.', time: '2:31 PM' },
    { type: 'tutor', message: 'No problem! Let\'s start with the basics. Can you share your specific question?', time: '2:32 PM' }
  ];

  const handleConnect = (tutorId: number) => {
    setSelectedTutor(tutorId);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedTutor(null);
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Tutoring</h1>
          <p className="text-xl text-gray-600">Connect with expert tutors for personalized doubt solving</p>
        </div>

        {!isConnected ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative mb-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                  <div className={`absolute -bottom-1 right-1/2 transform translate-x-1/2 w-4 h-4 rounded-full border-2 border-white ${
                    tutor.status === 'online' ? 'bg-green-500' : 'bg-orange-500'
                  }`} />
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{tutor.name}</h3>
                  <p className="text-green-600 font-medium mb-2">{tutor.subject}</p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{tutor.rating}</span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{tutor.experience}</span>
                    </div>
                    <p className="font-semibold text-gray-900">{tutor.price}</p>
                  </div>
                </div>

               <a
  href={tutor.linkedin}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-3"
>
  <FaLinkedin className="text-blue-700" size={20} />
  <span>View LinkedIn</span>
</a>

            

                <button
                  onClick={() => handleConnect(tutor.id)}
                  disabled={tutor.status === 'busy'}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    tutor.status === 'online'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {tutor.status === 'online' ? 'Connect Now' : 'Busy'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Call Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="absolute inset-0">
                      <img
                        src={tutors.find(t => t.id === selectedTutor)?.image}
                        alt="Tutor"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg">
                        {tutors.find(t => t.id === selectedTutor)?.name}
                      </div>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <VideoOff className="h-16 w-16 mx-auto mb-4" />
                      <p>Camera is off</p>
                    </div>
                  )}
                  
                  {/* Student Video (Picture-in-Picture) */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden">
                    {isVideoOn ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <VideoOff className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="p-6 bg-gray-50">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setIsAudioOn(!isAudioOn)}
                      className={`p-3 rounded-full transition-all ${
                        isAudioOn
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </button>

                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-3 rounded-full transition-all ${
                        isVideoOn
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </button>

                    <button
                      onClick={handleDisconnect}
                      className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all"
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="bg-white rounded-2xl shadow-lg flex flex-col h-[600px]">
              <div className="p-4 border-b bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-2xl">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <h3 className="font-semibold">Live Chat</h3>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'student' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.type === 'student'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === 'student' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTutoring;
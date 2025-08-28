import React, { useState } from "react";
import { Video, VideoOff, Mic, MicOff, Phone, Send, MessageCircle } from "lucide-react";
import studentImg from './images/image.png';

const TeacherSession: React.FC = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [chatMessage, setChatMessage] = useState("");

  const student = {
    id: 1,
    name: "Daksh Patel",
    subject: "Mathematics",
    image: studentImg,
  };

  const chatMessages = [
    { type: "student", message: "Hello sir, I need help in algebra", time: "2:30 PM" },
    { type: "teacher", message: "Sure, let’s solve it together.", time: "2:31 PM" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
            {isVideoOn ? (
              <img src={student.image} alt="Student" className="w-full h-full object-cover" />
            ) : (
              <div className="text-white text-center">
                <VideoOff className="h-16 w-16 mx-auto mb-4" />
                <p>Camera is off</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="p-6 bg-gray-50 flex justify-center space-x-4">
            <button
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`p-3 rounded-full ${
                isAudioOn ? "bg-gray-600 text-white" : "bg-red-500 text-white"
              }`}
            >
              {isAudioOn ? <Mic /> : <MicOff />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full ${
                isVideoOn ? "bg-gray-600 text-white" : "bg-red-500 text-white"
              }`}
            >
              {isVideoOn ? <Video /> : <VideoOff />}
            </button>

            <button className="p-3 bg-red-500 text-white rounded-full">
              <Phone />
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col h-[600px]">
          <div className="p-4 border-b bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Chat with {student.name}</h3>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.type === "teacher" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.type === "teacher" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="block text-xs mt-1 opacity-70">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex space-x-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 border px-3 py-2 rounded-xl"
              placeholder="Type a message..."
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-xl">
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSession;

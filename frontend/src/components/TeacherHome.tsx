import React, { useState } from "react";
import { Users, MessageCircle, Phone, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import studentImg from "./images/image.png"; // dummy

const TeacherHome: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const navigate = useNavigate();

  const students = [
    { id: 1, name: "Daksh Patel", subject: "Mathematics", status: "calling", image: studentImg },
    { id: 2, name: "Priya Sharma", subject: "Physics", status: "texting", image: studentImg },
    { id: 3, name: "Ravi Mehta", subject: "Chemistry", status: "idle", image: studentImg },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Local Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <UserCircle className="h-10 w-10 text-gray-700 cursor-pointer hover:text-purple-600" />
        </div>

        {/* Students List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
              onClick={() => navigate(`/teacher/session/${student.id}`)} // ✅ route to session
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-20 h-20 rounded-full mx-auto object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 text-center">{student.name}</h3>
              <p className="text-center text-gray-600">{student.subject}</p>

              <div className="flex justify-center mt-4 gap-3">
                {student.status === "calling" && <Phone className="h-6 w-6 text-green-600" />}
                {student.status === "texting" && <MessageCircle className="h-6 w-6 text-blue-600" />}
                {student.status === "idle" && <Users className="h-6 w-6 text-gray-400" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;

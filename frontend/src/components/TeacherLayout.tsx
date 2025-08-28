import React from "react";
import { Outlet } from "react-router-dom";

const TeacherLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Outlet /> {/* renders TeacherHome, TeacherSession, etc */}
    </div>
  );
};

export default TeacherLayout;

import React, { useState } from 'react';
import { 
  BookOpen, Download, Search, Star, Eye, Clock, 
  FileText, Video, Image, Play 
} from 'lucide-react';

interface Material {
  id: string;
  title: string;
  subject: string;
  type: 'pdf' | 'video' | 'notes' | 'quiz';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  downloads: number;
  duration?: string;
  thumbnail: string;
  description: string;
  fileUrl?: string; // ✅ added for PDFs
}

const StudyMaterials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];
  const types = ['pdf', 'video', 'notes', 'quiz'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  const materials: Material[] = [
    {
      id: '1',
      title: 'Advanced Calculus: Limits and Derivatives',
      subject: 'Mathematics',
      type: 'pdf',
      difficulty: 'advanced',
      rating: 4.8,
      downloads: 1245,
      thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Comprehensive guide to calculus concepts with detailed examples and practice problems.',
      fileUrl: '/pdfs/new.pdf' // ✅ place your file in frontend/public/pdfs
    },
    {
      id: '2',
      title: 'Quantum Physics Fundamentals',
      subject: 'Physics',
      type: 'pdf',
      difficulty: 'intermediate',
      rating: 4.9,
      downloads: 892,
      duration: '2h 15m',
      thumbnail: 'https://images.pexels.com/photos/220301/pexels-photo-220301.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Visual explanation of quantum mechanics principles with animations and real-world examples.',
      fileUrl: '/pdfs/new.pdf'
    },
    {
      id: '3',
      title: 'Organic Chemistry Reactions Cheat Sheet',
      subject: 'Chemistry',
      type: 'pdf',
      difficulty: 'intermediate',
      rating: 4.7,
      downloads: 2156,
      thumbnail: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Quick reference guide for common organic chemistry reactions and mechanisms.',
      fileUrl: '/pdfs/new.pdf'
    },
    {
      id: '4',
      title: 'Cell Biology Interactive Quiz',
      subject: 'Biology',
      type: 'pdf',
      difficulty: 'beginner',
      rating: 4.6,
      downloads: 567,
      thumbnail: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Test your knowledge of cell structure and functions with this interactive quiz.',
      fileUrl: '/pdfs/new.pdf'
    },
    {
      id: '5',
      title: 'Shakespeare\'s Literary Techniques',
      subject: 'English',
      type: 'pdf',
      difficulty: 'intermediate',
      rating: 4.5,
      downloads: 789,
      thumbnail: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Analysis of Shakespeare\'s writing style and literary devices used in his major works.',
      fileUrl: '/pdfs/new.pdf'// ✅ another example
    },
    {
      id: '6',
      title: 'World War II Timeline Video',
      subject: 'History',
      type: 'pdf',
      difficulty: 'beginner',
      rating: 4.8,
      downloads: 1345,
      duration: '45m',
      thumbnail: 'https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Comprehensive timeline of World War II events with historical footage and maps.',
      fileUrl: '/pdfs/new.pdf'
    }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || material.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesType && matchesDifficulty;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'notes': return BookOpen;
      case 'quiz': return Image;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-100';
      case 'video': return 'text-blue-600 bg-blue-100';
      case 'notes': return 'text-green-600 bg-green-100';
      case 'quiz': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // ✅ View material handler
  const handleView = (material: Material) => {
    if (material.type === 'pdf' && material.fileUrl) {
      window.open(material.fileUrl, '_blank'); // open pdf
    } else {
      alert(`Viewing for ${material.type} is not implemented yet.`);
    }
  };

  // ✅ Download handler
  const handleDownload = (material: Material) => {
    if (material.type === 'pdf' && material.fileUrl) {
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.download = material.title + '.pdf';
      link.click();
    } else {
      alert(`Download for ${material.type} is not implemented yet.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Materials</h1>
          <p className="text-xl text-gray-600">Access comprehensive learning resources across all subjects</p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => {
            const TypeIcon = getTypeIcon(material.type);
            return (
              <div key={material.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img
                    src={material.thumbnail}
                    alt={material.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    {material.type === 'video' ? (
                      <Play className="h-12 w-12 text-white" />
                    ) : (
                      <Eye className="h-12 w-12 text-white" />
                    )}
                  </div>
                  <div className={`absolute top-4 left-4 px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(material.type)}`}>
                    <TypeIcon className="h-3 w-3 inline mr-1" />
                    {material.type.toUpperCase()}
                  </div>
                  {material.duration && (
                    <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-lg text-xs">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {material.duration}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-600">{material.subject}</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(material.difficulty)}`}>
                      {material.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{material.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{material.description}</p>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{material.rating}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleView(material)} 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 text-sm font-medium"
                    >
                      View Material
                    </button>
                    <button 
                      onClick={() => handleDownload(material)} 
                      className="p-2 border border-gray-300 rounded-xl hover:border-purple-600 hover:text-purple-600 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;

import React, { useState } from 'react';
import { BookOpen, Download, Search, Filter, Star, Eye, Clock, FileText, Video, Image, Play } from 'lucide-react';

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
      description: 'Comprehensive guide to calculus concepts with detailed examples and practice problems.'
    },
    {
      id: '2',
      title: 'Quantum Physics Fundamentals',
      subject: 'Physics',
      type: 'video',
      difficulty: 'intermediate',
      rating: 4.9,
      downloads: 892,
      duration: '2h 15m',
      thumbnail: 'https://images.pexels.com/photos/220301/pexels-photo-220301.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Visual explanation of quantum mechanics principles with animations and real-world examples.'
    },
    {
      id: '3',
      title: 'Organic Chemistry Reactions Cheat Sheet',
      subject: 'Chemistry',
      type: 'notes',
      difficulty: 'intermediate',
      rating: 4.7,
      downloads: 2156,
      thumbnail: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Quick reference guide for common organic chemistry reactions and mechanisms.'
    },
    {
      id: '4',
      title: 'Cell Biology Interactive Quiz',
      subject: 'Biology',
      type: 'quiz',
      difficulty: 'beginner',
      rating: 4.6,
      downloads: 567,
      thumbnail: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Test your knowledge of cell structure and functions with this interactive quiz.'
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
      description: 'Analysis of Shakespeare\'s writing style and literary devices used in his major works.'
    },
    {
      id: '6',
      title: 'World War II Timeline Video',
      subject: 'History',
      type: 'video',
      difficulty: 'beginner',
      rating: 4.8,
      downloads: 1345,
      duration: '45m',
      thumbnail: 'https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Comprehensive timeline of World War II events with historical footage and maps.'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Materials</h1>
          <p className="text-xl text-gray-600">Access comprehensive learning resources across all subjects</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Levels</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</option>
              ))}
            </select>
          </div>
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
                    <div className="flex items-center space-x-1">
                      
                      
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 text-sm font-medium">
                      View Material
                    </button>
                    <button className="p-2 border border-gray-300 rounded-xl hover:border-purple-600 hover:text-purple-600 transition-colors">
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

        {/* Categories */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject, index) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`p-4 rounded-xl text-center transition-all transform hover:scale-105 ${
                  index % 6 === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  index % 6 === 1 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  index % 6 === 2 ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                  index % 6 === 3 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  index % 6 === 4 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                  'bg-gradient-to-r from-pink-500 to-pink-600'
                } text-white`}
              >
                <div className="text-lg font-semibold">{subject}</div>
                <div className="text-sm opacity-90">
                  {materials.filter(m => m.subject === subject).length} materials
                </div>
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default StudyMaterials;
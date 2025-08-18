import React from 'react';
import { Video, MessageCircle, BookOpen, Clock, Users, Award, ArrowRight } from 'lucide-react';

type ActiveSection = 'home' | 'live-tutoring' | 'ai-chat' | 'study-materials';

interface FeaturesProps {
  onFeatureClick: (section: ActiveSection) => void;
}

const Features: React.FC<FeaturesProps> = ({ onFeatureClick }) => {
  const features = [
    {
      id: 'live-tutoring' as ActiveSection,
      icon: Video,
      title: 'Live Tutoring',
      description: 'Connect with expert tutors instantly through video calls and live chat for personalized doubt solving.',
      highlights: [],
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'ai-chat' as ActiveSection,
      icon: MessageCircle,
      title: 'AI Chat Assistant',
      description: 'Get instant answers to your questions with our advanced AI-powered chat assistant available 24/7.',
      highlights: [],
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'study-materials' as ActiveSection,
      icon: BookOpen,
      title: 'Study Materials',
      description: 'Access comprehensive study resources, notes, and practice materials across all subjects.',
      highlights: [],
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Three Ways to Excel in Your Studies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the learning method that works best for you, or combine all three for maximum success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 cursor-pointer transform hover:-translate-y-2"
                onClick={() => onFeatureClick(feature.id)}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {feature.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className={`flex items-center space-x-2 ${feature.textColor} font-semibold group-hover:translate-x-2 transition-transform`}>
                  <span>Explore {feature.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
              </div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        
      </div>
    </section>
  );
};

export default Features;
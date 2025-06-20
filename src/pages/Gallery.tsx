import React, { useState } from 'react';
import { Search, Filter, Download, Share2, Trash2 } from 'lucide-react';

// Sample gallery data - replace with your actual data
const sampleImages = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/29295595/pexels-photo-29295595/free-photo-of-chef-d-oeuvre-unique.jpeg',
    prompt: 'Modern fashion editorial shot',
    date: '2024-03-15',
    category: 'fashion'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/19391396/pexels-photo-19391396.jpeg',
    prompt: 'Abstract geometric patterns',
    date: '2024-03-14',
    category: 'abstract'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/19618016/pexels-photo-19618016.jpeg',
    prompt: 'Urban exploration photography',
    date: '2024-03-13',
    category: 'urban'
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/15031645/pexels-photo-15031645.jpeg',
    prompt: 'Neon city nightscape',
    date: '2024-03-12',
    category: 'urban'
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/18631360/pexels-photo-18631360/free-photo-of-lumineux-leger-art-france.jpeg',
    prompt: 'Abstract fluid art composition',
    date: '2024-03-11',
    category: 'abstract'
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    prompt: 'Minimalist tech workspace',
    date: '2024-03-10',
    category: 'lifestyle'
  },
  {
    id: 7,
    url: 'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg',
    prompt: 'Futuristic architecture',
    date: '2024-03-09',
    category: 'architecture'
  },
  {
    id: 8,
    url: 'https://images.pexels.com/photos/19500315/pexels-photo-19500315.jpeg',
    prompt: 'Digital landscape art',
    date: '2024-03-08',
    category: 'landscape'
  },
  {
    id: 9,
    url: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    prompt: 'Vintage fashion portrait',
    date: '2024-03-07',
    category: 'fashion'
  },
  {
    id: 10,
    url: 'https://images.pexels.com/photos/19618022/pexels-photo-19618022.jpeg',
    prompt: 'Contemporary art installation',
    date: '2024-03-06',
    category: 'abstract'
  },
  {
    id: 11,
    url: 'https://images.pexels.com/photos/19489859/pexels-photo-19489859.jpeg',
    prompt: 'Urban street photography',
    date: '2024-03-05',
    category: 'urban'
  },
  {
    id: 12,
    url: 'https://images.pexels.com/photos/31942050/pexels-photo-31942050/free-photo-of-facade-d-un-batiment-historique-avec-du-lierre-a-istanbul.jpeg',
    prompt: 'Modern architectural detail',
    date: '2024-03-04',
    category: 'architecture'
  },
  {
    id: 13,
    url: 'https://images.pexels.com/photos/19489881/pexels-photo-19489881.jpeg',
    prompt: 'Natural landscape vista',
    date: '2024-03-03',
    category: 'landscape'
  },
  {
    id: 14,
    url: 'https://images.pexels.com/photos/19489882/pexels-photo-19489882.jpeg',
    prompt: 'Lifestyle product photography',
    date: '2024-03-02',
    category: 'lifestyle'
  },
  {
    id: 15,
    url: 'https://images.pexels.com/photos/19489883/pexels-photo-19489883.jpeg',
    prompt: 'High fashion editorial',
    date: '2024-03-01',
    category: 'fashion'
  },
  {
    id: 16,
    url: 'https://images.pexels.com/photos/19489884/pexels-photo-19489884.jpeg',
    prompt: 'Abstract light painting',
    date: '2024-02-29',
    category: 'abstract'
  }
];

const categories = ['All', 'fashion', 'abstract', 'urban', 'architecture', 'landscape', 'lifestyle'];

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = sampleImages.filter(image => {
    const matchesSearch = image.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium mb-2">Gallery</h1>
          <p className="text-neutral-400">Browse and manage your generated images</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by prompt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div key={image.id} className="group relative">
            <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-medium mb-2 line-clamp-2">{image.prompt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75">{image.date}</span>
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-400">No images found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
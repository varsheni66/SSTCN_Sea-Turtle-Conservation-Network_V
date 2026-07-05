import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const categories = ['All', 'Hatchlings', 'Sea Turtles'];

const galleryImages = [
  {
    id: 1,
    title: 'Undersea Glider',
    category: 'Sea Turtles',
    url: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&q=80&w=800',
    desc: 'A sea turtle coasting gracefully underwater, using its powerful front flippers to navigate.'
  },
  {
    id: 2,
    title: 'Hawksbill Sea Turtle',
    category: 'Sea Turtles',
    url: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800',
    desc: 'A beautiful Hawksbill turtle gliding gracefully through coral reefs in clear tropical waters.'
  },
  {
    id: 3,
    title: 'Newborn Hatchling Journey',
    category: 'Hatchlings',
    url: '/hatchling.png',
    desc: 'A baby sea turtle hatchling crawling across the warm morning sand towards the ocean waves.'
  },
  {
    id: 4,
    title: 'Sunlit Coral Reef Swim',
    category: 'Sea Turtles',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=800',
    desc: 'A vibrant green sea turtle floating effortlessly over a shallow, thriving coral reef habitat.'
  },
  {
    id: 5,
    title: 'First Swim of a Hatchling',
    category: 'Hatchlings',
    url: '/hatchling_swim.png',
    desc: 'A baby sea turtle hatchling taking its first swim in clear, shallow turquoise coastal waters.'
  },
  {
    id: 6,
    title: 'Green Sea Turtle Feeding',
    category: 'Sea Turtles',
    url: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=800',
    desc: 'A magnificent Green Sea Turtle feeding on seagrass in shallow, sunlit coastal zones.'
  },
  {
    id: 7,
    title: 'Nesting Green Turtle',
    category: 'Sea Turtles',
    url: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800',
    desc: 'A close-up view of an adult nesting sea turtle resting in the calm ocean water near the shore.'
  }
];

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const filteredImages = galleryImages.filter((img) =>
    selectedFilter === 'All' ? true : img.category === selectedFilter
  );

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="Photo Gallery"
          title="Moments of Hope & Conservation"
          subtitle="A visual diary documenting the field efforts of our network, from midnight beach walks to dawn hatchery releases."
        />

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-poppins font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-gradient-brand text-white shadow-soft'
                  : 'bg-brand-gray text-gray-500 hover:text-brand-dark border border-gray-100/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Responsive Gallery Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative rounded-[24px] overflow-hidden group shadow-soft border border-gray-100/50 cursor-zoom-in"
                onClick={() => {
                  // Find index in the current filtered set
                  const index = filteredImages.findIndex((item) => item.id === img.id);
                  setActiveImageIndex(index);
                }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded-[24px]"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest font-poppins bg-white/90 px-2 py-0.5 rounded-full self-start mb-2">
                    {img.category}
                  </span>
                  <h4 className="text-white font-poppins font-bold text-lg leading-tight flex items-center justify-between">
                    {img.title}
                    <Maximize2 className="w-4 h-4 text-white opacity-80" />
                  </h4>
                  <p className="text-white/80 font-sans text-xs mt-1.5 line-clamp-2">
                    {img.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 z-50 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-4 lg:left-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-40 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 lg:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-40 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Box */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-4xl w-full flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-[20px] overflow-hidden max-h-[70vh] flex items-center justify-center bg-black">
                <img
                  src={filteredImages[activeImageIndex].url}
                  alt={filteredImages[activeImageIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-[20px]"
                />
              </div>

              {/* Descriptions text */}
              <div className="text-left text-white px-4">
                <span className="text-xs font-bold text-brand-teal tracking-wider uppercase font-poppins">
                  {filteredImages[activeImageIndex].category}
                </span>
                <h3 className="text-xl font-bold font-poppins mt-1">
                  {filteredImages[activeImageIndex].title}
                </h3>
                <p className="text-sm text-gray-400 font-sans mt-2 leading-relaxed">
                  {filteredImages[activeImageIndex].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

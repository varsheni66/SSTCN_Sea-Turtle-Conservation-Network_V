import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, MapPin, ShieldAlert, Award } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

const speciesData = [
  {
    id: 'olive-ridley',
    name: 'Olive Ridley',
    scientific: 'Lepidochelys olivacea',
    status: 'Vulnerable',
    statusColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600',
    desc: 'The most abundant sea turtle in India. Famous for their synchronized mass nesting called "arribadas" along the beaches of Odisha.',
    back: {
      nesting: 'Odisha (Gahirmatha, Rushikulya), Chennai coast, Andhra Pradesh',
      size: '60 - 70 cm',
      weight: '35 - 50 kg',
      threats: 'Trawler nets, coastal illumination, beach erosion, egg poaching',
      protection: 'Wildlife Protection Act (Schedule I)'
    }
  },
  {
    id: 'leatherback',
    name: 'Leatherback',
    scientific: 'Dermochelys coriacea',
    status: 'Vulnerable',
    statusColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    image: '/leatherback.png',
    desc: 'The largest of all living turtles. Easily identified by their leathery shell with ridges instead of bony scutes.',
    back: {
      nesting: 'Andaman and Nicobar Islands (Little Andaman, Great Nicobar)',
      size: '1.8 - 2.2 meters',
      weight: '250 - 700 kg',
      threats: 'Marine plastic ingestion, deep-sea fishing lines, nest disturbance',
      protection: 'Wildlife Protection Act (Schedule I)'
    }
  },
  {
    id: 'green-turtle',
    name: 'Green Turtle',
    scientific: 'Chelonia mydas',
    status: 'Least Concern',
    statusColor: 'bg-green-100 text-green-800 border-green-200',
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=600',
    desc: 'Mainly herbivorous turtles that play a key role in keeping sea-grass beds healthy. Highly abundant in coral reefs.',
    back: {
      nesting: 'Gujarat coast, Lakshadweep Islands, Andaman & Nicobar',
      size: '1.0 - 1.2 meters',
      weight: '110 - 190 kg',
      threats: 'Habitat degradation, boat strikes, sea-grass meadow loss',
      protection: 'Wildlife Protection Act (Schedule I)'
    }
  },
  {
    id: 'hawksbill',
    name: 'Hawksbill',
    scientific: 'Eretmochelys imbricata',
    status: 'Critically Endangered',
    statusColor: 'bg-red-100 text-red-800 border-red-200',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=600',
    desc: 'Distinguished by a sharp beak and beautiful tortoiseshell scutes. Heavily linked with tropical coral reefs.',
    back: {
      nesting: 'Andaman and Nicobar Islands, Lakshadweep coral lagoons',
      size: '75 - 90 cm',
      weight: '45 - 70 kg',
      threats: 'Illegal tortoiseshell trade, coral bleaching, egg harvesting',
      protection: 'Wildlife Protection Act (Schedule I)'
    }
  },
  {
    id: 'loggerhead',
    name: 'Loggerhead',
    scientific: 'Caretta caretta',
    status: 'Vulnerable',
    statusColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=600',
    desc: 'Named for their large head and strong jaws. While seen in offshore waters, they do not nest on Indian beaches.',
    back: {
      nesting: 'Does not nest in India (migratory sightings in Indian Ocean)',
      size: '90 - 100 cm',
      weight: '80 - 135 kg',
      threats: 'Bycatch in commercial fisheries, ghost nets, marine pollution',
      protection: 'Wildlife Protection Act (Schedule I)'
    }
  }
];

export default function Species() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="species" className="py-24 bg-brand-gray relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="Marine Turtle Species"
          title="Turtles of the Indian Waters"
          subtitle="Learn about the five majestic sea turtle species that inhabit India's coastlines. All are strictly protected under Schedule I of the Wildlife Protection Act."
        />

        {/* CSS 3D perspective grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speciesData.map((species) => {
            const isFlipped = !!flippedCards[species.id];
            return (
              <div
                key={species.id}
                className="h-[480px] w-full cursor-pointer group"
                onClick={() => toggleFlip(species.id)}
                style={{ perspective: '1200px' }}
              >
                <motion.div
                  className="relative w-full h-full duration-700 select-none"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0 bg-white border border-gray-100 rounded-[24px] shadow-soft overflow-hidden flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div>
                      {/* Image Container */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={species.image}
                          alt={species.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins border ${species.statusColor}`}>
                            {species.status}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 text-left">
                        <span className="text-xs italic text-brand-teal font-poppins font-medium">
                          {species.scientific}
                        </span>
                        <h3 className="text-2xl font-bold font-poppins text-brand-dark mt-1">
                          {species.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-sans mt-3 line-clamp-3 leading-relaxed">
                          {species.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between text-left">
                      <span className="text-xs text-gray-400 font-sans flex items-center gap-1.5 font-medium uppercase tracking-wider">
                        <RefreshCw className="w-3.5 h-3.5" /> Tap to Flip
                      </span>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 bg-white border border-gray-100 rounded-[24px] shadow-card overflow-hidden p-6 sm:p-8 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-left">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold font-poppins text-brand-dark">
                            {species.name}
                          </h3>
                          <span className="text-xs italic text-brand-teal font-poppins">
                            {species.scientific}
                          </span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-poppins border ${species.statusColor}`}>
                          {species.status}
                        </span>
                      </div>

                      {/* Details List */}
                      <div className="flex flex-col gap-3.5">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-poppins flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-blue" /> Primary Nesting
                          </span>
                          <p className="text-xs text-gray-600 font-sans font-medium mt-0.5">{species.back.nesting}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-poppins">Avg. Size</span>
                            <p className="text-xs text-gray-600 font-sans font-medium mt-0.5">{species.back.size}</p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-poppins">Avg. Weight</span>
                            <p className="text-xs text-gray-600 font-sans font-medium mt-0.5">{species.back.weight}</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-poppins flex items-center gap-1">
                            <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> Main Threats
                          </span>
                          <p className="text-xs text-red-800 bg-red-50/50 p-2 rounded-lg border border-red-100 font-sans font-medium mt-1">{species.back.threats}</p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-poppins flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-brand-teal" /> Legal Status
                          </span>
                          <p className="text-xs text-brand-teal font-sans font-semibold mt-0.5">{species.back.protection}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-left">
                      <span className="text-xs text-gray-400 font-sans flex items-center gap-1.5 font-medium uppercase tracking-wider">
                        <RefreshCw className="w-3.5 h-3.5" /> Tap to Flip Back
                      </span>
                      <Button variant="secondary" size="sm">
                        Close
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

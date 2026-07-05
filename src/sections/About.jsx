import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Award, Sparkles, BookOpen, Compass } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';

const timelineEvents = [
  {
    year: '1971',
    title: 'Early Observations',
    desc: 'Romulus Whitaker and S. Valliappan begin patrolling Chennai beaches, cataloging nesting tracks and raising awareness about commercial exploitation of Olive Ridley eggs.'
  },
  {
    year: '1982',
    title: 'Forest Dept. Hatcheries',
    desc: 'The Tamil Nadu Forest Department steps in, managing multiple hatcheries along the Chennai coast to safeguard turtle clutches.'
  },
  {
    year: '1988',
    title: 'SSTCN Formation',
    desc: 'When the Forest Department terminates its program due to budget limits, a group of students led by Tito Chandy and Arif Razack form SSTCN to take over.'
  },
  {
    year: '2008',
    title: '20 Years of Walk',
    desc: 'Celebrating two decades of student-led patrols, releasing over 100,000 hatchlings and conducting hundreds of educational night walks.'
  },
  {
    year: '2026',
    title: 'Modern Advocacy',
    desc: 'Now one of Chennai\'s longest running conservation bodies, integrating modern digital tracking, local fisher-folk cooperation, and youth leadership.'
  }
];

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const content = {
    mission: {
      title: 'Our Mission',
      icon: Target,
      color: 'text-brand-blue',
      bgColor: 'bg-blue-50',
      text: 'To protect the nesting Olive Ridley sea turtles along Chennai beaches, manage safe hatcheries, and run extensive environmental education programs that sensitize the public to coastal ecology.',
      points: [
        'Protect nests from poaching and stray predators.',
        'Incubate collected eggs in high-care hatcheries.',
        'Sustain Friday & Saturday public awareness walks.'
      ]
    },
    vision: {
      title: 'Our Vision',
      icon: Eye,
      color: 'text-brand-teal',
      bgColor: 'bg-teal-50',
      text: 'A future where Chennai\'s coastlines thrive organically and sea turtles return to safe beaches, championed by an empathetic community of students and youth leaders.',
      points: [
        'Zero-waste Chennai beaches free of plastics.',
        'Local fishing communities leading nesting monitors.',
        'Active youth engagement in climate advocacy.'
      ]
    },
    objectives: {
      title: 'Our Objectives',
      icon: Compass,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      text: 'To ensure a collaborative conservation ecosystem through hands-on volunteer action, scientific monitoring, and close work with state agencies.',
      points: [
        'Maintain a 90%+ hatchling survival rate.',
        'Train 500+ student conservation leaders annually.',
        'Monitor beach temperature trends affecting sex ratios.'
      ]
    }
  };

  const ActiveIcon = content[activeTab].icon;

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Graphic Blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-brand-light-blue blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-teal-50/50 blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="About SSTCN"
          title="Conserving Chennai's Coastline Since 1988"
          subtitle="Discover how a student-run collective turned into a legendary conservation movement on the shores of the Bay of Bengal."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Mission, Vision, Objectives Interactive Tabs */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-left">
            <h3 className="font-poppins font-bold text-2xl text-brand-dark tracking-tight">
              Our Core Philosophy
            </h3>
            
            {/* Tab Buttons */}
            <div className="flex gap-2 p-1.5 bg-brand-gray rounded-2xl border border-gray-100">
              {Object.keys(content).map((tab) => {
                const item = content[tab];
                const isSelected = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-xl font-poppins font-semibold text-sm transition-all duration-300 relative cursor-pointer ${
                      isSelected ? 'text-brand-dark' : 'text-gray-500 hover:text-brand-dark'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeAboutTab"
                        className="absolute inset-0 bg-white shadow-soft rounded-xl border border-gray-100/50"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.title.split(' ')[1] || item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-brand-teal/10 shadow-glow" hoverEffect={false}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`p-3.5 rounded-2xl ${content[activeTab].bgColor} ${content[activeTab].color}`}>
                      <ActiveIcon className="w-7 h-7" />
                    </div>
                    <h4 className="font-poppins font-bold text-xl text-brand-dark">
                      {content[activeTab].title}
                    </h4>
                  </div>
                  
                  <p className="text-gray-600 font-sans leading-relaxed mb-6">
                    {content[activeTab].text}
                  </p>

                  <ul className="flex flex-col gap-3">
                    {content[activeTab].points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-sans">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Callout Quote */}
            <div className="p-6 border-l-4 border-brand-teal bg-brand-light-blue rounded-r-[24px]">
              <p className="italic text-brand-dark/80 font-sans text-sm leading-relaxed">
                "Conservation is not just about saving a species; it is about repairing our relationship with the environment that sustains us all."
              </p>
              <span className="block mt-2 font-poppins font-bold text-xs text-gray-500 uppercase tracking-wider">
                — Tito Chandy, SSTCN Co-founder
              </span>
            </div>
          </div>

          {/* Right Column: Historical Vertical Timeline */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-left">
            <h3 className="font-poppins font-bold text-2xl text-brand-dark tracking-tight">
              Milestones & Legacy
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l border-gray-200 ml-4 flex flex-col gap-10">
              {timelineEvents.map((evt, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Circle Indicator */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-brand-teal flex items-center justify-center group-hover:border-brand-blue group-hover:bg-brand-blue/5 transition-all">
                    <div className="w-2 h-2 rounded-full bg-brand-teal group-hover:bg-brand-blue transition-colors" />
                  </div>

                  <span className="inline-block px-3 py-1 text-xs font-bold font-poppins text-brand-blue bg-brand-light-blue border border-brand-blue/10 rounded-full mb-2">
                    {evt.year}
                  </span>
                  
                  <h4 className="font-poppins font-bold text-lg text-brand-dark group-hover:text-brand-teal transition-colors mb-1">
                    {evt.title}
                  </h4>
                  
                  <p className="text-sm text-gray-500 font-sans leading-relaxed">
                    {evt.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

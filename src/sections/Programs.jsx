import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Moon, Trash2, Calendar, ClipboardCheck, ArrowUpRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const programs = [
  {
    title: 'Hatchery Management',
    tag: 'Conservation',
    icon: ShieldCheck,
    color: 'text-brand-teal bg-teal-50 border-teal-100',
    desc: 'In cooperation with the Tamil Nadu Forest Department, we run secure hatcheries to protect translocated nests. Eggs are safely buried in designated grid spots, guarded 24/7 against predators, poachers, and stray dogs.',
    image: 'https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?auto=format&fit=crop&q=80&w=600',
    steps: [
      { num: '01', title: 'Relocate Nests', desc: 'Move wild nests safely from high-traffic zones.' },
      { num: '02', title: 'Monitor Temperature', desc: 'Assess soil warmth which regulates hatchling sex ratio.' },
      { num: '03', title: 'Safe Release', desc: 'Assist hatchlings into the sea immediately upon emergence.' }
    ]
  },
  {
    title: 'Night Patrol Turtle Walks',
    tag: 'Community',
    icon: Moon,
    color: 'text-brand-blue bg-blue-50 border-blue-100',
    desc: 'During the nesting season (January to April), volunteers patrol the Neelangarai to Besant Nagar beaches nightly. We map tracks, safeguard egg-laying mothers, relocate fresh clutches, and lead public outreach walks.',
    image: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&q=80&w=600',
    steps: [
      { num: '01', title: 'Patrol Beach', desc: 'Scan a 7km beach stretch in shifts between 11 PM and 5 AM.' },
      { num: '02', title: 'Collect Clutches', desc: 'Translocate fresh clutches carefully in custom fabric bags.' },
      { num: '03', title: 'Public Walks', desc: 'Host Friday & Saturday night walks to educate the community.' }
    ]
  },
  {
    title: 'Coastal Cleanup & Advocacy',
    tag: 'Ecology',
    icon: Trash2,
    color: 'text-red-500 bg-red-50 border-red-100',
    desc: 'A turtle\'s journey starts on the sand. We host regular beach cleanups to remove marine debris, plastic bottlenecks, and ghost nets that block nesting trails and choke newly emerged hatchlings.',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=600',
    steps: [
      { num: '01', title: 'Ghost Net removal', desc: 'Excavate dangerous plastic nets half-buried in the shoreline.' },
      { num: '02', title: 'Fisher-folk training', desc: 'Work with local hamlets to reduce bycatch and boat injuries.' },
      { num: '03', title: 'Zero Waste Campaigns', desc: 'Urge coastal businesses to restrict plastic container sales.' }
    ]
  }
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-white relative overflow-hidden">
      {/* Ocean Currents SVG Background */}
      <div className="absolute top-1/3 left-0 right-0 h-40 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C180,120 360,40 540,80 C720,120 900,40 1080,80 C1260,120 1380,80 1440,80" stroke="#14B8A6" strokeWidth="6" strokeDasharray="10 10" />
          <path d="M0,140 C180,180 360,100 540,140 C720,180 900,100 1080,140 C1260,180 1380,140 1440,140" stroke="#3B82F6" strokeWidth="4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="Conservation Programs"
          title="Direct Action & Community Care"
          subtitle="Our multifaceted programs focus on protecting nests in vulnerable shore environments, training public volunteers, and restoring Chennai's nesting habitats."
        />

        <div className="flex flex-col gap-28 relative">
          {programs.map((program, idx) => {
            const Icon = program.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Panel */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`lg:col-span-6 relative rounded-[32px] overflow-hidden shadow-card border border-gray-100 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-[320px] sm:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                {/* Text Content Panel */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`lg:col-span-6 text-left flex flex-col gap-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue font-poppins bg-brand-light-blue px-3 py-1 border border-brand-blue/10 rounded-full">
                      {program.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl border ${program.color} shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-brand-dark tracking-tight">
                      {program.title}
                    </h3>
                  </div>

                  <p className="text-gray-500 font-sans leading-relaxed text-base">
                    {program.desc}
                  </p>

                  <div className="h-[1px] bg-gray-100 my-2" />

                  {/* Program Steps / Lifecycle Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {program.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex flex-col gap-1 text-left relative">
                        <span className="text-lg font-bold font-poppins text-brand-teal bg-teal-50/50 w-8 h-8 rounded-full flex items-center justify-center border border-brand-teal/10">
                          {step.num}
                        </span>
                        <h4 className="font-poppins font-bold text-sm text-brand-dark mt-2">
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-400 font-sans leading-relaxed mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    ))}
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

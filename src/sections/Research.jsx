import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Thermometer, BarChart2, Award, Download, ArrowRight, BookOpen } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';

const researchHighlights = [
  {
    title: 'Thermal Profiling',
    icon: Thermometer,
    color: 'text-orange-500 bg-orange-50 border-orange-100',
    desc: 'Monitoring sand temperatures in our hatcheries to understand climate impacts on sex ratios. Warmer sand shifts ratios towards females; our shading structures keep temperatures balanced.'
  },
  {
    title: 'Fishery Bycatch Data',
    icon: BarChart2,
    color: 'text-brand-blue bg-blue-50 border-blue-100',
    desc: 'Documenting offshore stranding cases to identify trawling hotspots. We work with marine researchers to lobby for mandatory Turtle Excluder Devices (TEDs) in local fishing boats.'
  },
  {
    title: 'Nesting Site Density Mapping',
    icon: Award,
    color: 'text-brand-teal bg-teal-50 border-brand-teal/10',
    desc: 'Cataloging spatial coordinate trends of nest encounters. Over three decades of data reveals nesting migrations shifting towards northern Chennai shores.'
  }
];

const publications = [
  {
    id: 1,
    title: 'Thirty Years of Citizen Science: Sea Turtle Conservation in Chennai',
    journal: 'Indian Ocean Turtle Newsletter',
    year: '2018',
    authors: 'A. Razack, T. Chandy, S. Bhaskar',
    abstract: 'An in-depth review of how student volunteers and citizens established one of the longest continuous marine monitoring datasets in South Asia, analyzing nesting density, hatchery success, and community attitudes.'
  },
  {
    id: 2,
    title: 'Incubation Temperatures and Estimated Sex Ratios of Olive Ridley Hatchlings',
    journal: 'Marine Biology Research India',
    year: '2021',
    authors: 'K. Shanker, V. Sridhar',
    abstract: 'This paper measures sand temperature fluctuations inside SSTCN hatcheries. Results indicate that managed shading helps maintain nest temperatures below the critical 30°C sex-determination threshold.'
  },
  {
    id: 3,
    title: 'Marine Debris Accumulation and Its Obstacles to Nesting Olive Ridley Turtles',
    journal: 'Environmental Monitoring Journal',
    year: '2023',
    authors: 'R. Sen, M. Ramesh',
    abstract: 'An empirical study mapping beach plastic concentrations along Chennai. Findings show nesting success drops by 32% in zones with heavy plastic accumulation due to physical barrier blocks.'
  }
];

export default function Research() {
  const [expandedAbstract, setExpandedAbstract] = useState(null);

  const toggleAbstract = (id) => {
    setExpandedAbstract(expandedAbstract === id ? null : id);
  };

  return (
    <section id="research" className="py-24 bg-brand-gray relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-brand-light-blue/40 blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="Scientific Research & Citizen Science"
          title="Empirical Insights for Marine Policy"
          subtitle="SSTCN is more than patrol walks. Our extensive 35-year nesting database provides critical citizen science inputs to government conservation plans."
        />

        {/* Top: Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {researchHighlights.map((hl, idx) => {
            const Icon = hl.icon;
            return (
              <Card key={idx} className="border border-gray-100/50 hover:shadow-glow">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl border ${hl.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-poppins font-bold text-lg text-brand-dark">
                    {hl.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 font-sans leading-relaxed">
                  {hl.desc}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Bottom Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Publications List */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-brand-teal" />
              <h3 className="font-poppins font-bold text-2xl text-brand-dark tracking-tight">
                Publications Library
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {publications.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white border border-gray-100 p-6 rounded-[20px] shadow-soft hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold font-poppins text-brand-blue bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                        {pub.year}
                      </span>
                      <h4 className="font-poppins font-bold text-base text-brand-dark mt-2 leading-snug">
                        {pub.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-sans mt-1.5 font-medium">
                        {pub.authors} &bull; <span className="italic">{pub.journal}</span>
                      </p>
                    </div>
                  </div>

                  {/* Accordion abstract reveal */}
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => toggleAbstract(pub.id)}
                        className="text-xs font-semibold text-brand-teal hover:text-brand-blue transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {expandedAbstract === pub.id ? 'Hide Abstract' : 'View Abstract'}
                        <ArrowRight className={`w-3.5 h-3.5 transform transition-transform ${expandedAbstract === pub.id ? 'rotate-90' : ''}`} />
                      </button>
                      <button
                        onClick={() => alert(`Initiating simulated PDF download for: "${pub.title}"`)}
                        className="text-xs text-gray-400 hover:text-brand-dark transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    </div>

                    <AnimatePresence>
                      {expandedAbstract === pub.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-gray-500 font-sans leading-relaxed mt-3 bg-brand-gray p-3 rounded-lg border border-gray-100">
                            {pub.abstract}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Scientific Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left bg-white p-8 rounded-[24px] border border-gray-100 shadow-soft">
            <h3 className="font-poppins font-bold text-xl text-brand-dark tracking-tight mb-4">
              Nesting Research Metrics
            </h3>

            <div className="flex flex-col gap-6">
              {[
                { label: 'Avg. Incubation Period', val: '48 - 52 Days', pct: 85, desc: 'Highly correlated with seasonal beach temperature fluctuations.' },
                { label: 'Avg. Clutch Size', val: '110 Eggs', pct: 90, desc: 'Typical number of eggs laid per nest by a nesting female.' },
                { label: 'Hatchery Emergence Rate', val: '86% Success', pct: 86, desc: 'Compared to less than 15% survival rate in unprotected wild nests.' }
              ].map((metric, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold font-poppins text-brand-dark">{metric.label}</span>
                    <span className="text-base font-bold font-poppins text-brand-teal">{metric.val}</span>
                  </div>
                  {/* Custom progress indicator bar */}
                  <div className="w-full h-2 bg-brand-gray rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-brand rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-400 font-sans leading-relaxed">
                    {metric.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Scientific note */}
            <div className="mt-4 p-4 border border-dashed border-brand-teal/20 bg-brand-teal/5 rounded-xl text-xs text-brand-teal font-sans leading-relaxed">
              <strong>Citizen Science Impact:</strong> All data is logged and submitted directly to the State Forest Department and Wildlife Institute of India to direct national marine zoning policies.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Landmark, Smartphone, Check, CreditCard, Shield, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import confetti from 'canvas-confetti';

const donationTiers = [
  {
    id: 'nest',
    price: '₹1,200',
    title: 'Nest Guardian',
    impact: 'Protects 1 nest of ~110 eggs',
    features: [
      'Funds nest excavation & relocation',
      'Provides netting protection',
      'Updates you on hatching date'
    ],
    accent: 'border-brand-teal/20',
    icon: Heart,
    iconColor: 'text-brand-teal bg-teal-50'
  },
  {
    id: 'patrol',
    price: '₹4,500',
    title: 'Patrol Defender',
    impact: 'Equips 4 patrol walkers',
    features: [
      'Torches, gloves & safe bags',
      'Safety equipment for volunteers',
      'Printed educational pamphlets'
    ],
    accent: 'border-brand-blue/30 shadow-glow relative ring-2 ring-brand-blue/10',
    tag: 'Most Popular',
    icon: Shield,
    iconColor: 'text-brand-blue bg-blue-50'
  },
  {
    id: 'hatchery',
    price: '₹10,000',
    title: 'Hatchery Champion',
    impact: 'Constructs 1 hatchery grid',
    features: [
      'Bamboo fencing & mesh poles',
      'High-grade hatchery tools',
      'Sponsors school awareness visits'
    ],
    accent: 'border-brand-teal/20',
    icon: Landmark,
    iconColor: 'text-orange-500 bg-orange-50'
  }
];

export default function Donate() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const handleOpenDonate = (tier) => {
    setSelectedTier(tier);
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setPaymentDone(true);
    
    // Confetti blast!
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.55 }
    });

    setTimeout(() => {
      setSelectedTier(null);
      setPaymentDone(false);
    }, 3500);
  };

  return (
    <section id="donate" className="py-24 bg-brand-gray relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-teal-50 blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="Support Our Mission"
          title="Direct Action, Direct Impact"
          subtitle="SSTCN is completely non-profit and runs on voluntary donations. Your contributions go directly towards purchasing hatchery materials, safety patrols, and educational outreach."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Progress Circle and Impact */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <h3 className="font-poppins font-bold text-2xl text-brand-dark tracking-tight">
              Our Season Goals
            </h3>
            
            {/* Animated SVG Progress Circle */}
            <div className="relative w-48 h-48 flex items-center justify-center bg-white rounded-full border border-gray-100 shadow-soft">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="6"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="6"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  whileInView={{ strokeDashoffset: 251.2 - (251.2 * 84) / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#14B8A6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-brand-dark font-poppins">84%</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Nests Protected</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-poppins font-bold text-lg text-brand-dark">
                420 of 500 Nests Secured
              </h4>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                With your help, we are close to hitting our target of protecting 500 nests this season. Every donation secures another nesting grid.
              </p>
            </div>
          </div>

          {/* Right Column: Donation Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {donationTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <Card
                  key={tier.id}
                  className={`flex flex-col justify-between p-6 ${tier.accent} relative`}
                  hoverEffect={true}
                >
                  {tier.tag && (
                    <span className="absolute top-4 right-4 text-[9px] font-extrabold text-white bg-brand-blue uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {tier.tag}
                    </span>
                  )}

                  <div className="text-left">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${tier.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest font-poppins">
                      {tier.title}
                    </span>
                    <h4 className="text-2xl font-bold font-poppins text-brand-dark mt-1">
                      {tier.price}
                    </h4>
                    <p className="text-xs font-semibold text-brand-teal font-sans mt-1">
                      {tier.impact}
                    </p>

                    <div className="h-[1px] bg-gray-100 my-4" />

                    <ul className="flex flex-col gap-2.5">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-500 font-sans">
                          <Check className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={tier.tag ? 'primary' : 'outline'}
                    size="sm"
                    className="w-full mt-6"
                    onClick={() => handleOpenDonate(tier)}
                  >
                    Select Plan
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Donation Form Modal Overlay */}
      <AnimatePresence>
        {selectedTier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedTier(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[28px] p-8 shadow-2xl border border-gray-100 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedTier(null)}
                className="absolute top-5 right-5 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-brand-dark transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-poppins font-bold text-2xl text-brand-dark tracking-tight">
                Support: {selectedTier.title}
              </h3>
              <p className="text-xs text-gray-400 font-sans mt-1">
                You are donating <span className="font-bold text-brand-teal">{selectedTier.price}</span> to {selectedTier.impact.toLowerCase()}.
              </p>

              <div className="h-[1px] bg-gray-100 my-5" />

              {paymentDone ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.2, 1] }}
                    className="w-16 h-16 rounded-full bg-teal-50 border-2 border-brand-teal flex items-center justify-center text-brand-teal"
                  >
                    <Check className="w-8 h-8" />
                  </motion.div>
                  <h4 className="font-poppins font-bold text-lg text-brand-dark">Thank You for Donating!</h4>
                  <p className="text-xs text-gray-500 font-sans max-w-xs">
                    Your simulated contribution has been received. In a production environment, this would process via UPI/Razorpay securely.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDonateSubmit} className="flex flex-col gap-5">
                  {/* Payment Method Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 font-poppins uppercase tracking-wider">Payment Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'upi', label: 'UPI / GPay', icon: Smartphone },
                        { id: 'card', label: 'Credit Card', icon: CreditCard },
                        { id: 'net', label: 'Net Banking', icon: Landmark }
                      ].map((mode) => {
                        const ModeIcon = mode.icon;
                        const isSel = paymentMethod === mode.id;
                        return (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setPaymentMethod(mode.id)}
                            className={`py-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isSel ? 'border-brand-teal bg-teal-50/20 text-brand-teal' : 'border-gray-200 text-gray-500'
                            }`}
                          >
                            <ModeIcon className="w-4 h-4" />
                            <span className="text-[10px] font-bold font-poppins">{mode.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic inputs */}
                  {paymentMethod === 'upi' ? (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 font-poppins uppercase tracking-wider">UPI ID</label>
                      <input
                        type="text"
                        required
                        placeholder="john@okaxis"
                        className="w-full px-4 py-3 bg-brand-gray border border-gray-200/50 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-500 font-poppins uppercase tracking-wider">Card Number</label>
                        <input
                          type="text"
                          required
                          placeholder="4111 2222 3333 4444"
                          className="w-full px-4 py-3 bg-brand-gray border border-gray-200/50 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-gray-500 font-poppins uppercase tracking-wider">Expiry</label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-brand-gray border border-gray-200/50 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-gray-500 font-poppins uppercase tracking-wider">CVV</label>
                          <input
                            type="password"
                            required
                            maxLength="3"
                            placeholder="***"
                            className="w-full px-4 py-3 bg-brand-gray border border-gray-200/50 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <Button type="submit" variant="primary" className="w-full py-4 rounded-xl mt-2">
                    Pay {selectedTier.price}
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

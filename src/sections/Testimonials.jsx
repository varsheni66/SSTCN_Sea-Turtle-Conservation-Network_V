import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

// Import Swiper styles in JS
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    quote: "SSTCN represents one of the finest examples of long-term, community-based citizen science in India. The sheer consistency of these student volunteers is unmatched.",
    author: "Dr. Kartik Shanker",
    role: "Associate Professor, IISc & Trustee of Dakshin Foundation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "When the government had to discontinue the hatcheries in 1988, SSTCN proved that citizen-led action can step in and sustain critical wildlife preservation for decades.",
    author: "Romulus Whitaker",
    role: "Herpetologist & Founder of Madras Crocodile Bank",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Patrolling the beaches under the stars, searching for nests, and watching tiny hatchlings crawl towards the surf is a life-altering experience for any student.",
    author: "Siddharth Ramakrishnan",
    role: "Volunteer since 2018 (IIT Madras Student)",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "The turtle walks are not just about protecting nests; they are an educational classroom where thousands of Chennai citizens have connected with their coastlines.",
    author: "Akila Balu",
    role: "Long-time SSTCN Coordinator & Environmentalist",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-light-blue/30 blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="Testimonials"
          title="Voices of the Shore"
          subtitle="Read stories and quotes from the scientists, founders, and students who have walked the shores with us over the last 35+ years."
        />

        <div className="relative">
          {/* Swiper JS Auto Slider */}
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.swiper-custom-pagination' }}
            className="w-full pb-16"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                {/* Premium Glass Card */}
                <div className="glass p-8 sm:p-12 rounded-[32px] border border-gray-100 shadow-soft text-left flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
                  <div className="absolute top-6 right-8 text-brand-teal/10 pointer-events-none">
                    <Quote className="w-24 h-24 stroke-[1.5]" />
                  </div>

                  {/* Profile Image */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-brand-teal shadow-soft">
                    <img
                      src={t.image}
                      alt={t.author}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Testimonial Quote */}
                  <div className="flex flex-col gap-4 relative z-10">
                    <p className="text-base sm:text-lg text-gray-600 font-sans italic leading-relaxed">
                      "{t.quote}"
                    </p>
                    <div className="flex flex-col">
                      <span className="font-poppins font-bold text-base text-brand-dark">
                        {t.author}
                      </span>
                      <span className="text-xs text-gray-400 font-sans mt-0.5">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom pagination positioning to match Apple styling */}
          <div className="swiper-custom-pagination flex justify-center gap-2 mt-4" />
        </div>
      </div>
    </section>
  );
}

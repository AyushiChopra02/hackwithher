// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
'use client'

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Autoplay } from 'swiper/modules';
import * as echarts from 'echarts';
const Home: React.FC = () => {
// Add global styles for animations
React.useEffect(() => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-up {
      animation: fadeInUp 1s ease-out;
    }
    .animate-slide-up {
      opacity: 0;
      animation: slideUp 0.8s ease-out forwards;
    }
    .delay-200 {
      animation-delay: 200ms;
    }
    .delay-300 {
      animation-delay: 300ms;
    }
  `;
  document.head.appendChild(style);
  return () => {
    document.head.removeChild(style);
  };
}, []);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [activeTab, setActiveTab] = useState('all');
const [showProfileMenu, setShowProfileMenu] = useState(false);
useEffect(() => {
const chartDom = document.getElementById('statsChart');
if (chartDom) {
const myChart = echarts.init(chartDom);
const option = {
animation: false,
series: [
{
type: 'gauge',
startAngle: 90,
endAngle: -270,
pointer: { show: false },
progress: {
show: true,
overlap: false,
roundCap: true,
clip: false,
itemStyle: {
color: '#8B5CF6'
}
},
axisLine: {
lineStyle: {
width: 18,
color: [[1, '#E5E7EB']]
}
},
splitLine: { show: false },
axisTick: { show: false },
axisLabel: { show: false },
data: [{ value: 85, name: 'Wellness Score' }],
detail: {
valueAnimation: true,
offsetCenter: [0, 0],
fontSize: 24,
fontWeight: 'bold',
formatter: '{value}%',
color: '#8B5CF6'
}
}
]
};
myChart.setOption(option);
}
}, []);
const heroSlides = [
{
image: 'https://public.readdy.ai/ai/img_res/5414fe1d7294c3b1b8c727b1077f0007.jpg',
title: 'Transform Your Life Through Yoga',
subtitle: 'Start your wellness journey today'
},
{
image: 'https://public.readdy.ai/ai/img_res/5617d5124027d1c46fdf0506678b7cda.jpg',
title: 'Join Our Wellness Community',
subtitle: 'Connect, Share, and Grow Together'
},
{
image: 'https://public.readdy.ai/ai/img_res/a7aad153ea25f18e7031e3aa04ae65e8.jpg',
title: 'Find Your Inner Peace',
subtitle: 'Guided Meditation & Mindfulness'
}
];
const programs = [
{
title: 'Morning Flow',
image: 'https://public.readdy.ai/ai/img_res/bd62d88871590fe9e859f148275e9c9b.jpg',
duration: '30 mins',
level: 'Beginner',
instructor: 'Sarah Anderson'
},
{
title: 'Power Vinyasa',
image: 'https://public.readdy.ai/ai/img_res/13aed34dcc3b8f1fee01d877088f1b45.jpg',
duration: '45 mins',
level: 'Advanced',
instructor: 'Emma Thompson'
},
{
title: 'Gentle Stretch',
image: 'https://public.readdy.ai/ai/img_res/8679eb70138a56934dfc4eb151bc0f66.jpg',
duration: '25 mins',
level: 'Beginner',
instructor: 'Michelle Parker'
}
];
return (
<div className="min-h-screen bg-[#FFFAF0]">
{/* Navigation */}
<nav className="bg-white shadow-sm fixed w-full z-50">
<div className="max-w-7xl mx-auto px-4">
<div className="flex justify-between h-16">
<div className="flex items-center">
<div className="text-2xl font-semibold text-[#663399]">ZenLife</div>
<div className="hidden md:flex items-center ml-10 space-x-8">
<button className="text-gray-700 hover:text-[#663399] !rounded-button whitespace-nowrap">Home</button>
<button className="text-gray-700 hover:text-[#663399] !rounded-button whitespace-nowrap">Programs</button>
<button className="text-gray-700 hover:text-[#663399] !rounded-button whitespace-nowrap">Wellness</button>
<button className="text-gray-700 hover:text-[#663399] !rounded-button whitespace-nowrap">Community</button>
</div>
</div>
<div className="flex items-center space-x-4">
<div className="relative">
<input
type="text"
placeholder="Search..."
className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#663399]"
/>
<i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
</div>
<button
className="relative !rounded-button whitespace-nowrap"
onClick={() => setShowProfileMenu(!showProfileMenu)}
>
<i className="fas fa-user-circle text-2xl text-[#663399]"></i>
</button>
</div>
</div>
</div>
</nav>
{/* Hero Section */}
<div className="pt-16">
<Swiper
modules={[Pagination, Autoplay]}
pagination={{ clickable: true }}
autoplay={{ delay: 5000 }}
loop={true}
className="h-[500px]"
>
{heroSlides.map((slide, index) => (
<SwiperSlide key={index}>
<div className="relative h-full">
<img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
<div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
<div className="max-w-7xl mx-auto px-4 h-full flex items-center">
<div className="text-white max-w-xl animate-fade-in-up">
<h1 className="text-5xl font-bold mb-4 animate-slide-up">{slide.title}</h1>
<p className="text-xl mb-8 animate-slide-up delay-200">{slide.subtitle}</p>
<button className="bg-[#663399] text-white px-8 py-3 rounded-full hover:bg-[#563399] transition-all hover:scale-105 !rounded-button whitespace-nowrap animate-slide-up delay-300">
Start Your Journey
</button>
</div>
</div>
</div>
</div>
</SwiperSlide>
))}
</Swiper>
</div>
{/* Featured Programs */}
<div className="max-w-7xl mx-auto px-4 py-16">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Programs</h2>
<div className="grid md:grid-cols-3 gap-8" style={{ opacity: 0 }} ref={(el) => {
  if (el) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = 'fadeInUp 1s ease-out forwards';
          el.style.opacity = '1';
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
  }
}}>
{programs.map((program, index) => (
<div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
<div className="h-64 overflow-hidden">
<img src={program.image} alt={program.title} className="w-full h-full object-cover" />
</div>
<div className="p-6">
<h3 className="text-xl font-semibold mb-2">{program.title}</h3>
<div className="flex items-center text-sm text-gray-600 mb-4">
<i className="fas fa-clock mr-2"></i>
<span>{program.duration}</span>
<span className="mx-2">•</span>
<i className="fas fa-signal mr-2"></i>
<span>{program.level}</span>
</div>
<div className="flex items-center mb-4">
<i className="fas fa-user-circle text-2xl text-gray-400 mr-2"></i>
<span className="text-sm text-gray-600">{program.instructor}</span>
</div>
<button className="w-full bg-[#E6E6FA] text-[#663399] py-2 rounded-full hover:bg-[#663399] hover:text-white transition-colors !rounded-button whitespace-nowrap">
Start Now
</button>
</div>
</div>
))}
</div>
</div>
{/* Wellness Stats */}
<div className="bg-white py-16">
<div className="max-w-7xl mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800 transform transition-all hover:scale-105 duration-300">Your Wellness Journey</h2>
<div className="grid md:grid-cols-3 gap-8" style={{ opacity: 0 }} ref={(el) => {
  if (el) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = 'fadeInUp 1s ease-out forwards';
          el.style.opacity = '1';
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
  }
}}>
<div className="text-center">
<div className="w-40 h-40 mx-auto mb-4" id="statsChart"></div>
<h3 className="text-xl font-semibold">Wellness Score</h3>
</div>
<div className="text-center">
<div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center">
<div className="text-4xl font-bold text-[#663399]">247</div>
</div>
<h3 className="text-xl font-semibold">Minutes Practiced</h3>
</div>
<div className="text-center">
<div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center">
<div className="text-4xl font-bold text-[#663399]">12</div>
</div>
<h3 className="text-xl font-semibold">Programs Completed</h3>
</div>
</div>
</div>
</div>
{/* Footer */}
<footer className="bg-[#663399] text-white py-12">
<div className="max-w-7xl mx-auto px-4">
<div className="grid md:grid-cols-4 gap-8">
<div>
<h3 className="text-xl font-semibold mb-4">ZenLife</h3>
<p className="text-gray-300">Transform your life through the power of yoga and mindfulness.</p>
</div>
<div>
<h4 className="font-semibold mb-4">Quick Links</h4>
<ul className="space-y-2">
<li><button className="text-gray-300 hover:text-white !rounded-button whitespace-nowrap">About Us</button></li>
<li><button className="text-gray-300 hover:text-white !rounded-button whitespace-nowrap">Programs</button></li>
<li><button className="text-gray-300 hover:text-white !rounded-button whitespace-nowrap">Instructors</button></li>
<li><button className="text-gray-300 hover:text-white !rounded-button whitespace-nowrap">Blog</button></li>
</ul>
</div>
<div>
<h4 className="font-semibold mb-4">Connect</h4>
<div className="flex space-x-4">
<button className="text-2xl hover:text-gray-300 !rounded-button whitespace-nowrap">
<i className="fab fa-facebook"></i>
</button>
<button className="text-2xl hover:text-gray-300 !rounded-button whitespace-nowrap">
<i className="fab fa-instagram"></i>
</button>
<button className="text-2xl hover:text-gray-300 !rounded-button whitespace-nowrap">
<i className="fab fa-twitter"></i>
</button>
</div>
</div>
<div>
<h4 className="font-semibold mb-4">Newsletter</h4>
<div className="flex">
<input
type="email"
placeholder="Enter your email"
className="px-4 py-2 rounded-l-full text-gray-800 w-full"
/>
<button className="bg-[#E6E6FA] text-[#663399] px-6 rounded-r-full hover:bg-white transition-colors !rounded-button whitespace-nowrap">
Subscribe
</button>
</div>
</div>
</div>
<div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
<p>&copy; 2025 ZenLife. All rights reserved.</p>
</div>
</div>
</footer>
</div>
);
};
export default Home;

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
const Log: React.FC = () => {
const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [rememberMe, setRememberMe] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setIsLoading(true);
// Simulating API call
await new Promise(resolve => setTimeout(resolve, 2000));
setIsLoading(false);
};
const yogaImages = [
{
url: 'https://public.readdy.ai/ai/img_res/a19e820cdb0fbcec12f2aa17f0b2d9b5.jpg',
title: 'Mindful Meditation'
},
{
url: 'https://public.readdy.ai/ai/img_res/df4fc6b6c6a7ff63cdf7472b7f7593e7.jpg',
title: 'Sacred Space'
},
{
url: 'https://public.readdy.ai/ai/img_res/a2456045b08791d69f05e3d381aeafef.jpg',
title: 'Holistic Healing'
},
{
url: 'https://public.readdy.ai/ai/img_res/b4daa7b32055b833b4b7691c2e5a95c2.jpg',
title: 'Collective Consciousness'
},
{
url: 'https://public.readdy.ai/ai/img_res/0448f27238edc9f68a24345384ae1438.jpg',
title: 'Energy Flow'
},
{
url: 'https://public.readdy.ai/ai/img_res/a0a217cef18c1f5ce63af269292b737f.jpg',
title: 'Sound Healing'
}
];
return (
<div className="flex min-h-screen">
{/* Left Panel - Image Carousel */}
<div className="hidden lg:block w-1/2 relative overflow-hidden">
<Swiper
modules={[Pagination, Autoplay, EffectFade]}
effect="fade"
pagination={{ clickable: true }}
autoplay={{ delay: 4000, disableOnInteraction: false }}
loop={true}
className="h-full w-full"
>
{yogaImages.map((image, index) => (
<SwiperSlide key={index}>
<div className="relative h-screen">
<img
src={image.url}
alt={image.title}
className="absolute inset-0 w-full h-full object-cover"
/>
<div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-transparent">
<div className="absolute bottom-20 left-10 text-white">
<h2 className="text-3xl font-montserrat mb-2">{image.title}</h2>
<p className="text-lg font-opensans opacity-90">Discover your inner strength</p>
</div>
</div>
</div>
</SwiperSlide>
))}
</Swiper>
</div>
{/* Right Panel - Login Form */}
<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white backdrop-blur-md bg-opacity-90 relative">
<div className="absolute inset-0 z-0">
  <img 
    src="https://public.readdy.ai/ai/img_res/3ba7f4249bbac636dff12de491bb0f56.jpg"
    alt="Background Pattern"
    className="w-full h-full object-cover opacity-5"
  />
</div>
<div className="relative z-10">
<div className="w-full max-w-md space-y-8">
<div className="text-center">
<div className="mb-8 transform hover:scale-105 transition-transform duration-300">
<i className="fas fa-spa text-5xl text-purple-600"></i>
</div>
<h2 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">
Welcome to Your Wellness Journey
</h2>
<p className="text-gray-600 font-opensans">
Begin your path to mindful living and inner peace
</p>
</div>
<form onSubmit={handleSubmit} className="mt-8 space-y-6">
<div className="space-y-4">
<div>
<label htmlFor="email" className="sr-only">Email address</label>
<div className="relative">
<i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
<input
id="email"
name="email"
type="email"
required
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
placeholder="Email address"
/>
</div>
</div>
<div>
<label htmlFor="password" className="sr-only">Password</label>
<div className="relative">
<i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
<input
id="password"
name="password"
type={showPassword ? 'text' : 'password'}
required
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
placeholder="Password"
/>
<button
type="button"
onClick={() => setShowPassword(!showPassword)}
className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
>
<i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
</button>
</div>
</div>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center">
<input
id="remember-me"
name="remember-me"
type="checkbox"
checked={rememberMe}
onChange={(e) => setRememberMe(e.target.checked)}
className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
/>
<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
Remember me
</label>
</div>
<div className="text-sm">
<a href="#" className="font-medium text-purple-600 hover:text-purple-500">
Forgot your password?
</a>
</div>
</div>
<div>
<button
type="submit"
disabled={isLoading}
className="!rounded-button w-full py-3 px-4 flex justify-center items-center text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:-translate-y-1 transition-all duration-200"
>
{isLoading ? (
<i className="fas fa-circle-notch fa-spin mr-2"></i>
) : (
<i className="fas fa-sign-in-alt mr-2"></i>
)}
{isLoading ? 'Signing in...' : 'Sign in'}
</button>
</div>
<div className="mt-6">
<div className="relative">
<div className="absolute inset-0 flex items-center">
<div className="w-full border-t border-gray-300"></div>
</div>
<div className="relative flex justify-center text-sm">
<span className="px-2 bg-white text-gray-500">Or continue with</span>
</div>
</div>
<div className="mt-6 grid grid-cols-2 gap-3">
<button
type="button"
className="!rounded-button w-full py-3 px-4 flex justify-center items-center border border-gray-300 hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200"
>
<i className="fab fa-google text-red-500 mr-2"></i>
Google
</button>
<button
type="button"
className="!rounded-button w-full py-3 px-4 flex justify-center items-center border border-gray-300 hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200"
>
<i className="fab fa-facebook text-blue-600 mr-2"></i>
Facebook
</button>
</div>
</div>
</form>
<p className="mt-8 text-center text-sm text-gray-600">
Not a member?{' '}
<a href="#" className="font-medium text-purple-600 hover:text-purple-500">
Start your wellness journey today
</a>
</p>
</div>
</div>
</div>
</div>
);
};
export default Log

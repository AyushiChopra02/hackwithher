// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useRef } from 'react';
import * as echarts from 'echarts';
const Cal: React.FC = () => {
const [selectedImage, setSelectedImage] = useState<string | null>(null);
const [isDragging, setIsDragging] = useState(false);
const [showResults, setShowResults] = useState(false);
const [showModal, setShowModal] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);
const chartRef = useRef<HTMLDivElement>(null);
const nutritionData = [
{ item: 'Grilled Chicken Breast', portion: '200g', calories: 330, proteins: 62, carbs: 0, fats: 7 },
{ item: 'Brown Rice', portion: '150g', calories: 160, proteins: 3, carbs: 34, fats: 1 },
{ item: 'Steamed Broccoli', portion: '100g', calories: 55, proteins: 3.7, carbs: 11, fats: 0.6 },
{ item: 'Olive Oil', portion: '15ml', calories: 120, proteins: 0, carbs: 0, fats: 14 },
];
const handleDragOver = (e: React.DragEvent) => {
e.preventDefault();
setIsDragging(true);
};
const handleDragLeave = () => {
setIsDragging(false);
};
const handleDrop = (e: React.DragEvent) => {
e.preventDefault();
setIsDragging(false);
const file = e.dataTransfer.files[0];
handleImageUpload(file);
};
const handleImageUpload = (file: File) => {
const reader = new FileReader();
reader.onload = (e) => {
setSelectedImage(e.target?.result as string);
setShowResults(true);
initChart();
};
reader.readAsDataURL(file);
};
const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.files && e.target.files[0]) {
handleImageUpload(e.target.files[0]);
}
};
const initChart = () => {
if (chartRef.current) {
const chart = echarts.init(chartRef.current);
const option = {
animation: false,
tooltip: {
trigger: 'item',
formatter: '{b}: {c}g ({d}%)'
},
series: [
{
name: 'Nutrition Distribution',
type: 'pie',
radius: ['40%', '70%'],
itemStyle: {
borderRadius: 10,
borderColor: '#fff',
borderWidth: 2
},
data: [
{ value: 68.7, name: 'Proteins' },
{ value: 45, name: 'Carbs' },
{ value: 22.6, name: 'Fats' }
]
}
]
};
chart.setOption(option);
}
};
const backgroundImages = [
'https://public.readdy.ai/ai/img_res/1d9d822e96f24102d93468a6efb9f65c.jpg',
'https://public.readdy.ai/ai/img_res/ee5f80d81d9ba719ca535f073fdb11fd.jpg',
'https://public.readdy.ai/ai/img_res/e97095992833514c6dd49c8ee542f7ea.jpg'
];
const [currentBgIndex, setCurrentBgIndex] = useState(0);
React.useEffect(() => {
const interval = setInterval(() => {
setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
}, 8000);
return () => clearInterval(interval);
}, []);
// Add gradient animation styles
React.useEffect(() => {
const style = document.createElement('style');
style.textContent = `
@keyframes gradient-x {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}
.animate-gradient-x {
background-size: 200% auto;
animation: gradient-x 8s linear infinite;
}
`;
document.head.appendChild(style);
return () => {
document.head.removeChild(style);
};
}, []);
return (
<div className="relative min-h-screen">
<div
className="absolute inset-0 bg-cover bg-center transition-all duration-1000 blur-xs"
style={{ backgroundImage: `url(${backgroundImages[currentBgIndex]})` }}
/>
<div className="absolute inset-0 bg-white/40" />
<div className="relative container mx-auto px-4 py-8 min-h-screen">
<header className="text-center mb-12">
<h1 className="text-4xl font-bold mb-4 text-gray-800 relative inline-block">
<i className="fa fa-heartbeat mr-3 text-gray-800"></i>
<span className="relative">
CalorieSnap
<span className="absolute -inset-1 bg-white/20 blur-sm rounded-lg -z-10"></span>
<span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
</span>
</h1>
<p className="text-xl text-gray-800 drop-shadow">Instantly analyze the nutritional content of your meals</p>
</header>
<div className="max-w-4xl  mx-auto bg-white/60  backdrop-blur-xs rounded-2xl  p-8">
{!showResults ? (
<div
className={` rounded-xl p-12 text-center transition-all duration-300 ${
isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
}`}
onDragOver={handleDragOver}
onDragLeave={handleDragLeave}
onDrop={handleDrop}
>
<i className="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-4"></i>
<h3 className="text-xl font-semibold mb-4">Drag and drop your food image here</h3>
<p className="text-gray-500 mb-6">or</p>
<button
onClick={() => fileInputRef.current?.click()}
className="!rounded-button bg-blue-600 text-white px-8 py-3 hover:bg-blue-700 transition-colors whitespace-nowrap"
>
Choose File
</button>
<input
type="file"
ref={fileInputRef}
onChange={handleFileSelect}
accept="image/*"
className="hidden"
/>
<p className="mt-4 text-sm text-gray-500">Supported formats: JPG, PNG, WEBP</p>
</div>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="relative">
<img
src={selectedImage || ''}
alt="Uploaded food"
className="w-full h-96 object-cover rounded-lg shadow-md"
/>
<button
onClick={() => setShowModal(true)}
className="!rounded-button absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-white whitespace-nowrap"
>
<i className="fas fa-expand-alt"></i>
</button>
</div>
<div>
<div className="mb-6">
<h3 className="text-xl font-semibold mb-4">Nutritional Analysis</h3>
<div className="h-64" ref={chartRef}></div>
</div>
<div className="overflow-x-auto">
<table className="w-full">
<thead>
<tr className="bg-gray-100">
<th className="px-4 py-2 text-left">Item</th>
<th className="px-4 py-2 text-left">Portion</th>
<th className="px-4 py-2 text-left">Calories</th>
<th className="px-4 py-2 text-left">Proteins</th>
<th className="px-4 py-2 text-left">Carbs</th>
<th className="px-4 py-2 text-left">Fats</th>
</tr>
</thead>
<tbody>
{nutritionData.map((item, index) => (
<tr
key={index}
className="border-b hover:bg-gray-50 transition-colors"
>
<td className="px-4 py-2">{item.item}</td>
<td className="px-4 py-2">{item.portion}</td>
<td className="px-4 py-2">{item.calories}</td>
<td className="px-4 py-2">{item.proteins}g</td>
<td className="px-4 py-2">{item.carbs}g</td>
<td className="px-4 py-2">{item.fats}g</td>
</tr>
))}
<tr className="bg-gray-100 font-semibold">
<td className="px-4 py-2">Total</td>
<td className="px-4 py-2">-</td>
<td className="px-4 py-2">665</td>
<td className="px-4 py-2">68.7g</td>
<td className="px-4 py-2">45g</td>
<td className="px-4 py-2">22.6g</td>
</tr>
</tbody>
</table>
</div>
<div className="mt-6 flex gap-4">
<button
onClick={() => {
setSelectedImage(null);
setShowResults(false);
}}
className="!rounded-button bg-gray-600 text-white px-6 py-2 hover:bg-gray-700 transition-colors whitespace-nowrap"
>
<i className="fas fa-redo mr-2"></i>
New Analysis
</button>
<button
className="!rounded-button bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-colors whitespace-nowrap"
>
<i className="fas fa-download mr-2"></i>
Export Results
</button>
</div>
</div>
</div>
)}
</div>
</div>
{showModal && (
<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
<div className="max-w-4xl w-full mx-4">
<div className="relative">
<img
src={selectedImage || ''}
alt="Enlarged food"
className="w-full rounded-lg"
/>
<button
onClick={() => setShowModal(false)}
className="!rounded-button absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-white whitespace-nowrap"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
</div>
)}
</div>
);
};
export default Cal

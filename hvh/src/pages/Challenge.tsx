import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

interface Challenge {
  id: number;
  description: string;
  completed: boolean;
}

interface DayStatus {
  dayNumber: number;
  completed: boolean;
  challenges: Challenge[];
}

const Challenge: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [days, setDays] = useState<DayStatus[]>([]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [
    'https://public.readdy.ai/ai/img_res/f40f204ae1c4e40b596653d2c092ffa5.jpg',
    'https://public.readdy.ai/ai/img_res/e33cb476e5e5792af3db6f96a93a3a34.jpg',
    'https://public.readdy.ai/ai/img_res/7a8db8ded342f3c6ecf40917c4b91e56.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Retrieve data from local storage
    const savedDays = localStorage.getItem('challengeDays');
    if (savedDays) {
      setDays(JSON.parse(savedDays));
    } else {
      const initialDays: DayStatus[] = Array.from({ length: 30 }, (_, index) => ({
        dayNumber: index + 1,
        completed: false,
        challenges: [
          { id: 1, description: 'Morning Sun Salutation (10 mins)', completed: false },
          { id: 2, description: 'Warrior Pose Series (15 mins)', completed: false },
          { id: 3, description: 'Mindful Breathing Exercise (5 mins)', completed: false },
          { id: 4, description: 'Balance Pose Practice (10 mins)', completed: false },
          { id: 5, description: 'Evening Relaxation Flow (10 mins)', completed: false }
        ]
      }));
      setDays(initialDays);
    }
  }, []);

  useEffect(() => {
    const progressChart = echarts.init(document.getElementById('progressChart'));
    const completedDays = days.filter(day => day.completed).length;

    const option = {
      animation: false,
      series: [{
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
            color: '#8A6FDF'
          }
        },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [[1, '#E0E0E0']]
          }
        },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          formatter: function(value:GLfloat) {
            return `${(value).toFixed(2)}%`;
          },
          color: '#8A6FDF',
          fontSize: 24,
          fontWeight: 'bold'
        },
        data: [{
          value: (completedDays / 30) * 100
        }]
      }]
    };

    progressChart.setOption(option);

    return () => {
      progressChart.dispose();
    };
  }, [days]);

  const handleDayClick = (dayNumber: number) => {
    setSelectedDay(dayNumber);
    setShowModal(true);
  };

  const handleChallengeToggle = (dayNumber: number, challengeId: number) => {
    const updatedDays = days.map(day => {
      if (day.dayNumber === dayNumber) {
        const updatedChallenges = day.challenges.map(challenge =>
          challenge.id === challengeId
            ? { ...challenge, completed: !challenge.completed }
            : challenge
        );
        return {
          ...day,
          challenges: updatedChallenges,
          completed: updatedChallenges.every(c => c.completed)
        };
      }
      return day;
    });

    setDays(updatedDays);

    // Save updated data to local storage
    localStorage.setItem('challengeDays', JSON.stringify(updatedDays));
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-200 backdrop-blur-lg bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
          opacity: 1
        }}
      />

      <div className="container mx-auto px-4 py-8 relative">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
          30 Days Yoga Challenge
        </h1>

        <div className="w-64 h-64 mx-auto mb-8">
          <div id="progressChart" className="w-full h-full"></div>
        </div>

        <div className="grid grid-cols-7 gap-4 max-w-4xl mx-auto">
          {days.map((day) => (
            <div
              key={day.dayNumber}
              onClick={() => handleDayClick(day.dayNumber)}
              className={`
                aspect-square rounded-lg shadow-lg cursor-pointer
                transition-all duration-300 transform hover:scale-105
                flex items-center justify-center text-2xl font-bold
                ${day.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-white bg-opacity-80 text-purple-800 hover:bg-purple-100'}
              `}
            >
              {day.completed && <i className="fa fa-check-circle mr-2"></i>}
              {day.dayNumber}
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full backdrop-blur-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-800">Day {selectedDay} Challenges</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>

            <div className="space-y-4">
              {days[selectedDay - 1].challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="flex items-center space-x-3 p-2 hover:bg-purple-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={challenge.completed}
                    onChange={() => handleChallengeToggle(selectedDay, challenge.id)}
                    className="w-5 h-5 text-purple-600 rounded cursor-pointer"
                  />
                  <span className="text-gray-700">{challenge.description}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenge;

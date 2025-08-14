// src/components/Contributions.jsx
import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

const Contributions = () => {
  const [totalContributions, setTotalContributions] = useState(0);

  const theme = {
    dark: ['#f4ecec8f', '#6254aeff', '#d94cb6', '#e015c2ff', '#7b0d49ff']
  };

  return (
    <section
      id="contributions"
      className="w-full py-20 px-4 flex flex-col items-center
                 sm:px-16 max-w-7xl mx-auto scroll-mt-[80px] lg:scroll-mt-[96px]"
    >
      <h2
        className="text-4xl font-extrabold mb-12
                   bg-gradient-to-r from-[#eb3b91] to-[#6773de]
                   bg-clip-text text-transparent text-center"
      >
        My GitHub Contributions
      </h2>

      <div
        className="w-full max-w-6xl p-8 bg-[#0f0f0f]
                   rounded-3xl shadow-lg border border-[#eb3b91]/20
                   relative overflow-hidden"
      >
        <style>{`
          /* hide the built-in year picker title */
          .contrib-calendar > div:first-child > h2 {
            display: none !important;
          }

          /* force SVG fill for month/week labels */
          .contrib-calendar svg text {
            fill: #ccc !important;
          }

          /* center the legend under the grid */
          .contrib-calendar .contrib-legend {
            justify-content: center !important;
          }

          /* add breathing room above the grid */
          .contrib-calendar .calendar {
            margin-top: 2rem;
          }

          /* hide native scrollbar on inner container */
          .contrib-calendar {
            overflow: hidden !important;
          }

          /* marquee animation sliding the SVG inner calendar left ↔ right */
          @keyframes slideCalendar {
            0%   { transform: translateX(0); }
            50%  { transform: translateX(calc(-100% + 100vw)); }
            100% { transform: translateX(0); }
          }

          /* apply animation to the inner SVG wrapper */
          .contrib-calendar > div {
            display: inline-block;
            animation: slideCalendar 30s linear infinite;
          }
        `}</style>

        <div className="contrib-calendar">
          <GitHubCalendar
            username="kevinandrewsv"
            blockSize={15}
            blockMargin={5}
            fontSize={13}
            theme={theme}
            colorScheme="dark"
            monthLabels={[
              'Jan','Feb','Mar','Apr','May','Jun',
              'Jul','Aug','Sep','Oct','Nov','Dec'
            ]}
            showWeekdayLabels={true}
            transformData={contribs => {
              setTotalContributions(
                contribs.reduce((sum, day) => sum + day.count, 0)
              );
              return contribs;
            }}
          />
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center items-center space-x-3 text-sm text-[#ccc]">
          <span>Less</span>
          {theme.dark.map((clr, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-md border border-white/10"
              style={{ backgroundColor: clr }}
            />
          ))}
          <span>More</span>
        </div>

        {/* Total */}
        <p className="mt-6 text-center text-lg text-[#ccc]">
          Total contributions in the last year:{' '}
          <span className="font-semibold text-white">
            {totalContributions}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Contributions;

import React, { useState, useEffect, useRef } from 'react';

type TimeDropdownProps = {
  timeSlots: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

const TimeDropdown: React.FC<TimeDropdownProps> = ({
  timeSlots,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (time: string) => {
    const newValue = [...value];
    if (newValue.includes(time)) {
      const index = newValue.indexOf(time);
      newValue.splice(index, 1);
    } else {
      newValue.push(time);
    }
    onChange(newValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sortedTimes = [...value].sort();
  const earliestTime = sortedTimes.length > 0 ? sortedTimes[0] : 'Time';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={toggleDropdown}
        >
          {earliestTime}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 overflow-y-auto h-40"
            role="menu"
            aria-orientation="vertical"
          >
            {timeSlots.map((time, index) => (
              <label key={index} className="flex items-center px-4 py-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={value.includes(time)}
                  onChange={() => handleCheckboxChange(time)}
                />
                {time}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeDropdown;

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AddToCalendarButtonProps } from 'add-to-calendar-button-react';

const DynamicAddToCalendarButton = dynamic<AddToCalendarButtonProps>(
  () => import('add-to-calendar-button-react').then(mod => mod.AddToCalendarButton),
  {
    ssr: false,
    loading: () => (
      <div 
        className="w-full h-10 px-4 py-2 rounded-md flex items-center justify-center bg-muted text-muted-foreground animate-pulse"
      >
        Loading Calendar...
      </div>
    ),
  }
);

interface ClientAddToCalendarButtonProps {
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location?: string;
  description?: string;
  timeZone?: string;
}

const ClientAddToCalendarButton: React.FC<ClientAddToCalendarButtonProps> = (props) => {
  const {
    name,
    startDate,
    startTime,
    endDate,
    endTime,
    location,
    description,
    timeZone = 'Europe/London',
  } = props;

  // Define the desired calendar options
  const customCalendarOptions: AddToCalendarButtonProps['options'] = [
    'Apple', 
    'Google', 
    'Microsoft365',
    'Outlook.com',
    'iCal' 
  ];

  if (!name || !startDate || !startTime || !endDate || !endTime) {
    console.error("ClientAddToCalendarButton: Missing required props", props);
    return (
      <div className="w-full h-10 px-4 py-2 rounded-md flex items-center justify-center bg-destructive text-destructive-foreground">
        Calendar Data Error
      </div>
    );
  }
  
  return (
    <div className="w-full my-2"> {/* A simple wrapper for spacing, ensuring it takes width */}
      <DynamicAddToCalendarButton
        name={name}
        startDate={startDate}
        startTime={startTime}
        endDate={endDate}
        endTime={endTime}
        timeZone={timeZone}
        location={location}
        description={description}
        options={customCalendarOptions} // Pass the custom options array
        label="Add to Calendar"
        buttonStyle="default" // Using a standard library style
        lightMode="system"
        // No custom className, relying on library's own styling for its button
      />
    </div>
  );
};

export default ClientAddToCalendarButton;

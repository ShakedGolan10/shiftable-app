'use client'

const getTodayInfo = () => {
  const today = new Date();

  const dayIndex = today.getDay()
  const hour = today.getHours();
  const minute = today.getMinutes();

  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
  const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

  const time = `${formattedHour}${formattedMinute}`;

  const todayInfo = {
    dayIndex,
    time,
  };

  return todayInfo;
}


export const utilService = {
  getTodayInfo
}
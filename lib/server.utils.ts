


export const getNextSunday = (): string =>  {
      const now = new Date();
      const nowDay = now.getDay();
  
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + (7 - nowDay));
  
      const nextSundayString = nextSunday.toDateString();
  
      return nextSundayString;
}

export const getDateOfApply = (day: number, time: string): string =>  {
      const [targetHour, targetMinute] = time.split(':').map(Number);
        const now = new Date();
        const nowDay = now.getDay();
        const nowHour = now.getHours();
        const nowMinute = now.getMinutes();
        
        const isAfterTargetDay = nowDay > day || (nowDay === day && (nowHour > targetHour || (nowHour === targetHour && nowMinute > targetMinute)));
    
        const nextSunday = new Date();
        nextSunday.setDate(now.getDate() + (7 - nowDay + (isAfterTargetDay ? 7 : 0)));
    
        const nextSundayString = nextSunday.toDateString();
    
        return nextSundayString;
    }
    

    export const daysOfWeek = [
      { day: 'Sunday', key: '0' },
      { day: 'Monday', key: '1' },
      { day: 'Tuesday', key: '2' },
      { day: 'Wednesday', key: '3' },
      { day: 'Thursday', key: '4' },
      { day: 'Friday', key: '5' },
      { day: 'Saturday', key: '6' }
    ];
    
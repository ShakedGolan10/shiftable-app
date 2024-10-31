export const getThisSunday = (): string =>  {
      const now = new Date();
      const nowDay = now.getDay();
  
      const thisSunday = new Date();
      thisSunday.setDate((now.getDate() - nowDay));
  
      const thisSundayString = thisSunday.toDateString();
  
      return thisSundayString;
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
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    

    export const maxRows = (items: WeeklyShifts) => {
      const maxRowsPerColumn = Object.values(items).reduce((acc, element) => {
        return Math.max(acc, element.length)
      }, 0);
      
      return [...Array(maxRowsPerColumn)].map(() => '')
    };



export const getNextSunday = (): string =>  {
      const now = new Date();
      const nowDay = now.getDay();
  
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + (7 - nowDay));
  
      const nextSundayString = nextSunday.toDateString();
  
      return nextSundayString;
}

export const getThisSunday = (): string =>  {
      const now = new Date();
      const nowDay = now.getDay();
  
      const thisSunday = new Date();
      thisSunday.setDate((now.getDate() - nowDay));
  
      const thisSundayString = thisSunday.toDateString();
  
      return thisSundayString;
}

export const getLastSunday = (thisSunday: string): string =>  {
  
      const lastSunday = new Date(thisSunday);
      lastSunday.setDate((lastSunday.getDate() - 7));
  
      const lastSundayString = lastSunday.toDateString();
  
      return lastSundayString;
}

export const getNextSunday = (thisSunday: string): string =>  {
      const nextSunday = new Date(thisSunday);
      nextSunday.setDate((nextSunday.getDate() + 7));
  
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
    

    export const createTableRows = <T, Z>(items: T, columns: any[], valueKeyName: string) => {
      const maxRows = Object.values(items).reduce((acc, element) => {
        return Math.max(acc, element.length);
      }, 0);
      const rows: {key: string, rowItems: Z[]}[] = [];
      for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
        const rowItems = columns.map(columnElement => items[columnElement[valueKeyName].toLowerCase()]?.[rowIndex] || "");
        rows.push({
          key: rowIndex.toString(),
          rowItems
        });
      }
      return rows;
    };

    export const getEmptyTableRow = (maxRows: number, columns: any[]) => {
        const rowItems = columns.map(() => undefined);
        const row = {
          key: (maxRows+1).toString(),
          rowItems
        }
      return row;
    };

    export const generateId = () => Math.random().toString(36).substring(2, 7);

import { Log } from "./logger.js";

export async function prioritizeNotifications(notifications, n = 10) {
  await Log("frontend", "debug", "utils", "Priority calculation started");

  
  const getWeight = (type) => {
    switch (type) {
      case "Placement": return 3;
      case "Result": return 2;
      case "Event": return 1;
      default: return 0;
    }
  };

  
  const sortedNotifications = [...notifications].sort((a, b) => {
    const weightA = getWeight(a.Type);
    const weightB = getWeight(b.Type);

    
    if (weightA !== weightB) {
      return weightB - weightA; 
    }

   
    const timeA = new Date(a.Timestamp.replace(" ", "T")).getTime();
    const timeB = new Date(b.Timestamp.replace(" ", "T")).getTime();
    
    return timeB - timeA;
  });

  
  const topN = sortedNotifications.slice(0, n);

  await Log("frontend", "info", "utils", "Top N notifications generated");

  return topN;
}

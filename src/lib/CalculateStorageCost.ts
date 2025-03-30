export async function calculateStorageCost(Data: any): Promise<number> {
  try {
    const initialCost = 0.001;

    // Get keys directly from the Profile class
    const profileKeys = Object.keys(Data);

    let datastoreTotal = 0;
    for (const key of profileKeys) {
      const value = String(Data[key] || "");
      const keyBytes = new TextEncoder().encode(key).length;
      const valueBytes = new TextEncoder().encode(value).length;
      datastoreTotal += 4 + keyBytes + valueBytes;
    }
    const datastoreCost = datastoreTotal * 0.0001;
    // Total storage cost
    const totalCost = initialCost + datastoreCost;
    const buffer = 0.001;
    return totalCost + buffer + 15;
  } catch (error) {
    console.error("Error calculating storage cost:", error);
    throw error;
  }
}

const expiryDate = ()=>{
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Month between 1 and 12

    // Generate a random expiry date that is after the current date
    const randomYear = currentYear + Math.floor(Math.random() * 5); // Expiry date within the next 5 years
    const randomMonth =
      currentMonth + Math.floor(Math.random() * (12 - currentMonth + 1)); // Random month from current month to 12

    return `${randomMonth.toString().padStart(2, "0")}/${randomYear
      .toString()
      .slice(2)}`;
}

export {
    expiryDate
}
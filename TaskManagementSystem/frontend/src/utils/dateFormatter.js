export const formatIsoDate = (isoString, style = 'standard') => {
  if (!isoString) return '-';
  
  const date = new Date(isoString);

  // Customize these options based on what the UI needs!
  switch (style) {
    case 'short': 
      // Output: 11/30/2026
      return date.toLocaleDateString('en-US');
    case 'long': 
      // Output: November 30, 2026
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'standard':
    default:
      // Output: Nov 30, 2026
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
  }
};
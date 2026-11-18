export const formatIsoDate = (isoString, style = 'standard') => {
  if (!isoString) return '-';
  
  const date = new Date(isoString);

  switch (style) {
    case 'short': 
      //11/30/2026
      return date.toLocaleDateString('en-US');
    case 'long': 
      //November 30, 2026
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'standard':
    default:
      //Nov 30, 2026
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
  }
};
import React, { useEffect } from 'react';
import SportSets from '../components/SportSets';
import { useLocation } from 'react-router-dom';

export default function AllSportsSets() {
  const location = useLocation();
  // Corrected the destructuring to properly get `filtered` from `location.state`.
  const { filtered } = location.state || {};

  useEffect(() => {
    // This will now log `filtered` from the state, if it exists.
    //console.log('filtered', filtered);

  }, [filtered]); // Added `filtered` as a dependency for the `useEffect` hook.

  return <SportSets filtered={filtered} />; // Corrected the prop name to `filtered`.
}

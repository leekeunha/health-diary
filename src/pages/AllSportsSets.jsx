import React, { useEffect } from 'react';
import SportSets from '../components/SportSets';
import { useLocation } from 'react-router-dom';

export default function AllSportsSets() {
  const location = useLocation();
  const { filtered, bodyPart } = location.state || {};

  // useEffect(() => {

  // }, [filtered]);

  return <SportSets filtered={filtered} bodyPart={bodyPart} />;
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import Sports from '../components/Sports';

export default function AllSports() {
  const location = useLocation();
  const bodyPart = location.state?.bodyPart;
  return <Sports bodyPart={bodyPart} />;
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import HistoryDetails from '../components/HistoryDetails';

export default function AllHistoryDetails() {
  const location = useLocation();
  const date = location.state.date;
  return <HistoryDetails date={date} />;
}

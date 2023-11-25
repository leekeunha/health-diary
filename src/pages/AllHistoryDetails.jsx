import React from 'react';
import { useLocation } from 'react-router-dom';
import HistoryDetails from '../components/HistoryDetails';

export default function AllHistoryDetails() {
  const location = useLocation();
  //debugger;
  const date = location.state.date;
  //console.log(JSON.stringify(date));
  return <HistoryDetails date={date} />;
}

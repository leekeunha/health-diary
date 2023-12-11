import React from 'react';
import { useLocation } from 'react-router-dom';
import SportHistories from '../components/SportHistories';

export default function AllSportHistories() {
    const location = useLocation();
    const sport = location.state?.sport;
    //console.log({ sport });
    return <SportHistories sport={sport} />;
}

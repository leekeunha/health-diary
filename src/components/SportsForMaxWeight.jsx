import React, { useEffect, useState } from 'react';
import SportCard from './SportCard';
import SportCardForMaxWeight from './SportCardForMaxWeight';

import useSports from '../hooks/useSports';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useBodyPartContext } from '../context/BodyPartContext';
export default function SportsForMaxWeight() {

    const { selectedBodyPart } = useBodyPartContext();
    const {
        sportsQuery: { isLoading, error, data: fetchedSports },
    } = useSports(selectedBodyPart.id);

    const [sports, setSports] = useState([]);

    useEffect(() => {
        if (fetchedSports) {
            setSports(fetchedSports);
        }
    }, [fetchedSports]);


    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <p className='text-3xl text-center pt-3'>열람할 종목을 선택해 주세요.</p>
            <ul className='mt-10 flex flex-col'>
                {sports &&
                    sports.map((sport) => (
                        <SportCardForMaxWeight key={sport.id} sport={sport} />
                    ))}
            </ul>
        </>
    );
}

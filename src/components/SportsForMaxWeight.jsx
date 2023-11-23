import React, { useEffect, useState } from 'react';
import SportCardForMaxWeight from './SportCardForMaxWeight';
import { useLocation } from 'react-router-dom';
import useSports from '../hooks/useSports';
//import { useBodyPartContext } from '../context/BodyPartContext';

export default function SportsForMaxWeight() {

    // import React from 'react';
    // import { useLocation } from 'react-router-dom';
    // import Sports from '../components/Sports';

    // export default function AllSports() {
    const location = useLocation();
    const bodyPart = location.state?.bodyPart;
    //   return <Sports bodyPart={bodyPart} />;
    // }


    //const { selectedBodyPart } = useBodyPartContext();
    const {
        sportsQuery: { isLoading, error, data: fetchedSports },
    } = useSports(bodyPart.id);

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
            <p className='text-3xl text-center pt-3 mt-10'>열람할 종목을 선택해 주세요.</p>
            <ul className='mt-10 flex flex-col'>
                {sports &&
                    sports.map((sport) => (
                        <SportCardForMaxWeight key={sport.id} sport={sport} />
                    ))}
            </ul>
        </>
    );
}

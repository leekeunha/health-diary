import React, { useEffect } from 'react';
import SetInput from './SetInput';
import { useFormContext } from 'react-hook-form';

export default function SportSetCard({ sport, setCount, updateSetCount }) {
  //const [setCount, setSetCount] = useState(3);
  const { setValue } = useFormContext();

  useEffect(() => {
    for (let i = 0; i < setCount; i++) {
      setValue(`${sport.id}.sets.${i}.weight`, '');
      setValue(`${sport.id}.sets.${i}.reps`, '');
    }
  }, [sport, setCount, setValue]); // Update dependencies

  const handleSetCountChange = (e) => {
    updateSetCount(sport.id, parseInt(e.target.value));
  };

  const renderSetInputs = () => {
    let inputs = [];
    for (let i = 1; i <= setCount; i++) {
      inputs.push(<SetInput key={i} setNumber={i} sportId={sport.id} />);
    }
    return inputs;
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl">{sport.name} set 설정</p>
        <select
          name="setCount"
          value={setCount}
          onChange={handleSetCountChange}
          className="ml-3 p-2 border rounded text-lg"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
            <option key={number} value={number}>
              {number} sets
            </option>
          ))}
        </select>
      </div>
      {renderSetInputs()}
    </div>
  );
}
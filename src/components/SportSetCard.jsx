import React, { useEffect, useState } from 'react';
import SetInput from './SetInput';
export default function SportSetCard({ sport }) {
  const [setCount, setSetCount] = useState(3);

  useEffect(() => {
    console.log('sport:', sport);
  }, [sport]);

  // 선택된 세트 수에 따라 SetInput 컴포넌트들을 렌더링합니다.
  const renderSetInputs = () => {
    let inputs = [];
    for (let i = 1; i <= setCount; i++) {
      inputs.push(<SetInput key={i} setNumber={i} />);
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
          onChange={e => setSetCount(e.target.value)}
          className="ml-3 p-2 border rounded text-lg"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
            <option key={number} value={number}>
              {number} Set
            </option>
          ))}
        </select>
      </div>
      {renderSetInputs()}
    </div>
  );
}

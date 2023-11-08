import React, { useState } from 'react';

// SetInput 컴포넌트 정의
export default function SetInput({ setNumber }) {
    return (
        <div className="flex justify-between items-center p-4 bg-sky-100 mt-2 rounded-md">
            <label className="flex-1 mr-2">Set {setNumber}</label>
            <input
                type="number"
                placeholder="중량"
                className="border p-2 rounded mr-2 flex-1"
            />
            <input
                type="number"
                placeholder="횟수"
                className="border p-2 rounded flex-1"
            />
        </div>
    );
};


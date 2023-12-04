import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationModal = ({ isOpen, onClose, message }) => {
    const navigate = useNavigate();

    const handleConfirm = () => {
        onClose();
        navigate('/');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className='p-3 text-lg'>{message}</p>
                <div className="flex justify-center">
                    <button
                        className="bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110"
                        onClick={handleConfirm}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const NotificationBar = (props) => {
    const { onClose, isMessageSuccess, isOpen, message } = props;
    const bgColor = isMessageSuccess ? "bg-green-400" : "bg-red-700";
    const status = isMessageSuccess ? "Success" : "Error";

    if (!isOpen) return null;

    return (
        <div className="fixed flex items-center justify-center w-[500px] ">
            <div className={`flex justify-between items-center ${bgColor} bg-opacity-50 p-6  rounded-[10px] `}>
                <p className='dark:text-white'>{status}: {message}</p>
                <div>
                    <button onClick={onClose} className="outline hover:outline-slate-400 dark:outline-slate-300 outline-white text-white rounded-[4px]">
                        <XMarkIcon className='h-6 w-6 text-black dark:text-slate-300 cursor-pointer' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationBar;
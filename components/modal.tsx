import React, { ReactNode } from 'react';

// Mendefinisikan properti yang dapat diterima oleh komponen ModalForm
interface ModalProps {
    title?: string; // Props opsional untuk menentukan judul modal
    children?: ReactNode; // Props opsional untuk menentukan konten modal
    show: boolean; // Props wajib untuk menentukan apakah modal ditampilkan atau tidak
}

// Deklarasi komponen fungsi ModalForm
const ModalForm = ({ title, children, show }: ModalProps) => {
    // Render komponen ModalForm
    return (
        <div className={!show ? 'hidden' : ''}>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className='mb-5'>
                                    <div className="font-bold text-lg">
                                        {title}
                                    </div>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Ekspor komponen ModalForm sebagai default eksport
export default ModalForm;

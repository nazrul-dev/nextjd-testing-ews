import React from 'react';

// Mendefinisikan properti yang dapat diterima oleh komponen Button
interface ButtonProps {
    secondary?: boolean; // Props opsional untuk menentukan apakah tombol adalah tombol sekunder
    title: string; // Props wajib berupa judul/tulisan pada tombol
    onClick?: () => void; // Props opsional untuk menentukan fungsi yang akan dipanggil saat tombol diklik
}

// Deklarasi komponen fungsi Button
const Button = ({ secondary = false, title, onClick }: ButtonProps) => {
    // Render komponen Button
    return (
        <div>
            {!secondary ? (
                // Render tombol primer jika prop 'secondary' bernilai false
                <button
                    className={`px-4 py-1.5 rounded-lg border-none bg-indigo-800 text-white hover:bg-opacity-75`}
                    onClick={onClick}
                >
                    {title}
                </button>
            ) : (
                // Render tombol sekunder jika prop 'secondary' bernilai true
                <button
                    className={`px-4 py-1.5 rounded-lg bg-gray-200 text-gray-500  hover:bg-opacity-75`}
                    onClick={onClick}
                >
                    {title}
                </button>
            )}
        </div>
    );
};

// Ekspor komponen Button sebagai default eksport
export default Button;

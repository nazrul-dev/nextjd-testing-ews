import React, { ChangeEvent } from 'react';

// Mendefinisikan properti yang dapat diterima oleh komponen TextInput
interface TextInputProps {
    readonly?: boolean; // Props opsional untuk menentukan apakah input hanya bisa dibaca (readonly)
    textarea?: boolean; // Props opsional untuk menentukan apakah input adalah textarea
    label?: string; // Props opsional untuk menentukan label input
    placeholder?: string; // Props opsional untuk menentukan placeholder input
    value?: string; // Props opsional untuk menentukan nilai input
    onChange?: (value: any) => void; // Props opsional untuk menentukan fungsi yang akan dipanggil saat nilai input berubah
}

// Deklarasi komponen fungsi TextInput
const TextInput = ({ readonly, textarea, label, placeholder, value, onChange }: TextInputProps) => {
    // Render komponen TextInput
    return (
        <div className="mb-2 flex items-center">
            <div className="w-24">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
            </div>
            <div className="flex-1">
                {textarea ? (
                    // Render textarea jika prop 'textarea' bernilai true
                    <textarea
                        readOnly={readonly}
                        className="mt-1 p-2 border focus:outline-none focus:ring-gray-400 ring-1 ring-gray-50 rounded-md w-full read-only:text-gray-600 read-only:bg-slate-200 bg-gray-50"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange && onChange(e.target.value)}
                    />
                ) : (
                    // Render input teks jika prop 'textarea' bernilai false
                    <input
                        readOnly={readonly}
                        type="text"
                        className="mt-1 p-2 border focus-within:border-none rounded-md focus:outline-none focus:ring-gray-400 ring-1 ring-gray-50 w-full bg-gray-50 read-only:text-gray-600 read-only:bg-slate-200"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value)}
                    />
                )}
            </div>
        </div>
    );
};

// Ekspor komponen TextInput sebagai default eksport
export default TextInput;

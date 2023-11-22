import React from 'react';

// Mendefinisikan properti yang dapat diterima oleh komponen Table
interface TableProps {
    data: Array<any>; // Props wajib untuk menentukan data tabel
    onView: (row?: any) => void; // Props wajib untuk menentukan fungsi saat tombol "View" diklik
    onResolved: (row?: any) => void; // Props wajib untuk menentukan fungsi saat tombol "Resolved" diklik
    onRemove: (row?: any) => void; // Props wajib untuk menentukan fungsi saat tombol "Hapus" diklik
}


const Table = ({ data, onView, onResolved, onRemove }: TableProps) => {
    // Jika data kosong atau tidak ada, tampilkan pesan "No data available"


    if (!data || data.length === 0) {
        return <div>No data available.</div>;
    }
    const resultsData: any[] = data.map(item => ({
        id: item._id,
        repoted: item.repoted,
        title: item.title,
        description: item.description,
        dateTime: new Date(item.dateTime).toLocaleString('en-US', { timeZone: 'UTC' }),
        status: item.status,
        createdAt: new Date(item.createdAt).toLocaleString('en-US', { timeZone: 'UTC' }),
        updatedAt: new Date(item.updatedAt).toLocaleString('en-US', { timeZone: 'UTC' }),
    }));
    // Ekstrak nama-nama kolom dari objek pertama dalam array resultsData
    const columns = Object.keys(resultsData[0]);

    // Render komponen tabel
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg overflow-hidden">
                <thead className="bg-indigo-800 text-white">
                    <tr>
                        {/* Membuat header kolom */}
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`${index === 0 ? 'w-10 ' : ''}p-4 border-r border-white uppercase`}
                            >
                                {column}
                            </th>
                        ))}
                        {/* Membuat header kolom aksi */}
                        <th className={`p-4 border-r border-white uppercase`}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mengisi resultsData pada setiap baris tabel */}
                    {resultsData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* Mengisi data pada setiap kolom dalam satu baris */}
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`p-4 border-b border-r text-sm border-gray-200 bg-gray-100`}
                                >
                                    {row[column]}
                                </td>
                            ))}

                            {/* Mengisi tombol aksi pada kolom terakhir */}
                            <td className='bg-gray-100 border-b'>
                                <div className="flex space-x-2 justify-center">
                                    <button onClick={() => onView(row)} className='hover:opacity-75 text-xs p-1 px-3 font-semibold rounded-lg bg-amber-300 text-amber-800'>View</button>
                                    {row.status !== 'CLOSED' ? (
                                        <button onClick={() => onResolved(row)} className='hover:opacity-75 text-xs p-1 px-3 font-semibold rounded-lg bg-emerald-300 text-emerald-800'>Resolved</button>
                                    ) : (
                                        <button className='hover:opacity-75 text-xs p-1 px-3 font-semibold rounded-lg bg-gray-300 text-gray-800'>Closed</button>
                                    )}

                                    <button onClick={() => onRemove(row)} className='hover:opacity-75 text-xs p-1 px-3 font-semibold rounded-lg bg-rose-300 text-rose-800'>Hapus</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Ekspor komponen Table sebagai default eksport
export default Table;

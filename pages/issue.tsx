import Button from '@/components/button'
import TextInput from '@/components/input';
import Modal from '@/components/modal';
import Table from '@/components/table';
import instance from '@/utils/axios';
import React, { useState } from 'react'
import useSWR from 'swr';


const formatDate = () => {
    // Mendapatkan tanggal dan waktu saat ini
    const today = new Date();

    // Menetapkan opsi format untuk tanggal dan waktu
    const options: any = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    // Membuat objek formatter tanggal dan waktu dengan opsi yang telah ditetapkan
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);

    // Mengembalikan tanggal dan waktu yang diformat
    return formattedDate;
};


const Issue = () => {

    const [modal, setModal] = useState(false)
    const [titleModal, setTitleModal] = useState('');
    const [typeModal, setTypeModal] = useState('create');
    const [loader, setLoader] = useState(false)
    
    const [fields, setFields] = useState({
        'id': '',
        'status': '',
        'datetime': formatDate(),
        'reported': '',
        'case': '',
        'title': '',
        'description': '',
        'remark': '',
    })

    const handlerChangeInput = (e: any, state: string) => {
        setFields({ ...fields, [state]: e.target.value })
    }

    const {
        data: responData,
        isLoading,
        mutate,
    } = useSWR('/dashboard');

    // const handlerDelete = async (id: string) => {
    //     try {
    //         setLoader(true);
    //         const response: any = await instance.delete('/dashboard?id=' + id);
    //         if (response.success) {
    //             mutate(false)

    //         }
    //     } catch (error) {

    //     } finally {
    //         setLoader(false)
    //     }

    // }

    const handlerSave = async (payload: any) => {

        try {
            setLoader(true);
            let response: any;
            if (payload?.id) {
                response = await instance.put('/dashboard?id=' + payload.id, payload);
            } else {
                delete payload["id"]
                response = await instance.post('/dashboard', payload);
            }

            if (response.success) {
                setModal(false);
                mutate(false)

            }
        } catch (error) {

        } finally {
            setLoader(false)
        }
    }

    const handlerResolved = (row: any) => {
        setModal(!modal);
        setTypeModal('resolved');
        setTitleModal('+ Selesaikan Laporan');
        setFields(row)
    }

    const handlerView = (row: any) => {
        console.log(row);
        setModal(!modal);
        setTypeModal('view');
        setTitleModal('+ Detail Laporan');
        setFields(row)
    }

    const handlerAdd = () => {
        setTypeModal('create');
        setModal(!modal);
        setTitleModal('+ Buat Laporan');
        setFields({
            'id': '',
            'status': '',
            'datetime': formatDate(),
            'reported': '',
            'case': '',
            'title': '',
            'description': '',
            'remark': '',
        })

    }


    const data = [
        { id: 1, reported: 'John Doe', case: 25, title: 'New York', description: 'San Francisco', datetime: 'San Francisco', city2: 'San Francisco' },
        { id: 2, reported: 'Jane Doe', case: 30, title: 'San Francisco', description: 'San Francisco', datetime: 'San Francisco', city2: 'San Francisco' },

    ];
    return (
        <div className='container py-10 bg-white min-h-screen'>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <div className='text-lg font-bold'>
                        Daftar Laporan
                    </div>
                    <p className='text-sm text-gray-500'>Kelola semua laporan yang telah dibuat</p>
                </div>
                <div>
                    <Button onClick={handlerAdd} title="+ Buat Laporan" />
                </div>
            </div>


            <div className='bg-white p-1 rounded-lg'>
                <Table onView={(e) => handlerView(e)} onResolved={(e) => handlerResolved(e)} onRemove={(e) => handlerView(e)} data={data} />
            </div>
            <Modal title={titleModal} show={modal}>
                <div>
                    {typeModal !== 'create' && (
                        <TextInput readonly label="ID" placeholder="ID" value={fields?.id} />
                    )}

                    <TextInput readonly label="Date Time" placeholder="Date Time" value={fields.datetime} />
                    <TextInput readonly={typeModal === 'view'} label="Reported" placeholder="Reported" value={fields.reported} onChange={(e) => handlerChangeInput(e, 'reported')} />
                    <TextInput readonly={typeModal === 'view'} label="Case #" placeholder="Case #" value={fields.case} onChange={(e) => handlerChangeInput(e, 'case')} />
                    <TextInput readonly={typeModal === 'view'} label="Title" placeholder="Title" value={fields.title} onChange={(e) => handlerChangeInput(e, 'title')} />
                    <TextInput readonly={typeModal === 'view'} label="Description" placeholder="Description" value={fields.description} onChange={(e) => handlerChangeInput(e, 'description')} />
                    {typeModal !== 'create' && (
                        <div className='border-t pt-3 border-indigo-800'>
                            <TextInput readonly={typeModal === 'view'} textarea label="Remark" placeholder="Type something..." value={fields.remark} onChange={(e) => handlerChangeInput(e, 'remark')} />
                        </div>
                    )}
                    <div className='flex justify-end gap-2'>
                        <Button secondary onClick={() => setModal(false)} title="Keluar" />
                        <Button onClick={() => setModal(false)} title={` ${loader ? '...' : 'Simpan'}`} />
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default Issue

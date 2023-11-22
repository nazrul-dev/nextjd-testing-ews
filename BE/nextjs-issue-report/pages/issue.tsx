import Radio from '@/components/Radio';
import Button from '@/components/button';
import TextInput from '@/components/input';
import Modal from '@/components/modal';
import Table from '@/components/table';
import instance from '@/utils/axios';
import React, { useState } from 'react';
import useSWR from 'swr';

const formatDate = () => {
    const today = new Date();
    const options: object = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);
    return formattedDate;
};

const Issue = () => {
    const [modal, setModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [typeModal, setTypeModal] = useState('create');
    const [loader, setLoader] = useState(false);

    const [fields, setFields] = useState({
        'id': '',
        'status': 'OPEN',
        'dateTime': formatDate(),
        'reported': '',
        'title': '',
        'description': '',
        'remark': '',
    });

    const handleChangeInput = (e: string, state: string) => {
        setFields({ ...fields, [state]: e });
    };

    const { data: responseData, mutate } = useSWR('issue-report');

    const handleDelete = async (row: any) => {
        try {
            setLoader(true);
            const response: any = await instance.delete('/issue-report/' + row.id);
            if (response.success) {
                mutate(false);
            }
        } catch (error) {
        } finally {
            setLoader(false);
        }
    };

    const saveIssue = async () => {
        try {
            const payload = {
                'dateTime': new Date(),
                'reported': fields.reported,
                'title': fields.title,
                'description': fields.description,
            };
            const response: any = await instance.post('issue-report', payload);
            if (response.success) {
                setModal(false);
                mutate(false);
            }
        } catch (error) {
        } finally {
            setLoader(false);
        }
    };

    const resolvedIssue = async () => {
        try {
            setLoader(true);
            const payload = {
                'remark': fields.remark,
                'status': fields.status,
            };
            const response: any = await instance.put('/issue-report/' + fields.id, payload);
            if (response.success) {
                setModal(false);
                mutate(false);
            }
        } catch (error) {
        } finally {
            setLoader(false);
        }
    };

    const handleResolved = (row: any) => {
        setModal(!modal);
        setTypeModal('resolved');
        setTitleModal('+ Selesaikan Laporan');
        setFields(row);
    };

    const handleView = (row: any) => {
        setModal(!modal);
        setTypeModal('view');
        setTitleModal('+ Detail Laporan');
        setFields(row);
    };

    const handleAdd = () => {
        setTypeModal('create');
        setModal(!modal);
        setTitleModal('+ Buat Laporan');
        setFields({
            'id': '',
            'status': '',
            'dateTime': formatDate(),
            'reported': '',
            'title': '',
            'description': '',
            'remark': '',
        });
    };

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
                    <Button onClick={handleAdd} title="+ Buat Laporan" />
                </div>
            </div>

            {responseData ? (
                <div className='bg-white p-1 rounded-lg'>
                    <Table onView={(e) => handleView(e)} onResolved={(e) => handleResolved(e)} onRemove={(e) => handleDelete(e)} data={responseData.result} />
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-56 border'>
                    LOADING ...
                </div>
            )}

            <Modal title={titleModal} show={modal}>
                <div>
                    {typeModal !== 'create' && (
                        <TextInput readonly label="ID" placeholder="ID" value={fields?.id} />
                    )}

                    <TextInput readonly label="Date Time" placeholder="Date Time" value={fields.dateTime} />

                    {typeModal !== 'create' && (
                        <div className="mb-2 flex items-center">
                            <div className="w-24">
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                            </div>
                            <div className="flex-1">
                                <div className='flex gap-2'>
                                    <Radio
                                        label="OPEN"
                                        name="radioGroup"
                                        value="OPEN"
                                        checked={fields.status === 'OPEN'}
                                        onChange={(e) => handleChangeInput(e, 'status')}
                                    />
                                    <Radio
                                        label="CLOSED"
                                        name="radioGroup"
                                        value="CLOSED"
                                        checked={fields.status === 'CLOSED'}
                                        onChange={(e) => handleChangeInput(e, 'status')}
                                    />
                                    {/* Add more Radio components as needed */}
                                </div>
                            </div>
                        </div>
                    )}

                    <TextInput readonly={typeModal !== 'create'} label="reported" placeholder="reported" value={fields.reported} onChange={(e) => handleChangeInput(e, 'reported')} />
                    <TextInput readonly={typeModal !== 'create'} label="Title" placeholder="Title" value={fields.title} onChange={(e) => handleChangeInput(e, 'title')} />
                    <TextInput readonly={typeModal !== 'create'} label="Description" placeholder="Description" value={fields.description} onChange={(e) => handleChangeInput(e, 'description')} />

                    {typeModal !== 'create' && (
                        <div className='border-t pt-3 border-indigo-800'>
                            <TextInput readonly={typeModal === 'view'} textarea label="Remark" placeholder="Type something..." value={fields.remark} onChange={(e) => handleChangeInput(e, 'remark')} />
                        </div>
                    )}

                    <div className='flex justify-end gap-2'>
                        <Button secondary onClick={() => setModal(false)} title="Keluar" />
                        {typeModal !== 'view' && (
                            <Button onClick={() => typeModal === 'resolved' ? resolvedIssue() : saveIssue()} title={` ${loader ? '...' : 'Simpan'}`} />
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Issue;

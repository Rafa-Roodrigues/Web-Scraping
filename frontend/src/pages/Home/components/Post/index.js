import { useState } from 'react';
import toast from 'react-hot-toast';

import { Modal } from '../../../../components/Modal';

import { dateBrazilian } from '../../../../utils/formatDate';
import { api } from '../../../../services/axios';

import './style.scss';

export function Post({data}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [post, setPost] = useState({});

    async function handleGetPost(id) {
        try {
            const response = await api.get(`/posts/${id}`);
            setPost(response.data);
            setIsOpenModal(true);

        } catch(error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className='post'>
                <p className='title'>{data.title}</p>
                <p className='theme'>{data.typePost}</p>
                <p className='date'>{dateBrazilian(data.date)}</p>
                <button className='button' onClick={() => handleGetPost(data.id)}>
                    Ver detalhes
                </button>
            </div>
            <Modal data={post} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}/>
        </>
    )
}
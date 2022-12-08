import { dateBrazilian } from '../../utils/formatDate';

import './style.scss';

export function Modal({ data, isOpenModal, setIsOpenModal }) {
    return (
        <div className={`container_modal ${isOpenModal ? 'd_flex' : 'd_none'}`}>
            <div className="box_content">
                <h2>{data.title}</h2>
                <p>{data.subtitle}</p>
                <a href={data.url} target="_blank">{data.url}</a>
                <p>{dateBrazilian(data.date)}</p>
                <p>{data.typePost}</p>
                <button onClick={() => setIsOpenModal(false)}>Fechar modal</button>
            </div>
        </div>
    );
}

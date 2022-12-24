import './style.scss';

export function Loading({ isLoading }) {
    return (
        <div className={`container_loading ${isLoading ? 'd_flex' : 'd_none'}`}>
            <div className="box_loading">
                <div className="box_animation">
                <span className="loading">Buscando os dados</span>
                <div className="lds_ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </div>
    );
}
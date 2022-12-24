import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import ptBr from 'date-fns/locale/pt-BR';
import Select from 'react-select';

import { usePosts } from '../../../../context/PostContext';
import { api } from '../../../../services/axios';
import { dateAmerican } from '../../../../utils/formatDate';
import { useTypePosts } from '../../../../context/TypePostsContext';

import './style.scss';

export function Filter() {
    const {setPosts} = usePosts();
    const {typePosts, setTypePosts} = useTypePosts();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [typePostSelected, setTypePostSelected] = useState({});
  
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    async function handleFilterPosts(e) {
        e.preventDefault();

        if(!startDate && !endDate && !typePostSelected.value){
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
                return;
            } catch(error) {
                toast.error(error.response.data.message);
                return;
            }
        }

        let query = '/posts/filter?';
        
        if(startDate) {
            query += `dataInicial=${dateAmerican(startDate)}`
        }

        if(endDate) {
            query += `&dataFinal=${dateAmerican(endDate)}`
        }

        if(typePostSelected.value) {
            query += `&typePost=${typePostSelected.value}`
        }

        try {
            const response = await api.get(query);
            setPosts(response.data);
        } catch(error) {
            toast.error(error.response.data.message);
        }
    }

    async function getTypePosts() {
        try {
            const response = await api.get('/posts/typeposts');
            const typePostsFormated = response.data.map(post => ({
                value: post.name.toLowerCase(),
                label: post.name
            }));

            setTypePosts([{
                label: 'Selecione um topico',
                value: ''
            }, ...typePostsFormated]);

        } catch(error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getTypePosts();
    }, []);

    return (
        <section className="max_box">
            <form onSubmit={handleFilterPosts}>
                <label className='label_date' onClick={e => e.preventDefault()}>
                    <p>Selecione um intervalo de datas</p>
                    <DatePicker
                        className={`w-100 rounded px-2`}
                        startDate={startDate}
                        endDate={endDate}
                        monthsShown={1}
                        locale={ptBr}
                        onChange={onChange}
                        dateFormat="dd/MM/yyyy"
                        formatWeekDay={nameOfDay => nameOfDay.substring(0,1)} 
                        dateFormatCalendar="LLLL"
                        selectsRange
                        disabledKeyboardNavigation
                        shouldCloseOnSelect={true}
                    />
                </label>
                
                <label className='label_select'>
                    <p>Selecione um topico</p>
                    <Select 
                        className='select' 
                        options={typePosts} 
                        placeholder=""
                        onChange={(value) => setTypePostSelected(value)}
                        defaultValue={{ label: "Selecione um topico", value: '' }}
                        components={{
                            DropdownIndicator:() => null, 
                            IndicatorSeparator:() => null 
                        }}
                    />
                </label>
                
                <button className='button_filter' type="submit">Aplicar Filtro</button>
            </form>
        </section>
    );
}
import React, { useState, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';

function TeacherList () {
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => {
        async function searchTeachers() {
            const response = await api.get('classes', {
                params: {
                   subject,
                   week_day,
                   time 
                }
            })
    
            setTeachers(response.data)
        }
        
        searchTeachers()
    }, [subject, week_day, time])

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Biologia', label: 'Biologia'},
                            {value: 'Química', label: 'Química'},
                            {value: 'Física', label: 'Física'},
                            {value: 'História', label: 'História'},
                            {value: 'Geografia', label: 'Geografia'},
                            {value: 'Matemática', label: 'Matemática'},
                            {value: 'Educação física', label: 'Educação física'},    
                            {value: 'Português', label: 'Português'},                                
                        ]}
                        onChange={e => {setSubject(e.target.value)}}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-feira'},
                            {value: '2', label: 'Terça-feira'},
                            {value: '3', label: 'Quarta-feira'},
                            {value: '4', label: 'Quinta-feira'},
                            {value: '5', label: 'Sexta-feira'},
                            {value: '6', label: 'Sábado'},
                        ]}
                        onChange={e => {setWeekDay(e.target.value)}}
                    />
                    <Input type="time" name="time" label="Hora" value={time} onChange={e => {setTime(e.target.value)}}/>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList;
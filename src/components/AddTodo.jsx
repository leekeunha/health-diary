import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddTodo.module.css';
import Button from './ui/Button';
import { addSport } from '../api/firebase';

export default function AddTodo({ bodyPart, onAdd }) {
    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.trim().length === 0) {
            return;
        }

        const exerciseId = uuidv4();
        await addSport(bodyPart.id, exerciseId, text);
        onAdd({ id: exerciseId, name: text });
        setText('');
    };
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type='text'
                placeholder='운동종목 추가'
                value={text}
                onChange={handleChange}
            />
            <Button text="추가" className={'m-1 w-[100px] h-[3rem]'}></Button>
        </form>
    );
}

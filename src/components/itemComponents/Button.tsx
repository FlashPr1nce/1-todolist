import React from 'react';
import { FilterValuesType } from '../../App';

type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    isDisabled?: boolean
    classes?: string
}

export const Button = ({title, onClickHandler, isDisabled, classes}:ButtonPropsType) => {
    return (
        <button onClick={onClickHandler} disabled={isDisabled} className={classes}>
            {title}
        </button>
    );
};


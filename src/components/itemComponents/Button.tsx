import React from 'react';
import { FilterValuesType } from '../../App';
import {Button, ButtonProps} from "@mui/material";

type ButtonPropsType = ButtonProps & {
    title: string;
    onClickHandler?: () => void;
    isDisabled?: boolean;
    classes?: string;
}

export const Btn: React.FC<ButtonPropsType> = ({title, onClickHandler, isDisabled, classes, ...buttonProps}:ButtonPropsType) => {
    return (
        <Button {...buttonProps} onClick={onClickHandler} disabled={isDisabled} className={classes}>
            {title}
        </Button>
    );
};


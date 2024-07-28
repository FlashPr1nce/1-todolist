import React, {memo} from 'react';
import {Button, ButtonProps} from "@mui/material";

type ButtonPropsType = ButtonProps & {
    title: string;
    onClickHandler?: () => void;
    isDisabled?: boolean;
    classes?: string;
}

export const Btn: React.FC<ButtonPropsType> = memo(({title, onClickHandler, isDisabled, classes, ...buttonProps}:ButtonPropsType) => {

    console.log('Button')

    return (
        <Button {...buttonProps} onClick={onClickHandler} disabled={isDisabled} className={classes}>
            {title}
        </Button>
    );
})


import React from "react";
import styles from "./FormControls.module.css";

export const Textarea = ({input, meta, ...props}) => {//input и meta приходят по умолчанию в пропсах,
    // теперь пропсы будут содержать все, кроме input и meta //77 урок

    const hasError = meta.touched && meta.error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <textarea {...input} {...props}/>
                {hasError &&
                    <span>{meta.error}</span>
                }
            </div>
        </div>
    );
}

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input} {...props}/>
                {hasError &&
                    <span>{meta.error}</span>
                }
            </div>
        </div>
    );
}
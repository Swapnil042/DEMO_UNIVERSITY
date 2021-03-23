import React from 'react';
import { useHistory } from 'react-router-dom';

import classes from './Form.module.css';

const Form = (props)=>{
    const history = useHistory();

    const onGoBack = ()=>{
        history.goBack();
    }

    return(
        <div className={classes.mainForm}>
            <div className={classes.innerForm}>
                {props.allState.map((value, idx)=>{
                    return (
                        <div key={idx} className={classes.inputDiv}>
                            <div className={classes.labelDiv}>
                                <label>{value[0]}</label>
                            </div>
                            <div className={classes.inDiv}>
                                <input className={classes.text} type='text' value={value[1]} onChange={e=>{
                                    value[2](e.target.value);
                                }}/>
                                {value[3] ? <p className={classes.error}>{value[3]}</p>:null}
                            </div>
                        </div>
                    );
                })}
            <div className={classes.inputDiv}>
                <button className={classes.button} onClick={props.action}>{props.actionName}</button>
                <button className={classes.backButton} onClick={onGoBack}>Go Back</button>
            </div>
            {props.error.error? <p className={classes.error}>{props.error.error}</p>:null}
            </div>
        </div>
    )
}

export default Form
import React from 'react';
import cl from './_CustomTooltip.module.scss'

const CustomTooltip = ({ active, payload, dataKey }: any) => {
    if (active && payload && payload.length) {
        const _payload = payload[0].payload
        let text = `${_payload.name}: ${_payload[dataKey]}`
        if ('text' in _payload)
            text = _payload.text
        return (
            <div className={cl.tooltip}>
                <p className={cl.text}>{text}</p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
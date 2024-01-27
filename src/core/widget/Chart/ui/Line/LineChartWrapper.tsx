import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from "core/widget/Chart/components/tooltip/CustomTooltip";
import {EColors} from "core/data/data";
import ChartWrapper from "core/widget/Chart/components/wrapper/ChartWrapper";

interface LineChartWrapperProps {
    dataKey: string;
    data?: object[];
    title?: string
    fill?: string
    className?: string;
}

const LineChartWrapper: React.FC<LineChartWrapperProps> = ({dataKey, data, title, fill = EColors.Purple, className}) => {
    return (
        <ChartWrapper title={title} isLoading={data === undefined}>
            <LineChart className={className} width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip dataKey={dataKey} />} />
                <Legend />
                <Line type="monotone" dataKey={dataKey} stroke={fill} activeDot={{ r: 8 }} />
            </LineChart>
        </ChartWrapper>
    );
};

export default LineChartWrapper;
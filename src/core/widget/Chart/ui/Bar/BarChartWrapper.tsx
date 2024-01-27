import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from "core/widget/Chart/components/tooltip/CustomTooltip";
import ChartWrapper from "core/widget/Chart/components/wrapper/ChartWrapper";
import {EColors} from "core/data/data";


interface BarChartWrapperProps {
    dataKey: string;
    data?: object[];
    title?: string
    fill?: string
    className?: string;
}

const BarChartWrapper: React.FC<BarChartWrapperProps> = ({ dataKey, data, title, fill=EColors.Purple, className }) => {
    return (
        <ChartWrapper title={title} isLoading={data === undefined}>
            <BarChart className={className} width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip dataKey={dataKey} />} />
                <Legend />
                <Bar dataKey={dataKey} fill={fill} />
            </BarChart>
        </ChartWrapper>
    );
};
export default BarChartWrapper;
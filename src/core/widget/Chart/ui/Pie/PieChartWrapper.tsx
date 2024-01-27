import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import CustomTooltip from "core/widget/Chart/components/tooltip/CustomTooltip";
import {DataColorsPurpleToBlue, EColors} from "core/data/data";
import ChartWrapper from "core/widget/Chart/components/wrapper/ChartWrapper";

interface PieChartWrapperProps {
    dataKey: string;
    data?: object[];
    title?: string
    fill?: string
    className?: string;
}

const PieChartWrapper: React.FC<PieChartWrapperProps> = ({dataKey, data, title, fill = EColors.Purple, className}) => {
    const colors = DataColorsPurpleToBlue;

    return (
        <ChartWrapper title={title} isLoading={data === undefined}>
            <PieChart className={className} width={500} height={200}>
                <Pie data={data}
                    cx={240}
                    cy={100}
                    innerRadius={40}
                    outerRadius={80}
                    fill={fill}
                    dataKey={dataKey}
                >
                    {data && data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip dataKey={dataKey} />} />
            </PieChart>
        </ChartWrapper>
    );
};

export default PieChartWrapper;
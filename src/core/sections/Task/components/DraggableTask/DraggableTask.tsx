// Определение типов
import React, {ReactNode} from "react";
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
import {ITask} from "core/entity/Task/model/model";

const ItemTypes = {
    TASK: 'task',
    LIST: 'list'
};

interface DraggableTaskProps {
    task: ITask
    children: ReactNode
}

// Компонент для перетаскиваемой задачи
// const DraggableTask: React.FC<DraggableTaskProps> = ({ task, children }) => {
//     // const [{ isDragging }, drag] = useDrag({
//     //     item: { type: ItemTypes.TASK, id },
//     //     collect: (monitor) => ({
//     //         isDragging: !!monitor.isDragging()
//     //     })
//     // });
//
//     const { dispatch } = useAppState();
//     const [, drag, preview] = useDrag({
//         type: ItemTypes.TASK,
//         item: () => dispatch({ type: ItemTypes.TASK, payload: task }),
//         end: () => dispatch({ type: ItemTypes.TASK, payload: undefined }),
//
//     });
//
//     return (
//         <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
//             {children}
//         </div>
//     );
// };

// export default DraggableTask;
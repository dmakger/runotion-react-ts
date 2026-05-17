import React from 'react';
import HeaderTable from "core/widget/Table/components/Header/HeaderTable";
import {ITable} from "core/widget/Table/model/model";
import ContentTable from "core/widget/Table/components/Content/ContentTable";
import cl from './_Table.module.scss'
import {cls} from "core/service/cls";
import LoadingLoop from "core/widget/Loading/ui/loop/LoadingLoop";

interface TableProps {
    table?: ITable
    className?: string
}

const Table = ({table, className}: TableProps) => {
    if (table === undefined)
        return <LoadingLoop/>
    const content = table.content || []
    const pagination = table.pagination
    return (
        <div className={cls(cl.wrapper, className)}>
            <table className={cl.table}>
                <HeaderTable line={table.header}/>
                <ContentTable content={content} onClick={table.onLineClick}/>
            </table>
            {content.length === 0 &&
                <div className={cl.empty}>
                    <div className={cl.emptyMark}>∅</div>
                    <span>{table.emptyText || 'Записей пока нет'}</span>
                </div>
            }
            {pagination && pagination.pages > 0 &&
                <div className={cl.pagination}>
                    <div className={cl.limit}>
                        <span>Показывать</span>
                        <select value={pagination.limit}
                                onChange={(event) => pagination.onLimitChange(Number(event.target.value))}>
                            {(pagination.limits || [10, 20, 30, 50]).map(limit => (
                                <option value={limit} key={limit}>{limit}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cl.pages}>
                        <button type="button"
                                disabled={pagination.currentPage <= 1}
                                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}>
                            Назад
                        </button>
                        <span>{pagination.currentPage} / {pagination.pages}</span>
                        <button type="button"
                                disabled={pagination.currentPage >= pagination.pages}
                                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}>
                            Вперед
                        </button>
                    </div>
                    <div className={cl.count}>Всего: {pagination.count}</div>
                </div>
            }
        </div>
    );
};

export default Table;

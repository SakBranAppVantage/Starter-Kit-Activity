import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Table, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LifeListDataFragment, useListLivesQuery } from '../../../api';
import PaginatedTable from '../../../components/PaginatedTable';
import InternalErrorResult from '../../../components/results/InternalErrorResult';
import useListReducer from './useListReducer';
import LifeListActions from './LifeListActions';
import LifeEmptyListResult from './LifeEmptyListResult';
import moment from 'moment';

const renderBooleanIcon = (value: boolean) => (
    <Typography.Text type={value ? 'success' : 'danger'}>
        {value ? <CheckCircleFilled /> : <CloseCircleFilled />}
    </Typography.Text>
);

const LifeList = () => {
    const { t } = useTranslation('lifeList');

    // get state from a reducer
    const [state, dispatch] = useListReducer();

    // fetch data
    const { page, pageSize, sort } = state;
    const { data, loading, error } = useListLivesQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            pagination: { offset: (page - 1) * pageSize, limit: pageSize },
            sort,
        },
    });

    // prepare items as a data source
    const dataSource = useMemo(() => (data?.list?.items || []).map(item => ({ ...item, key: item.id })), [data]);
    const total = data?.list?.count || 0;

    if (!loading) {
        if (error) {
            return <InternalErrorResult />;
        }

        if (dataSource.length === 0) {
            return <LifeEmptyListResult />;
        }
    }

    return (
        <div className="responsive-table-container">
            <PaginatedTable
                dataSource={dataSource}
                dispatch={dispatch}
                loading={loading}
                rowKey="id"
                state={state}
                total={total}
                scroll={{ x: 1500 }}
            >
                <Table.Column key="firstName" dataIndex="firstName" title={t('First Name')} />
                <Table.Column key="lastName" dataIndex="lastName" title={t('Last Name')} />
                <Table.Column key="fullName" dataIndex="fullName" title={t('FullName')} />
                <Table.Column
                    key="birthDay"
                    dataIndex="birthDay"
                    title={t('BirthDay')}
                    render={text => moment(text).format('YYYY-MM-DD')}
                />
                <Table.Column key="title" dataIndex="title" title={t('Title')} />
                <Table.Column key="description" dataIndex="description" title={t('Description')} />
                <Table.Column key="hobbies" dataIndex="hobbies" title={t('Hobbies')} />
                <Table.Column<LifeListDataFragment>
                    key="actions"
                    align="right"
                    render={(value, record) => <LifeListActions life={record} />}
                    title={t('Action')}
                />
            </PaginatedTable>
        </div>
    );
};

export default LifeList;

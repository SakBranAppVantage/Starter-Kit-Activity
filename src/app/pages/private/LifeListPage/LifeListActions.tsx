import { Divider, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LifeListDataFragment, UserListDataFragment } from '../../../api';

export type LifeListActionsProps = { life: LifeListDataFragment };

const LifeListActions = ({ life }: LifeListActionsProps) => {
    const { t } = useTranslation('userList');

    return (
        <Space size="small" split={<Divider type="vertical" />}>
            <Link to={`/private/system/Life/${life.id}`}>{t('View')}</Link>
            <Link to={`/private/system/Life/${life.id}/update`}>{t('Update')}</Link>
        </Space>
    );
};

export default LifeListActions;

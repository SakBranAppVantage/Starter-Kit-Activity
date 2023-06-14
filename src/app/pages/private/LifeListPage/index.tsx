import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ConsolePageWithHeader from '../../../layouts/ConsoleLayout/ConsolePageWithHeader';
import useGoTo from '../../../utilities/useGoTo';
import LifeList from './UserList';

const LifeListPage = () => {
    const { t } = useTranslation('userList');

    const goToNewUserPage = useGoTo('/private/system/Life/New');

    const extra = (
        <Button icon={<PlusOutlined />} onClick={goToNewUserPage} type="primary">
            {t('New Life')}
        </Button>
    );

    return (
        <ConsolePageWithHeader extra={extra} subTitle={t('userList:subTitle')} title={t('userList:title')}>
            <LifeList />
        </ConsolePageWithHeader>
    );
};

export default LifeListPage;

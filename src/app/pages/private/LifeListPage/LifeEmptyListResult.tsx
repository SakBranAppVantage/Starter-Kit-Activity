import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import NoItemResult from '../../../components/results/NoItemResult';
import useGoTo from '../../../utilities/useGoTo';

const LifeEmptyListResult = () => {
    const { t } = useTranslation('userList');

    // new country link
    const goToNewUserPage = useGoTo('/private/system/Life/new');

    return (
        <NoItemResult
            extra={
                <Button onClick={goToNewUserPage} type="primary">
                    {t('No Data')}
                </Button>
            }
            subTitle={t('No Data')}
        />
    );
};

export default LifeEmptyListResult;

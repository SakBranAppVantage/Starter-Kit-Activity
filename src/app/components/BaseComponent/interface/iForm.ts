import { iFormItem } from './iFormItem';

export interface iForm {
    name: string;
    onFinish: Function;
    onFinishFailed: Function;
    layout?: object;
    tailLayout?: object;
    autoComplete?: 'on' | 'off';
    initialValues?: { remember: true } | { remember: false };
    formItems: iFormItem[];
}

export default iForm;

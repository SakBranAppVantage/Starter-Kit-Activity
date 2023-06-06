import iSelect from './iSelect';

export interface iFormItem {
    label: string;
    name: string;
    type: 'text' | 'number' | 'select' | 'password' | 'textarea' | 'date';
    selectList?: iSelect[];
    onChange?: Function;
    rules: any[];
    placeholder: string;
    style?: object;
    mode?: 'multiple' | null;
}

export default iFormItem;
// interface BaseRule {
//     warningOnly?: boolean;
//     enum?: StoreValue[];
//     len?: number;
//     max?: number;
//     message?: string | ReactElement;
//     min?: number;
//     pattern?: RegExp;
//     required?: boolean;
//     transform?: (value: StoreValue) => StoreValue;
//     type?: RuleType;
//     whitespace?: boolean;
//     /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
//     validateTrigger?: string | string[];
// }

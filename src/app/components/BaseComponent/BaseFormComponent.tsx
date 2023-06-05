import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import iForm from './interface/iForm';
import iSelect from './interface/iSelect';

const BaseForm = ({ form }: { form: iForm }) => {
    const onFinish = (values: any) => {
        form.onFinish(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        form.onFinishFailed(errorInfo);
    };

    return (
        <Form
            name={form.name}
            {...form.layout}
            autoComplete={form.autoComplete}
            initialValues={form.initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {form?.formItems?.map((item, index) => {
                if (item.type === 'password') {
                    return (
                        <Form.Item key={item.name} label={item.label} name={item.name} rules={item.rules}>
                            <Input.Password placeholder={item.placeholder} />
                        </Form.Item>
                    );
                }
                if (item.type === 'number') {
                    return (
                        <Form.Item key={item.name} label={item.label} name={item.name} rules={item.rules}>
                            <InputNumber placeholder={item.placeholder} />
                        </Form.Item>
                    );
                }
                if (item.type === 'date') {
                    return (
                        <Form.Item
                            key={item.name}
                            getValueFromEvent={onChange => moment(onChange).format('YYYY-MM-DD')}
                            getValueProps={i => ({ value: moment(i) })}
                            label={item.label}
                            name={item.name}
                            rules={item.rules}
                        >
                            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                        </Form.Item>
                    );
                }
                if (item.type === 'textarea') {
                    return (
                        <Form.Item key={item.name} label={item.label} name={item.name} rules={item.rules}>
                            <Input.TextArea placeholder={item.placeholder} />
                        </Form.Item>
                    );
                }
                if (item.type === 'select') {
                    return (
                        <Form.Item key={item.name} label={item.label} name={item.name} rules={item.rules}>
                            <Select
                                // defaultValue="lucy"
                                onChange={(value: string, option: iSelect | iSelect[]) => {
                                    if (item.onChange) {
                                        item.onChange(value, option);
                                    }
                                }}
                                options={item.selectList}
                                style={item.style}
                            />
                        </Form.Item>
                    );
                }

                return (
                    <Form.Item key={item.name} label={item.label} name={item.name} rules={item.rules}>
                        <Input placeholder={item.placeholder} type="text" />
                    </Form.Item>
                );
            })}

            <Form.Item {...form.tailLayout}>
                <Button htmlType="submit" type="primary">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BaseForm;

import { useNavigate } from 'react-router';
import { CreateLifeMutationVariables, Life, useCreateLifeMutation } from '../../../api';
import BaseForm from '../../../components/BaseComponent/BaseFormComponent';
import iForm from '../../../components/BaseComponent/interface/iForm';
import iFormItem from '../../../components/BaseComponent/interface/iFormItem';
import ModalMsg from '../../../components/Modal/ModalComponent';

const LifePage = () => {
    const [createLifeMutation, { loading, error }] = useCreateLifeMutation();
    const navigate = useNavigate();
    const onFinish = async (values: Life) => {
        try {
            // for (var i = 0; i < 100000; i++) {
            const birthDate: Date = new Date(values.birthDay);
            const data: CreateLifeMutationVariables = {
                ...values,
                // firstName: crypto.randomUUID(),
                // lastName: crypto.randomUUID(),
                birthDay: birthDate.toISOString(),
                hobbies: values.hobbies,
            };

            const response = await createLifeMutation({ variables: data });
            // }

            if (response.data) {
                navigate('/private/system/Life');
                // alert(JSON.stringify(response.data));
            }
            if (response.errors) {
                alert(response.errors[0].message);
            }
            // }
        } catch (exception) {
            // alert(exception);

            console.log(exception);
        }

        // return <ModalMsg message="Success" title="Success" />;
    };

    const onFinishFailed = (errorInfo: any) => {
        <ModalMsg message={JSON.stringify(errorInfo)} title="Error" />;
    };

    const firstName: iFormItem = {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Please enter your first name.',
        type: 'text',
        rules: [{ required: true, message: 'Firstname is required' }],
    };

    const lastName: iFormItem = {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Please enter your last name.',
        type: 'text',
        rules: [{ required: true, message: 'Lastname is required' }],
    };

    const birthDay: iFormItem = {
        name: 'birthDay',
        label: 'Birthday',
        placeholder: 'Please select your Birthday',
        type: 'date',
        rules: [{ required: true, message: 'Birthday is required' }],
    };

    const title: iFormItem = {
        name: 'title',
        label: 'Title',
        placeholder: 'Please enter your desire title',
        type: 'text',
        rules: [{ required: true, message: 'Title is required' }],
    };

    const description: iFormItem = {
        name: 'description',
        label: 'Description',
        placeholder: 'Description....',
        type: 'text',
        rules: [{ required: true, message: 'Description is required' }],
    };

    const hobbies: iFormItem = {
        name: 'hobbies',
        label: 'hobbies',
        placeholder: 'hobbies....',
        type: 'select',
        mode: 'multiple',
        rules: [{ required: true, message: 'Description is required' }],
        selectList: [
            { value: 'Coding', label: 'Coding', disabled: false },
            { value: 'Writing', label: 'Writing', disabled: false },
            { value: 'Reading', label: 'Reading', disabled: false },
            { value: 'Watching movies', label: 'Watching movies', disabled: false },
            { value: 'Dancing', label: 'Dancing', disabled: false },
            { value: 'Talking', label: 'Talking', disabled: false },
        ],
    };

    const formItems: iFormItem[] = [firstName, lastName, birthDay, title, description, hobbies];
    const Form: iForm = {
        name: 'basic',
        onFinish,
        onFinishFailed,
        formItems,
        layout: {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        },
        tailLayout: { wrapperCol: { offset: 8, span: 8 } },
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return <BaseForm form={Form} />;
};

export default LifePage;

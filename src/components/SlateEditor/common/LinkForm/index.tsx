import { Form, Button, Input, FormProps } from "antd";
import { FC, useContext, useEffect } from "react";
import { StateContext } from "../../context";
import "./index.css";

type LinkFormProps = {
  formProps?: FormProps;
  onFinish?: (values: { href: string; text: string }) => void;
};

const LinkForm: FC<LinkFormProps> = ({ formProps, onFinish }) => {
  const state = useContext(StateContext);

  const [form] = Form.useForm();

  const text = Form.useWatch<string>("text", form);
  const href = Form.useWatch<string>("href", form);

  useEffect(() => {
    if (state.link) {
      form.setFieldsValue({
        text: state.link.linkText,
        href: state.link.href,
      });
    }
  }, [form, state.link]);

  return (
    <Form
      {...formProps}
      form={form}
      layout="vertical"
      contentEditable={false}
      onFinish={onFinish}
    >
      <Form.Item label="文本" name="text" >
        <Input placeholder="请输入文本" />
      </Form.Item>
      <Form.Item label="链接" name="href" >
        <Input placeholder="请输入链接"  />
      </Form.Item>
      <Button
        disabled={!(text?.trim() && href?.trim())}
        onClick={() => {
          form.submit();
        }}
      >
        确定
      </Button>
    </Form>
  );
};

export default LinkForm;

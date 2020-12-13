import {Form, Input, InputNumber} from "antd"
import React from "react"

export const Cell = ({
                  editing,
                  dataIndex,
                  title,
                  inputType,
                  record,
                  index,
                  children,
                  ...restProps
              }) => {
    const inputNode =
        inputType === "number" ? (
            <InputNumber min={0} />
        ) : (
            <Input autoFocus={title === "First Name"} placeholder={title} />
        );
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

import React, { useState } from "react";
import { Table, Form, Input, InputNumber, Popconfirm, Button } from "antd";
import { testTableData } from "./testTableData";
import { UserAddOutlined } from "@ant-design/icons";
const originData = [];

const Cell = ({
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
      <InputNumber />
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

export const DataTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(testTableData);
  const [editingId, setEditingId] = useState("");

  const isEditing = (record) => record.id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      email: "",
      first_name: "",
      last_name: "",
      age: "",
      ...record,
    });

    setEditingId(record.id);
  };
  const add = () => {
    const newId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    form.setFieldsValue({
      email: "",
      first_name: "",
      last_name: "",
      age: "",
      id: newId,
      key: newId,
    });

    setData((prevState) => {
      const newData = [...prevState];
      newData.push({
        email: "",
        first_name: "",
        last_name: "",
        age: "",
        id: newId,
        key: `f${(~~(Math.random() * 1e8)).toString(16)}`,
      });
      return newData;
    });
    setEditingId(newId);
  };
  const cancel = () => {
    setEditingId("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingId("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingId("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      width: "25%",
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      width: "25%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
      editable: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Button type="primary" onClick={() => save(record.id)}>
            Save
          </Button>
        ) : (
          <Button type="default" onClick={() => edit(record)}>
            Edit
          </Button>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: Cell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        footer={() => (
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => add()}
          >
            Add
          </Button>
        )}
      />
    </Form>
  );
};

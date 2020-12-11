import React, { useState, useEffect } from "react";
import { Table, Form, Input, InputNumber, Button } from "antd";
import { testTableData } from "./testTableData";
import { UserAddOutlined } from "@ant-design/icons";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addNewRecord,
  editUser,
  getTableData,
  setEditingId,
} from "../store/Table/actions";

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

const DataTable = () => {
  const usersList = useSelector((state) => state.tableData.users);
  const isFetching = useSelector((state) => state.tableData.isFetching);
  const editingId = useSelector((state) => state.tableData.editingId);
  const [form] = Form.useForm();
  const [data, setData] = useState();
  // const [editingId, setEditingId] = useState("");
  const dispatch = useDispatch();
  const isEditing = (record) => record.id === editingId;

  useEffect(() => {
    dispatch(getTableData());
  }, []);

  const edit = (record) => {
    console.log(record);
    form.setFieldsValue({
      email: "",
      first_name: "",
      last_name: "",
      age: "",
      ...record,
    });

    dispatch(setEditingId(record.id));
  };
  const add = () => {
    const newId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    const newKey = `k${(~~(Math.random() * 1e8)).toString(16)}`;
    form.setFieldsValue({
      email: "",
      first_name: "",
      last_name: "",
      age: "",
    });
    const newUser = {
      email: "",
      first_name: "",
      last_name: "",
      age: "",
      key: newKey,
    };
    dispatch(addNewRecord(newUser));
    // setEditingId(newId);
  };
  const cancel = () => {
    setEditingId("");
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...usersList];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        dispatch(editUser(newData, newData[index]));
        dispatch(setEditingId(""));
      }
    } catch (e) {
      console.log("Validate Failed:", e);
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
          // <Button type="primary" danger onClick={() => deleteRow(record.id)}>
          //   Delete
          // </Button>
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
        style={{ marginTop: "5%" }}
        loading={isFetching}
        bordered
        dataSource={usersList}
        columns={mergedColumns}
        rowClassName="editable-row"
        footer={() => (
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            style={{ width: "15%" }}
            onClick={() => add()}
          >
            Add
          </Button>
        )}
      />
    </Form>
  );
};

export default connect()(DataTable);

import React from "react";
import {
  FloatButton,
  Modal,
  DatePicker,
  Select,
  Form,
  Button,
  InputNumber,
  TimePicker,
  Input,
  message,
} from "antd";
import { Plus, CalendarPlus } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { createClass, createSchedule } from "@/actions/db";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
const format = "HH:mm";
const today = dayjs();
const { TextArea } = Input;
const daysOfWeek = [
  {
    label: "Monday",
    value: "Monday",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
  },
  {
    label: "Thursday",
    value: "Thursday",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Saturday",
    value: "Saturday",
  },
  {
    label: "Sunday",
    value: "Sunday",
  },
];

const AddClassBtn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpen2, setIsModalOpen2] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  async function onFinish(values: any) {
    const response = await createClass(values);
    console.log(response);
    messageApi.open({
      type: "success",
      content: "Successfully created!",
    });
    form.resetFields();
  }

  async function onFinish2(values: any) {
    const response = await createSchedule(values);
    console.log(response);
    messageApi.open({
      type: "success",
      content: "Successfully created!",
    });
    form.resetFields();
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleOk2 = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <FloatButton.Group shape="square">
        <FloatButton
          type="primary"
          tooltip={<div>Create Ad-hoc Class</div>}
          icon={<Plus />}
          onClick={showModal}
        />
        <FloatButton
          type="primary"
          tooltip={<div>Create Repeating Class</div>}
          icon={<CalendarPlus />}
          onClick={showModal2}
        />
      </FloatButton.Group>

      <Modal
        title="Create Ad-hoc Class"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          hidden: true,
        }}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="classDate"
            label="Start Date and Time"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              minDate={dayjs(today, dateFormat)}
              maxDate={dayjs().add(5, "day")}
              minuteStep={15}
              hourStep={1}
            />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Class Duration"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "30 mins",
                  label: "30 mins",
                },
                {
                  value: "45 mins",
                  label: "45 mins",
                },
                {
                  value: "1 hour",
                  label: "1 hour",
                },
                {
                  value: "1.5 hours",
                  label: "1.5 hours",
                },
                {
                  value: "2 hours",
                  label: "2 hours",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="classType"
            label="Class Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "CrossFit",
                  label: "CrossFit",
                },
                {
                  value: "Yoga",
                  label: "Yoga",
                },
                {
                  value: "Pilates",
                  label: "Pilates",
                },
                {
                  value: "Open Gym",
                  label: "Open Gym",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Max Reservation Capacity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={0} max={100} defaultValue={10} />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Notes or WOD"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Create Repeating Class"
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        okButtonProps={{
          hidden: true,
        }}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish2}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="time"
            label="Start Time"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker
              format={"HH:mm"}
              minuteStep={15}
              hourStep={1}
              onChange={(e) => console.log(e)}
            />
          </Form.Item>
          <Form.Item
            name="days"
            label="Select Occurance Days"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              mode="multiple"
              style={{ maxWidth: 600 }}
              placeholder="Please select"
              options={daysOfWeek}
            />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Class Duration"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "30 mins",
                  label: "30 mins",
                },
                {
                  value: "45 mins",
                  label: "45 mins",
                },
                {
                  value: "1 hour",
                  label: "1 hour",
                },
                {
                  value: "1.5 hours",
                  label: "1.5 hours",
                },
                {
                  value: "2 hours",
                  label: "2 hours",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="classType"
            label="Class Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "CrossFit",
                  label: "CrossFit",
                },
                {
                  value: "Yoga",
                  label: "Yoga",
                },
                {
                  value: "Pilates",
                  label: "Pilates",
                },
                {
                  value: "Open Gym",
                  label: "Open Gym",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Max Reservation Capacity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={0} max={100} defaultValue={10} />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Notes or WOD"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default AddClassBtn;

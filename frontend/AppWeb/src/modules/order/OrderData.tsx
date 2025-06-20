import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

function OrderData() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Aquí puedes hacer la petición al backend
    alert("Orden guardada:\n" + JSON.stringify(values, null, 2));
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20, border: "1px solid #ccc", borderRadius: 8, background: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center" }}>Formulario de Orden</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ID de Usuario" name="userId" rules={[{ required: true, message: "Ingresa el ID del usuario" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Producto(s)" name="products" rules={[{ required: true, message: "Ingresa los productos (IDs separados por coma)" }]}>
          <Input placeholder="Ejemplo: 123,456,789" />
        </Form.Item>
        <Form.Item label="Total" name="total" rules={[{ required: true, message: "Ingresa el total" }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Guardar Orden
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default OrderData;
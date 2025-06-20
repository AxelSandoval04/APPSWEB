import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

function ProductData() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Aquí puedes hacer la petición al backend
    alert("Producto guardado:\n" + JSON.stringify(values, null, 2));
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20, border: "1px solid #ccc", borderRadius: 8, background: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center" }}>Formulario de Producto</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Nombre" name="name" rules={[{ required: true, message: "Ingresa el nombre del producto" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Descripción" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Precio" name="price" rules={[{ required: true, message: "Ingresa el precio" }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Guardar Producto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductData;
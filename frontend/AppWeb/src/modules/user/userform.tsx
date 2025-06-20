import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

function UserForm() {
  const [form] = Form.useForm();

const handleSubmit = async (values: any) => {
  try {
    const response = await axios.post('/api/auth/saveUser', values);
    alert('Usuario creado exitosamente');
    console.log(response.data);
  } catch (error: any) { // Especificar el tipo como 'any'
    console.error('Error al crear el usuario:', error.response?.data || error.message);
    alert('Hubo un error al crear el usuario');
  }
};

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Formulario de Usuario</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Por favor ingresa tu email' },
            { type: 'email', message: 'Por favor ingresa un email válido' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Teléfono"
          name="phone"
          rules={[{ required: true, message: 'Por favor ingresa tu teléfono' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Rol"
          name="role"
          rules={[{ required: true, message: 'Por favor selecciona un rol' }]}
        >
          <Select>
            <Option value="user">Usuario</Option>
            <Option value="admin">Administrador</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Estado"
          name="status"
          rules={[{ required: true, message: 'Por favor selecciona un estado' }]}
        >
          <Select>
            <Option value={true}>Activo</Option>
            <Option value={false}>Inactivo</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Crear Usuario
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserForm;
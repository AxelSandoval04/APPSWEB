import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

function LoginForm() {
  const [form] = Form.useForm();

  const handleLogin = async (values: any) => {
    try {
      const response = await axios.post('/api/auth/login', values);
      alert('Login exitoso');
      console.log(response.data);
    } catch (error: any) {
      console.error('Error en login:', error.response?.data || error.message);
      alert('Hubo un error en el login');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
      >
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
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
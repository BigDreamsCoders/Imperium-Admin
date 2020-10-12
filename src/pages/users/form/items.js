import { UserOutlined } from '@ant-design/icons';

export const basicInfoItems = [
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    rules: [
      {
        required: true,
        message: 'Debes ingresar el correo del usuario',
      },
    ],
    icon: UserOutlined,
  },
  {
    id: 'firstName',
    label: 'Nombre',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Debes ingresar el nombre del usuario',
      },
    ],
    icon: UserOutlined,
  },
  {
    id: 'lastName',
    label: 'Apellido',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Debes ingresar el apellido del usuario',
      },
    ],
    icon: UserOutlined,
  },
  {
    id: 'birthday',
    label: 'Fecha de nacimiento',
    type: 'date',
    rules: [
      {
        required: true,
        message: 'Debes ingresar la fecha de nacimiento del usuario',
      },
    ],
    icon: UserOutlined,
  },
];

import LoginForm from '../../blocks/forms/LoginForm';

export default function LoginFormDemo() {
  return (
    <LoginForm
      environments={[
        { id: 'prod', label: 'Production' },
        { id: 'uat', label: 'UAT' },
        { id: 'dev', label: 'Development' },
      ]}
      requireMfa
      onSubmit={(values) => console.log('login', values)}
    />
  );
}

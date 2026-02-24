import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import CustomButton from "../components/CustomButton/CustomButton"; 

function RegisterPage() {
  return (
    <AuthLayout
      title="Join the community"
      subtitle="Secure your essentials and gain peace of mind"
    >
      <form>
        <CustomButton type="submit" variant="primary">
          Create Account
        </CustomButton>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;

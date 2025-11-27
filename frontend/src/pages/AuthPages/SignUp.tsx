import PageMeta from "../../components/common/PageMeta";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="EVCS"
        description="Hệ thống đồng sở hữu và chia sẻ chi phí xe điện"
      />
        <SignUpForm />
    </>
  );
}

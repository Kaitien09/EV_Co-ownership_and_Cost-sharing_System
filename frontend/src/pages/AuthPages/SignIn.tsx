import PageMeta from "../../components/common/PageMeta";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="EVCS"
        description="Hệ thống đồng sở hữu và chia sẻ chi phí xe điện"
      />
        <SignInForm />
    </>
  );
}

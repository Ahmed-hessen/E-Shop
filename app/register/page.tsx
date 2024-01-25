import { SafeUser } from "@/types";
import { getCurrentUser } from "../../actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";
interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const Register = ({ currentUser }: RegisterFormProps) => (
  <Container>
    <FormWrap>
      <RegisterForm currentUser={currentUser} />
    </FormWrap>
  </Container>
);

export async function getServerSideProps() {
  const currentUser = await getCurrentUser();

  return {
    props: { currentUser },
  };
}

export default Register;

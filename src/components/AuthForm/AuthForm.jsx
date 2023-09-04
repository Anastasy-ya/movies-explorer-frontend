import { useForm } from "react-hook-form";

const AuthForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  return { register, errors, isValid, handleSubmit, reset, setValue, watch };
};

export default AuthForm;

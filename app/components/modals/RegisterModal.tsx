'use client';

import axios  from 'axios';
import { AiFillGithub} from "react-icons/ai";
import { FcGoogle} from "react-icons/fc";
import { useCallback , useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

import useRegisterModals from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";

const RegisterModal = () => {
  const registerModal = useRegisterModals();
  const [isloading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post("/api/auth/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }


  const bodyContent =(
    <div className="flex flex-col gap-4">
      <Heading
      title="welcome to Airbnb"
      subtitle="Create an account to continue!"
      // center
      />
      <Input
        id = "email"
        label = "Email"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id = "name"
        label = "Name"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id = "password"
        label = "Password"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  return (
    <div>
      <Modal
        disabled={isloading}
        isOpen={registerModal.isOpen}
        title={"Register"}
        actionLabel={"continue"}
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
    </div>
  );

}

export default RegisterModal;
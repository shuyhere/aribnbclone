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
import { toast } from "react-hot-toast";
import Button from "@/app/components/Button";

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

    axios.post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("something went wrong");
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

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
      outline
      label="Continue with Google"
      icon={FcGoogle}
      onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div
      className="
        text-neutral-500
        text-center
        mt-4
        font-light
        "
      >
        <div className="justify-center flex flex-row items-center gap-2">
          <div>
            Already have an account?
          </div>
          <div
            onClick={registerModal.onClose}
            className="
            text-neutral-800
            cursor-pointer
            hover:underline
          "
          >
            Log in
          </div>
        </div>
      </div>
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
        footer={footerContent}
      />
    </div>
  );

}



export default RegisterModal;
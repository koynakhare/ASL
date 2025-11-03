import React, { useMemo, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginUserAction, registerUserAction } from "../../redux/action/userAction";
import AuthTabs from "./authTab";
import AuthForm from "./authForm";
import { schemas } from "./constant";
import Loading from "../loading";

const AuthPopup = ({ authPopup, setAuthPopup }) => {
  const loginState = useSelector((state) => state.login)
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const activeSchema = useMemo(() => (isLogin ? schemas.login : schemas.register), [isLogin]);
  const formMethods = useForm({
    resolver: yupResolver(activeSchema), defaultValues: {
      name: '',
      email: '',
      password: "",
      confirmPassword: ''
    }
  });
  const { handleSubmit, reset } = formMethods;

  const onSubmit = async (data) => {
    const action = isLogin ? loginUserAction : registerUserAction;
    const { confirmPassword,name, ...userData } = data;

    const response = await dispatch(action(isLogin?userData:{...userData,name}));

    if (response?.payload?.success) {
      reset();
      setAuthPopup(false);
    }
  };


  const handleTabChange = (isLoginTab) => {
    reset();
    setIsLogin(isLoginTab);
  };

  if (!authPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      {loginState?.loading && <Loading />}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-[360px] p-6">
        <IoCloseOutline
          className="absolute right-4 top-4 text-2xl cursor-pointer hover:text-primary"
          onClick={() => setAuthPopup(false)}
        />
        <AuthTabs isLogin={isLogin} handleTabChange={handleTabChange} />
        <AuthForm isLogin={isLogin} onSubmit={handleSubmit(onSubmit)} formMethods={formMethods} loading={loginState?.loading} />
      </div>
    </div>
  );
};


export default AuthPopup;

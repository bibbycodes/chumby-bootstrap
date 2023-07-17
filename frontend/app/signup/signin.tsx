import {getProviders, signIn, useSession} from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import {Provider} from "next-auth/providers";

type FormValues = {
  email: string;
  password: string;
};

type SignInProps = {
  providers: Provider;
};

export default function SignIn({ providers }: SignInProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => {
    signIn("credentials", { email, password, callbackUrl: `${window.location.origin}/dashboard` });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-4 shadow-md rounded-md">
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="p-2 border border-gray-300 rounded-md"
          />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="p-2 border border-gray-300 rounded-md"
          />
          {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}

          <button className="p-2 mt-2 bg-blue-500 text-white rounded-md" type="submit">Sign in</button>
        </form>

        <div className="flex items-center my-3">
          <div className="border-t w-full border-gray-300"></div>
          <div className="px-2 text-sm text-gray-500">Or</div>
          <div className="border-t w-full border-gray-300"></div>
        </div>

        {Object.values(providers).map((provider) => {
          if (provider.name === "Credentials") {
            return;
          }
          return (
            <div key={provider.name}>
              <button className="p-2 w-full border border-gray-300 rounded-md" onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

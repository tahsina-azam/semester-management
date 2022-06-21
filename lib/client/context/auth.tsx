import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { json } from "stream/consumers";
import { User } from "../../common/types";
interface Auth {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User;
  email: string;
  signUpAndVerifyEmail: (
    name: string,
    regnum: string,
    email: string,
    password: string,
    department?: string
  ) => Promise<{ status: string; message: string; errorMessage?: string }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ status: string; message: string; errorMessage?: string }>;
  signOut: () => void;
  setUser: any;
}
const AuthContext = createContext<Auth>({
  isLoading: false,
  isLoggedIn: false,
  user: null,
  email: "",
  signIn: (email: string, password: string) =>
    new Promise((res) => res({ status: "", message: "" })),
  signUpAndVerifyEmail: (
    name: string,
    regnum: string,
    email: string,
    password: string
  ) => new Promise((res) => res({ status: "", message: "" })),
  signOut: () => {},
  setUser: () => {},
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    const verifyToken = () => {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log("token: ", token);
      if (token === undefined || token === null) {
        console.log("undfined token");
        setLoading(false);
        if (router.pathname === "/sign-up") router.push("/sign-up");
        else if (router.pathname === "/sign-in") router.push("/sign-in");
        else router.push("/sign-in");
        return;
      }
      const { name, role, email } = token;
      setUser({ name, role, email } as User);
      setLoggedIn(true);
      setLoading(false);
    };
    verifyToken();
  }, []);

  const signUpAndVerifyEmail = async (
    name: string,
    regnum: string,
    email: string,
    password: string,
    department?: string
  ): Promise<{ status: string; message: string; errorMessage?: string }> => {
    console.log("in sign up");
    setEmail(email);
    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
        regnum,
      });
      const {
        data: { status, message, errorMessage },
      } = response;
      if (status === "fail")
        return {
          status,
          message,
          errorMessage,
        };
      try {
        const responseForActivation = await axios.post(
          "/api/auth/activate-account",
          {
            email, 
            name
          }
        );
        const {
          data: { status, message, errorMessage },
        } = responseForActivation;
        if (status === "fail")
          return {
            status,
            message,
            errorMessage,
          };
        return {
          status,
          message,
        };
      } catch (err) {
        return {
          status: "fail",
          message: "error occured while sending mail",
          errorMessage: err,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: "fail",
        message: "error occured while registering",
        errorMessage: err,
      };
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ status: string; message: string; errorMessage?: string }> => {
    console.log("in sign in");
    try {
      const response = await axios.post("/api/signin", {
        email,
        password,
      });
      console.log({ response });
      const {
        data: { data, status, code: message },
      } = response;
      console.log(`status: ${status}`);
      if (status === "fail") {
        // router.push("/sign-up");
        return { status, message };
      }
      const { role, name } = data;
      const token = { email, name, role };
      localStorage.setItem("token", JSON.stringify(token));
      console.log(`token ${localStorage.getItem("token")}`);
      setLoggedIn(true);
      setUser({ role, email, name } as User);
      router.push("/");
      setLoading(false);
      return { status: "success", message };
    } catch (err) {
      return {
        status: "fail",
        message: "",
        errorMessage: err,
      };
    }
  };

  const signOut = () => {};

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        signUpAndVerifyEmail,
        signIn,
        user,
        signOut,
        setUser,
        email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

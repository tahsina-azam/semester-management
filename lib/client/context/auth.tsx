import axios from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../../common/types";
interface vars {
  email: string;
  name: string;
  password: string;
  regnum?: string;
  department?: string;
}
interface Auth {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User;
  email: string;
  signUpAndVerifyEmail: (
    variables: vars
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
  signUpAndVerifyEmail: (variables: vars) =>
    new Promise((res) => res({ status: "", message: "" })),
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
        //later ------------------------------------------
        // if (router.pathname === "/sign-up") router.push("/sign-up");
        // else if (router.pathname === "/sign-in") router.push("/sign-in");
        // else router.push("/sign-in");
        return;
      }
      const { name, role, email } = token;
      setUser({ name, role, email } as User);
      console.log({ name, role, email });
      console.log({ token });
      //console.log({user})
      setLoggedIn(true);
      setLoading(false);
    };
    verifyToken();
  }, []);

  const signUpAndVerifyEmail = async (
    variables: vars
  ): Promise<{ status: string; message: string; errorMessage?: string }> => {
    const { name, email, password, department, regnum } = variables;
    console.log("in sign up");
    setEmail(email);
    let path = "/api/signup";
    const mainVars: vars = {
      name,
      email,
      password,
    };
    console.log({ variables });
    //teacher
    if (department !== undefined) {
      path = path + "/teacher";
      mainVars.department = department;
    }
    //student
    else if (regnum !== undefined) {
      mainVars.regnum = regnum;
    }
    console.log({ path, mainVars });
    try {
      const responseForInsertion = await axios.post(path, mainVars);
      const {
        data: {
          statusForInsertion,
          messageForInsertion,
          errorMessageForInsertion,
        },
      } = responseForInsertion;
      console.log({responseForInsertion});
      if (statusForInsertion === "fail")
        return {
          status: statusForInsertion,
          message: messageForInsertion,
          errorMessage: errorMessageForInsertion,
        };
      try {
        const responseForActivation = await axios.post(
          "/api/auth/activate-account",
          {
            email,
            name,
            role: regnum === undefined ? "teacher" : "student",
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
        data: { data, status, code: message, link },
      } = response;
      console.log(`status: ${status}`);
      if (status === "fail") {
        return { status, message };
      }
      const { role, name } = data;
      const token = { email, name, role };
      localStorage.setItem("token", JSON.stringify(token));
      console.log(`token ${localStorage.getItem("token")}`);
      setLoggedIn(true);
      setUser({ role, email, name } as User);
      router.push(link);
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
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

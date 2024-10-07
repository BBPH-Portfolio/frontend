"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const token = localStorage.getItem("token");


  useEffect(() => {
    const hash = searchParams.get("hash");
    setIsAuthorized(hash === "AcxA24rfdxa4656=091?");
  }, [searchParams]);

  if (isAuthorized === null) {
    return <p>Cargando...</p>;
  }

  if (!isAuthorized) {
    return <p>404 - Página no encontrada</p>;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        toast.success("Sesión iniciada");
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error en el login");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setError("Error de conexión. Por favor, intenta de nuevo.");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    toast.success("Sesión cerrada");
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      {token ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-black text-4xl font-bold">
            Ya has iniciado sesión
          </h1>
          <button
            className="bg-red-500 text-white px-4 py-2 mt-10 rounded-lg"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      ) :  (
        <form
          onSubmit={handleLogin}
          className="space-y-6 w-full max-w-sm p-8 bg-card rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center text-foreground">
            Iniciar sesión
          </h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-muted-foreground"
            >
              Username
            </label>
            <input
              id="username"
              type="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Usuario"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-muted-foreground"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#1f1f1f] p-3 rounded-lg hover:bg-[#2f2f2f] transition-colors"
          >
            Ingresar
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;

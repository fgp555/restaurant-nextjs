// src/app/user/page.tsx
"use client";

import { useEffect, useState } from "react";
import { UserPage } from "@/pages/UserPage/UserPage";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserRoutePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <main>
      <h1>Usuario</h1>
      {user ? <UserPage user={user} /> : <p>Cargando usuario...</p>}
    </main>
  );
}

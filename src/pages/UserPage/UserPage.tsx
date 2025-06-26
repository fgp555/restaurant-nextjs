// src/pages/UserPage/UserPage.tsx
import "./UserPage.scss";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  user: User;
}

export function UserPage({ user }: Props) {
  return (
    <div className="user-page">
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

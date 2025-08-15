import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";

interface NotificationIconProps {
  userId: number; // ID de l'utilisateur connecté
  role: "business" | "client" | "admin"; // Type d'utilisateur
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ userId, role }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/notifications/${role}/${userId}`
        );
        if (!response.ok) throw new Error("Erreur de chargement");
        const data = await response.json();
        setCount(data.length); // Nombre de notifications non lues
      } catch (error) {
        console.error("Erreur récupération notifications:", error);
      }
    };

    fetchNotifications();

    // 🔄 Actualisation toutes les 30 secondes
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userId, role]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Bell size={28} color="#333" />
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            padding: "4px 7px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;

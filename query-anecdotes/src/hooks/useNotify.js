import { useContext } from "react";
import NotificationContext from "../NotificationContext";

export const useNotify = () => useContext(NotificationContext);

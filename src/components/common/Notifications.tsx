import { Group, Button, MantineTheme } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Bulb, Check, X } from "tabler-icons-react";

export default function notify({
  id,
  type,
  title,
  text,
  autoClose,
  disallowClose,
  loading,
}: {
  id?: string;
  type: string;
  title: string;
  text: string;
  autoClose?: number;
  disallowClose?: boolean;
  loading?: boolean;
}) {
  
  return showNotification({
    ...(id && { id: id }),
    ...(disallowClose && { disallowClose: disallowClose }),
    ...(autoClose && { autoClose: autoClose }),
    ...(loading && { loading: loading }),
    title: title,
    message: text,
    icon: getTheme({type}).icon,
    color: getTheme({type}).iconColor,

    styles: (theme) => ({
      root: {
        ...(type === "success" && {
          backgroundColor: getTheme({theme, type}).light,
          borderColor: getTheme({theme, type}).dark,
        }),

        "&::before": { backgroundColor: getTheme({theme, type}).light },
      },

      title: { color: getTheme({theme, type}).dark },
      description: { color: getTheme({theme, type}).dark },
      closeButton: {
        color: getTheme({theme, type}).light,
        "&:hover": { backgroundColor: getTheme({theme, type}).mid },
      },
    }),
  });
}
const getTheme = ({theme, type}: {theme?:MantineTheme, type: string}) => {
  
  const { dark, mid, light,icon, iconColor } =
  type === "success"
    ? {
        dark: theme?theme.colors.green[8]: "",
        mid: theme?theme.colors.green[5]: "",
        light: theme?theme.colors.green[0]: "",
        icon: <Check size={20} strokeWidth={2} />,
        iconColor: "green"
      }
    : type === "fail"
    ? {
        dark: theme?theme.colors.red[8]: "",
        mid: theme?theme.colors.red[5]: "",
        light: theme?theme.colors.red[0]: "",
        icon: <X size={20} strokeWidth={2} />,
        iconColor: "red"
      }
    : {
        dark: theme?theme.colors.indigo[8]: "",
        mid: theme?theme.colors.indigo[5]: "",
        light: theme?theme.colors.indigo[0]: "",
        icon: <Bulb size={20} strokeWidth={2} />,
        iconColor: "blue"
      };
      return theme? {dark,mid, light}: {icon, iconColor};
}
export function setNotify({
  id,
  type,
  title,
  text,
  autoClose,
  disallowClose,
  loading,
}: {
  id?: string;
  type: string;
  title: string;
  text: string;
  autoClose?: number;
  disallowClose?: boolean;
  loading?: boolean;
}) {
  
  return updateNotification({
    ...(id && { id: id }),
    ...(disallowClose && { disallowClose: disallowClose }),
    ...(autoClose && { autoClose: autoClose }),
    ...(loading && { loading: loading }),
    title: title,
    message: text,
    icon: getTheme({type}).icon,
    color: getTheme({type}).iconColor,

    styles: (theme) => ({
      root: {
        ...(type === "success" && {
          backgroundColor: getTheme({theme, type}).light,
          borderColor: getTheme({theme, type}).dark,
        }),

        "&::before": { backgroundColor: getTheme({theme, type}).light },
      },

      title: { color: getTheme({theme, type}).dark },
      description: { color: getTheme({theme, type}).dark },
      closeButton: {
        color: getTheme({theme, type}).light,
        "&:hover": { backgroundColor: getTheme({theme, type}).mid },
      },
    }),
  });
}
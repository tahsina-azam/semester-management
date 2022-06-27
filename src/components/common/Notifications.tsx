import { Notification } from "@mantine/core";
import { Check, X } from 'tabler-icons-react';
export default function ShowNotification({ type, title, text}: {
    type: string,
    title ?: string,
    text: string,
}) {
  return (
    <Notification
      {...(type === "loading" && {loading: true , disallowClose: true })}
      {...type==="success" && {color: "teal", icon: <Check size={18}/>}}
      {...type==="fail" && {color: "red", icon: <X size={18}/>}}
      {...title && {title: title}}
      
    >
      {text}
    </Notification>
  );
}

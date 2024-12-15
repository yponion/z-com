import { ReactNode } from "react";

export default function AfterLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}

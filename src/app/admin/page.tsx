"use client";
import { admin, useSession } from "@/lib/auth-client";
import React, { use, useEffect } from "react";

const page = () => {
  const session = useSession();
  useEffect(() => {
    const data = async () => {
      await admin.setRole({
        userId: session?.data?.user.id as string,
        role: "admin",
      });
    };
    data();
  }, []);
  return <div>page</div>;
};

export default page;

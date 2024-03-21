// src/components/Header.tsx

import React, { useState } from "react";
import { Group, Button, Text } from "@mantine/core";
import { signOut } from "firebase/auth";
import { auth, functions } from "./config";
import { httpsCallable } from "firebase/functions";

const Header: React.FC = () => {
  const [loading, setloading] = useState(false);
  return (
    <>
      <div
        style={{
          padding: "20px 0",
          backgroundColor: "#f5f5f5",
          height: 80,
          position: "fixed",
          // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Group
          justify="apart"
          // pos="fixed"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 20px",
            alignItems: "center",
          }}
        >
          <Text fw={500} size="xl">
            MENTALLI
          </Text>
          <Group className="flex space-x-4">
            <Button
              color="blue"
              size="xs"
              loading={loading}
              onClick={async () => {
                // Specify the region if it's not 'us-central1'
                setloading(true);
                try {
                  const resetFunction = httpsCallable(functions, "reset");
                  await resetFunction();
                } catch (error) {
                  // Handle errors
                  console.error("Error calling reset function:", error);
                } finally {
                  setloading(false);
                }
              }}
            >
              New Message
            </Button>
            <Button size="xs" color="red" onClick={() => signOut(auth)}>
              Logout
            </Button>
          </Group>
        </Group>
      </div>
      <div style={{ height: 80 }} />
    </>
  );
};

export default Header;

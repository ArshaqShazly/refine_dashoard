import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { CredentialResponse } from "../interfaces/google";

import { yariga } from "assets";

// Todo: Update your Google Client ID here
// const GOOGLE_CLIENT_ID =
//   "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{ backgroundColor: "#FCFCFC" }}
    >

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Box
          display="flex"
          gap="36px"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <div>
            <img src={yariga} alt="Yariga Logo" />
          </div>

          <GoogleButton />
        </Box>
      </Container>
    </Box>
  );
};

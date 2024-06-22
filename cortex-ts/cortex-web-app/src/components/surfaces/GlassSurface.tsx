import { Box, BoxProps, Paper, PaperProps } from "@mui/material";
import React from "react";

export type GlassSurfaceProps = Omit<BoxProps, "sx"> & {
    sx?: Omit<
        BoxProps["sx"],
        | "background"
        | "borderRadius"
        | "boxShadow"
        | "backdropFilter"
        | "WebkitBackdropFilter"
        | "border"
    >;
};

export const GlassSurface: React.FC<GlassSurfaceProps> = (props) => (
    <Box
        {...(props || {})}
        sx={{
            ...(props?.sx || {}),
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(1.5px)",
            WebkitBackdropFilter: "blur(1.5px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
    />
);

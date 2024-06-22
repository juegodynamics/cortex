import { MDXProvider } from "@mdx-js/react";
import { Typography } from "@mui/material";
import React from "react";

const h1 = ({
    children,
}: {
    children?: React.ReactNode[] | React.ReactNode;
}) => <Typography variant="h1">{children}</Typography>;
const h2 = ({ children }: { children?: React.ReactNode[] }) => (
    <Typography variant="h1">{children}</Typography>
);

export const MDXWrapper: React.FC<{ children: React.ReactNode[] }> = ({
    children,
}) => (
    <MDXProvider
        components={{
            h1,
        }}
    >
        {children}
    </MDXProvider>
);

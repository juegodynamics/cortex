import { Box, Stack, Typography, useTheme } from "@mui/material";
import { HEADER_HEIGHT } from "../../config";

export const Header = () => {
    const theme = useTheme();
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            sx={{
                width: "100vw",
                height: `${HEADER_HEIGHT}px`,
                backgroundColor: theme.palette.text.secondary,
                p: 1,
            }}
        >
            <Typography>APP</Typography>
        </Stack>
    );
};

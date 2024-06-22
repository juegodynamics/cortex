import { MDXProvider } from "@mdx-js/react";
import { Box, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import Introduction from "../articles/Introduction.mdx";
import { Header, Sidebar } from "../components/layout";
import { GlassSurface } from "../components/surfaces/GlassSurface";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../config";
import { DarkTheme } from "../theme";

export const Wiki = () => (
    <MDXProvider>
        <ThemeProvider theme={DarkTheme}>
            <CssBaseline />
            <Box height="100vh">
                <Stack direction={"column"} width={"100vw"} height={"100vh"}>
                    <Header />
                    <Stack
                        direction={"row"}
                        alignItems={"flex-start"}
                        justifyContent={"flex-start"}
                        height={`calc(100vh - ${HEADER_HEIGHT}px)`}
                        sx={{ width: "100vw" }}
                    >
                        <Sidebar />
                        <Box
                            component={"main"}
                            flexGrow={1}
                            py={2}
                            px={"20vw"}
                            sx={{
                                height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                                width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
                                overflow: "scroll",
                            }}
                        >
                            <GlassSurface sx={{ px: 2 }}>
                                <Introduction />
                            </GlassSurface>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </ThemeProvider>
    </MDXProvider>
);

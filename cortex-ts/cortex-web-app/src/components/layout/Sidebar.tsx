import {
    Box,
    Button,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    useTheme,
} from "@mui/material";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../config";

const items = ["Intro", "Characters", "Classes"];

export const Sidebar = () => {
    const theme = useTheme();

    return (
        <List
            // direction={"column"}
            sx={{
                width: `${SIDEBAR_WIDTH}px`,
                height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                backgroundColor: theme.palette.background.paper,
                // p: 2,
            }}
        >
            {/* <Paper> */}
            {items.map((item, itemIndex) => (
                <ListItemButton key={itemIndex}>
                    <ListItemText primary={item} />
                </ListItemButton>
            ))}
            {/* </Paper> */}
        </List>
    );
};

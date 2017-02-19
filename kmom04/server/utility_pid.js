// Check if LINUX_PORT env is defined, else use predefined port 1337.
if (process.env.LINUX_PORT !== undefined) {
    console.log("Found port environment variable: " + process.env.LINUX_PORT);
    server.listen(process.env.LINUX_PORT);
} else {
    console.log("Couldn't find LINUX_PORT environment variable. Falling back to 1337." +
                "Not like it makes any difference..");
    server.listen(1337);
}

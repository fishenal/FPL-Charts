import { Typography } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 py-8 w-full h-full">
      <Typography variant="h4" gutterBottom>
        Help & Support
      </Typography>
      <Typography gutterBottom>
        This App is created by fishenal, and an Experienced Web Developer in
        Shanghai/China.
      </Typography>
      <Typography gutterBottom>
        If you are interesting about my projects please visit my github:
        <a
          href="https://github.com/fishenal"
          target="_blank"
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          https://github.com/fishenal
        </a>
      </Typography>
      <Typography gutterBottom>
        If you found some bugs to report or ideas to make this app better,
        welcome contact me with email:{" "}
        <a
          href="mailTo:yu_dong_han@hotmail.com"
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          yu_dong_han@hotmail.com
        </a>
      </Typography>
      <div>
        <a href="https://www.buymeacoffee.com/fishenal" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
            alt="Buy Me A Coffee"
          />
        </a>
      </div>
    </div>
  );
}

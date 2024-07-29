import { Moon, Sun } from "lucide-react";
import useThemeStore from "../../states/local/theme";
import { Avatar, AvatarFallback, AvatarImage, Button } from "../ui";

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div>
      <Button variant="outline" onClick={toggleTheme}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Header;

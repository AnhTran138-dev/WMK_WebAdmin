import { LogOut, Moon, Sun } from "lucide-react";
import useThemeStore from "../../states/local/theme";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../../lib";

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div className="flex justify-end gap-4 px-8 py-5 bg-primary">
      <Button variant="outline" onClick={toggleTheme}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col mr-12 w-fit">
          <Button
            variant="ghost"
            className="gap-5 w-fit"
            onClick={() => {
              removeItem("token");
              navigate("/sign-in");
            }}
          >
            <LogOut /> Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Header;

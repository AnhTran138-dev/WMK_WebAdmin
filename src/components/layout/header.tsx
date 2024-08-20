import { LogOut, Moon, Sun } from "lucide-react";
import useThemeStore from "../../states/local/theme";
import {
  Avatar,
  AvatarFallback,
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui";
import { useNavigate } from "react-router-dom";
import { getItem, removeItem } from "../../lib";
import { useEffect, useState } from "react";
import { TokenResponse } from "../../models/responses";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token: TokenResponse = jwtDecode(getItem("token"));

    if (token) {
      setRole(
        token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
  }, []);

  const avatarText = role ? role.substring(0, 2).toUpperCase() : "";

  return (
    <div className="flex items-center justify-end gap-4 px-8 py-5 bg-primary">
      <Label className="text-primary-foreground">Welcome, {role}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>{avatarText}</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col mr-12 w-fit bg-primary">
          <Button onClick={toggleTheme} className="gap-5 w-fit">
            {theme === "dark" ? <Sun /> : <Moon />} Mode
          </Button>
          <Button
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

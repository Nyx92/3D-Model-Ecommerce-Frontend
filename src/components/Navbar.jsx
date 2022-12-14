import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import BackendUrlContext from "../components/BackendUrl.jsx";
import CartDrawer from "../components/Cart/CartDrawer";

const CartLogout = ({ onLogoutClick }) => {
  const navigate = useNavigate();
  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify="flex-end"
      direction="row"
      spacing={3}
    >
      <CartDrawer />
      <Menu>
        <MenuButton
          borderRadius={6}
          color="gray.800"
          bg="#FF8BA0"
          padding={"5px 16px 0px 16px"}
          _hover={{
            bg: "#FFBECA",
          }}
        >
          <Icon w={7} h={7} as={BiUser} />
        </MenuButton>
        <MenuList>
          <MenuItem color="gray.800" onClick={() => navigate("/profile")}>
            Profile
          </MenuItem>
          <MenuItem
            color="gray.800"
            onClick={() => navigate("/profile/purchase")}
          >
            My Purchases
          </MenuItem>
          <MenuItem color="gray.800" onClick={onLogoutClick}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};

const CartLoginSignup = () => {
  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify="flex-end"
      direction="row"
      spacing={3}
    >
      <CartDrawer />
      <Button
        as="a"
        fontSize="sm"
        fontWeight={600}
        variant="link"
        href="/login"
        bg={""}
        color={"gray.800"}
        padding={"5px 20px 5px 20px"}
        _hover={{
          bg: "whiteAlpha.500",
        }}
      >
        Login
      </Button>
      <Button
        as="a"
        href="/signup"
        display={{ base: "none", md: "inline-flex" }}
        fontSize="sm"
        fontWeight={600}
        color="gray.800"
        bg=""
        _hover={{
          bg: "whiteAlpha.500",
        }}
      >
        Sign Up
      </Button>
    </Stack>
  );
};

export default function NavBar({ user }) {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["loggedInUser"]);
  const { backendUrl } = useContext(BackendUrlContext);

  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.loggedInHash); // if cookies.loggedInHash is empty string or undefined == false

  const onLogoutClick = () => {
    axios
      .post(`${backendUrl}/api/logout`)
      .then((res) => {
        navigate(res.data.redirect);
        setIsLoggedIn(false);
      })
      .catch((err) => console.log("[ERROR] failed to logout, err:", err));
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("#FF8BA0", "#FF8BA0")}
        color={useColorModeValue("#FF8BA0", "#FF8BA0")}
        minH={"55px"}
        py={{ base: 2 }}
        px={{ md: 40, base: 5 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("#FF8BA0", "#FF8BA0")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          // Flex contents (i.e., menu button) will not display with medium screens
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image
            src="/porky_prints_full.svg"
            alt="Pink pig cute logo"
            width={"auto"}
            height={"60px"}
            onClick={() => {
              navigate("/");
            }}
            _hover={{
              cursor: "pointer",
            }}
          />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Stack
              direction={"row"}
              spacing={3}
              display={"flex"}
              alignItems={"center"}
            >
              {NAV_ITEMS.map((navItem) => (
                <Box
                  key={navItem.label}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Link
                    p={2}
                    href={navItem.href ?? "#"}
                    fontSize={"sm"}
                    fontWeight={600}
                    color="gray.800"
                    borderRadius={"6px"}
                    borderWidth={"1px"}
                    borderColor={"#FF8BA0"}
                    _hover={{
                      bg: "whiteAlpha.500",
                    }}
                  >
                    {navItem.label}
                  </Link>
                </Box>
              ))}
              <Box
                key={"about-us"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Link
                  p={2}
                  href={"/admin/about-us"}
                  fontSize={"sm"}
                  fontWeight={600}
                  color="gray.800"
                  borderRadius={"6px"}
                  borderWidth={"1px"}
                  borderColor={"#FF8BA0"}
                  _hover={{
                    bg: "whiteAlpha.500",
                  }}
                >
                  About Us
                </Link>
              </Box>
              <Menu>
                <MenuButton
                  p={2}
                  fontSize={"sm"}
                  fontWeight={600}
                  color="gray.800"
                  borderRadius={"6px"}
                  borderWidth={"1px"}
                  borderColor={"#FF8BA0"}
                  height={"40px"}
                  _hover={{
                    bg: "whiteAlpha.500",
                  }}
                >
                  Customer Assistance
                </MenuButton>
                <MenuList>
                  <MenuItem color="gray.800" as="a" href="/admin/delivery">
                    Delivery
                  </MenuItem>
                  <MenuItem
                    color="gray.800"
                    as="a"
                    href="/admin/returns-policy"
                  >
                    Returns Policy
                  </MenuItem>
                </MenuList>
              </Menu>
              <Box
                key={"contact-us"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Link
                  p={2}
                  href={"/admin/contact-us"}
                  fontSize={"sm"}
                  fontWeight={600}
                  color="gray.800"
                  borderRadius={"6px"}
                  borderWidth={"1px"}
                  borderColor={"#FF8BA0"}
                  _hover={{
                    bg: "whiteAlpha.500",
                  }}
                >
                  Contact Us
                </Link>
              </Box>
            </Stack>
          </Flex>
        </Flex>
        {/* login + signup + cart */}
        {isLoggedIn ? (
          <CartLogout onLogoutClick={onLogoutClick} />
        ) : (
          <CartLoginSignup />
        )}
      </Flex>
    </Box>
  );
}

const NAV_ITEMS = [
  {
    label: "3D Models",
    href: "/models",
  },
];

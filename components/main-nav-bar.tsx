'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { useAuth } from "@/providers/UserContextProvider";
import { Employee, Employer } from "@/types/class.service";

export default function MainNavBar() {
  const { user, logout } = useAuth<Employee | Employer>()
  return (
    <Navbar className="full bg-transparent" style={{height: "6vh"}}>
      <NavbarBrand>
        <a href="/main"><p className="font-bold text-inherit">Shiftable</p></a>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/main/my-shifts">
            My shifts
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/main/shifts-application" aria-current="page" color="secondary">
            Apply shifts
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="configurations">About us</DropdownItem>
            {/* <DropdownItem key="configurations">Contact {user?.employer.name}</DropdownItem> */}
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem onClick={logout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}



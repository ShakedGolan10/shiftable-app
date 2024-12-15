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
        <a href="/main"><p className="font-bold text-base">Shiftable</p></a>
      </NavbarBrand>
        <Dropdown>
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
            <DropdownItem textValue="profile" key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            {/* <DropdownItem key="configurations">Contact {user?.employer.name}</DropdownItem> */}
            <DropdownItem textValue='logout' onClick={logout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
    </Navbar>
  );
}



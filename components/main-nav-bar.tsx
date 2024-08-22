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
      <NavbarContent className="mobile:hidden flex flex-row justify-center items-center gap-4">
        <NavbarItem className="text-base">
          <Link className="text-base" color="foreground" href={`/main/${user instanceof Employee ? `my-shifts` : `Weekly Workflow`}`}>
          {user instanceof Employee ? `My shifts` : `Weekly Workflow` }
          </Link>
        </NavbarItem>
        <NavbarItem className="text-base" isActive>
          <Link className="text-base" href={`/main/${user instanceof Employee ? `shifts-application` : `schedule-shifts`}`} aria-current="page" color="secondary">
          {user instanceof Employee ? `Shifts application` : `Schedule shifts` }
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
            <DropdownItem textValue="profile" key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem textValue='settings' key="settings">My Settings</DropdownItem>
            <DropdownItem textValue='congigurations' key="configurations">About us</DropdownItem>
            {/* <DropdownItem key="configurations">Contact {user?.employer.name}</DropdownItem> */}
            <DropdownItem textValue='help_and_feedbek' key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem textValue='logout' onClick={logout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}



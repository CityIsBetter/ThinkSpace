"use client"
import { OrganizationSwitcher, UserButton, useOrganization } from '@clerk/nextjs'
import React from 'react'
import { SearchInput } from './SearchInput'
import InviteButton from './InviteButton'

export default function Navbar() {

  const {organization} = useOrganization();

  return (
    <div className='flex items-center gap-x-4 p-5'>
        <div className="hidden lg:flex lg:flex-1">
          <SearchInput />
        </div>
        <div className="block lg:hidden flex-1">
        <OrganizationSwitcher hidePersonal appearance={{
                elements: {
                    rootBox: {
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        width: "100%",
                    },
                    organizationSwitcherTrigger: {
                        padding: "6px",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                    }
                }
            }}/>
        </div>
        {/* {organization && <InviteButton />} */}
        <UserButton appearance={{
          elements: {
            userButtonAvatarBox:{
              width: "40px",
              height: "40px"
            }
          }
        }} />
    </div>
  )
}

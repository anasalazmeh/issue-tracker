import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { Link as LinkRadix } from '@radix-ui/themes'
interface Prop{
  href:string,
  children:string,
}
const Link = ({href,children}:Prop) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <LinkRadix>{children}</LinkRadix>
    </NextLink>
  )
}

export default Link
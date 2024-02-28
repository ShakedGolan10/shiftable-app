'use client'

import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

export default function ShiftsTable({rows, columns}:any) {

  return (
    <Table>
        <TableHeader columns={columns}>
          {(column: any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item: any) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell className='bg-white text-gray-950'>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
  )
}

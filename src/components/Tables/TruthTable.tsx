import React, { useMemo } from 'react'

// import components from heroui
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'

export default function TruthTable() {

    // define classNames for table
    const classNames = useMemo(
        () => ({
            wrapper: ["bg-black",
                "w-full",
                "h-full",
                "rounded-lg",
                "shadow",
                "min-w-[280px]",
                "overflow-hidden"],
            th: [
                "bg-white/5",
                "text-white",
                "border-gray-300",
                "px-2",
                "py-2",
                "text-sm",
                "text-center"
            ],
            td: [
                "px-2",
                "py-2",
                "text-sm",
                "border-b",
                "border-gray-200",
                "text-white",
                "bg-transparent",
                "text-center",
                "capitalize",
            ],

        }),
        []
    );

    // define truth data
    const truthData = [
        { A: true, B: true },
        { A: true, B: false },
        { A: false, B: true },
        { A: false, B: false },
    ];

    return (
        <div className='mb-4'>
            <h2 className="text-xl font-semibold text-white mb-2">
                Tabel Kebenaran Aljabar Boolean
            </h2>
            <Table aria-label="Example static collection table" classNames={classNames}>
                <TableHeader>
                    <TableColumn>A</TableColumn>
                    <TableColumn>B</TableColumn>
                    <TableColumn>A ∧ B</TableColumn>
                    <TableColumn>A ∨ B</TableColumn>
                </TableHeader>
                <TableBody className=''>
                    {truthData.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{String(row.A)}</TableCell>
                            <TableCell>{String(row.B)}</TableCell>
                            <TableCell>{String(row.A && row.B)}</TableCell>
                            <TableCell>{String(row.A || row.B)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}

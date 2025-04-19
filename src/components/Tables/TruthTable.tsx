import React, { useMemo } from 'react'

// import components from heroui
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'

export default function TruthTable() {

    // helper to create boolean values
    const capitalizeBool = (value: boolean) => value ? 'True' : 'False';

    // define classNames for table
    const classNames = useMemo(
        () => ({
            wrapper: ["bg-black",
                "w-full",
                "h-full",
                "rounded-lg",
                "shadow",
                "min-w-[280px]",
                "overflow-hidden",
                "mb-4",],
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
        <div className=''>
            <h2 className="text-xl font-semibold text-white mb-2">
                Tabel Kebenaran Aljabar Boolean
            </h2>
            <p className='text-sm text-white/90 whitespace-pre-line mb-4'>
                Sekarang jika kita nyatakan operasi di atas dalam tabel kebenaran, maka dapat diperoleh peroleh:
            </p>
            <Table aria-label="Tabel Kebenaran AND dan OR" classNames={classNames}>
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

            <Table aria-label="Tabel Kebenaran NOT" classNames={classNames}>
                <TableHeader>
                    <TableColumn>A</TableColumn>
                    <TableColumn>¬A</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>{capitalizeBool(true)}</TableCell>
                        <TableCell>{capitalizeBool(!true)}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>{capitalizeBool(false)}</TableCell>
                        <TableCell>{capitalizeBool(!false)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div >
    )
}

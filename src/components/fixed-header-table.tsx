import React from "react";
import styled from "@emotion/styled";
import { TableProps } from "@highoutput/ui-core";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";

export const StyledTable = styled(Table)`
  thead {
    tr {
      th {
        position: sticky;
        top: 0;
        z-index: 1;
      }
    }
  }

  th {
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #9ca3af;
    letter-spacing: 5%;
  }
`;

interface FixedHeaderTableProps extends TableProps {
  height?: string | number;
}

const FixedHeaderTable: React.FC<FixedHeaderTableProps> = ({
  data,
  columns,
  height = "unset",
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <Box h={height} w="full" overflowY="auto">
      <StyledTable {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} bgColor="gray.50">
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </StyledTable>
    </Box>
  );
};

export default FixedHeaderTable;

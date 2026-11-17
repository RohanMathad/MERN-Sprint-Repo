import { useState } from 'react';
import styled from 'styled-components';
import { formatIsoDate } from '../../utils/dateFormatter.js';
import * as PhosphorIcons from '@phosphor-icons/react';


const TableWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1; /* REPLACE height: 83.6% with this so it fills the screen perfectly */
`;

const StyledTable = styled.table`
  width: 100%;
  height: 100%; /* ADD THIS so the table stretches to the pagination controls */
  border-collapse: collapse;
  text-align: left;
  table-layout: fixed;
`;

const TableScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;


const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
`;

// this is for table header right border between columns
const TableHeader = styled.th`
  padding: 16px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  width: ${(props) => props.$width || 'auto'};
  border-right: 1px solid ${(props) => props.theme.colors.border}; 

  &:last-child {
    border-right: none;
  }
`;

// table row border 
const TableRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.colors.border}; 
  transition: background-color 0.2s;
  height: 57px;
  flex : 1;
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
  
  &:hover {
    background-color: ${(props) => props.theme.colors.background};
  }
`;

// this is for border between rows
const EmptyRow = styled.tr`
  height: 57px;
  border-bottom: 1px solid transparent; 
`;

//this is for border right between columns
const TableCell = styled.td`
  padding: 16px;
  color: ${(props) => props.theme.colors.text};
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  border-right: 1px solid ${(props) => props.theme.colors.border}; 

  &:last-child {
    border-right: none;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${(props) => {
    if (props.$status === 'completed') return '#d1e7dd';
    if (props.$status === 'in_progress') return '#fff3cd';
    return '#f8d7da';
  }};
  color: ${(props) => {
    if (props.$status === 'completed') return '#0f5132';
    if (props.$status === 'in_progress') return '#664d03';
    return '#842029';
  }};
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 20px;
  gap: 15px;
  background-color: ${(props) => props.theme.colors.surface};
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const PageInfo = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textSecondary};
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 4px;
  
  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.background};
  }
  
  &:disabled {
    color: ${(props) => props.theme.colors.border};
    cursor: not-allowed;
  }
`;

const Table = ({ columns, data, rowsPerPage = 5, onRowClick }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);
  const emptyRowsCount = rowsPerPage - currentData.length;

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <TableWrapper>
      <TableScrollContainer>
        <StyledTable>
          <TableHead>
            <tr>
              {columns.map((col, index) => (
                <TableHeader key={index} $width={col.width}>
                  {col.header}
                </TableHeader>
              ))}
            </tr>
          </TableHead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (

                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  $clickable={!!onRowClick}
                >
                  {columns.map((col, colIndex) => (

                    <TableCell key={colIndex}>
                      {col.type === 'icon' ? (
                        (() => {
                          // Dynamically grab the correct icon component based on the string saved in the DB
                          const IconComp = PhosphorIcons[row[col.accessor]] || PhosphorIcons.Circle;
                          return <IconComp size={24} weight="fill" color="var(--primary, #007bff)" />;
                        })()
                      ) : col.accessor === 'status' ? (
                        <StatusBadge $status={row[col.accessor]}>
                          {row[col.accessor].replace('_', ' ').toUpperCase()}
                        </StatusBadge>
                      ) : col.type === 'date' ? (
                        formatIsoDate(row[col.accessor], 'standard')
                      ) : (
                        row[col.accessor]
                      )}
                    </TableCell>

                  ))}
                </TableRow>

              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
                  No data available
                </TableCell>
              </TableRow>
            )}

            {emptyRowsCount > 0 && currentData.length > 0 && (
              Array.from({ length: emptyRowsCount }).map((_, index) => (
                <EmptyRow key={`empty-${index}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex}> </TableCell>
                  ))}
                </EmptyRow>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableScrollContainer>

      <PaginationControls>
        <ArrowButton onClick={handlePrev} disabled={currentPage === 1}>
          ←
        </ArrowButton>
        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>
        <ArrowButton onClick={handleNext} disabled={currentPage === totalPages}>
          →
        </ArrowButton>
      </PaginationControls>
    </TableWrapper>
  );
};

export default Table;
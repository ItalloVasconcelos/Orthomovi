
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ClientPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalResults: number;
  setCurrentPage: (page: number) => void;
}

export const ClientPagination: React.FC<ClientPaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalResults,
  setCurrentPage,
}) => {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <p className="text-sm text-gray-500 text-center">
        Mostrando {startIndex}–{endIndex} de {totalResults} resultados
      </p>
      
      {totalPages > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(Math.max(currentPage - 1, 1));
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              >
                Anterior
              </PaginationPrevious>
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
              // Show at most 5 numbered pages, centering around the current page
              let pageNum = index + 1;
              if (totalPages > 5) {
                if (currentPage > 3) {
                  pageNum = currentPage - 3 + index;
                  if (pageNum > totalPages - 5) {
                    pageNum = totalPages - 5 + index + 1;
                  }
                }
              }
              
              if (pageNum <= totalPages) {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNum);
                      }}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Fix: directly pass a number instead of a function
                  setCurrentPage(Math.min(currentPage + 1, totalPages));
                }}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              >
                Próxima
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

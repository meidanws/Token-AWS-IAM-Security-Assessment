import React from "react";
import SearchBar from "./SearchBar";

interface ResultsListProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  emptyMessage: string;
  searchPlaceholder?: string;
}

function ResultsList<T extends Record<string, any>>({
  title,
  items,
  renderItem,
  searchValue,
  onSearchChange,
  onClear,
  emptyMessage,
  searchPlaceholder,
}: ResultsListProps<T>) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-aws-blue">{title}</h2>
        {items.length > 0 && (
          <button onClick={onClear} className="btn-secondary text-sm py-1 px-3">
            Clear
          </button>
        )}
      </div>

      <div className="mb-4">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      </div>

      {items.length === 0 && !searchValue && (
        <div className="card text-gray-500 italic">{emptyMessage}</div>
      )}

      {
        <div className="grid gap-4">
          {(() => {
            const filteredItems = searchValue
              ? items.filter((item) =>
                  Object.values(item)
                    .filter(
                      (value) =>
                        typeof value === "string" || typeof value === "number"
                    )
                    .some((value) =>
                      String(value)
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    )
                )
              : items;

            return filteredItems.length === 0 ? (
              <div className="card text-gray-500">
                No results found for "{searchValue}"
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <div key={index} className="card">
                  {renderItem(item)}
                </div>
              ))
            );
          })()}
        </div>
      }
    </div>
  );
}

export default ResultsList;

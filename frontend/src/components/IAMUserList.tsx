import React, { useState, useMemo } from "react";
import { type IAMUser } from "../types/iam";
import ResultsList from "./ResultsList";

interface Props {
  users: IAMUser[];
  onClear: () => void;
}

const IAMUserList: React.FC<Props> = ({ users, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.UserName?.toLowerCase().includes(lowerSearch) ||
        user.Arn?.toLowerCase().includes(lowerSearch)
    );
  }, [users, searchTerm]);

  const renderUser = (user: IAMUser) => (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-start">
        <span className="font-medium text-aws-blue">{user.UserName}</span>
        <span className="text-sm text-gray-500">
          {user.CreateDate
            ? new Date(user.CreateDate).toLocaleDateString()
            : "N/A"}
        </span>
      </div>
      <div className="text-sm text-gray-700 break-all">{user.Arn}</div>
    </div>
  );

  return (
    <ResultsList
      title="IAM Users"
      items={filteredUsers}
      renderItem={renderUser}
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      onClear={onClear}
      emptyMessage="No IAM users found. Click 'List IAM Users'."
      searchPlaceholder="Search by username or ARN..."
    />
  );
};

export default IAMUserList;

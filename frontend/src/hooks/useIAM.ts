import { useState } from "react";
import { iamApi } from "../services/api";
import type { IAMUser, IAMFinding } from "../types/iam";

export const useIAMUsers = () => {
  const [users, setUsers] = useState<IAMUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listUsers = async () => {
    setError(null);
    setLoading(true);
    try {
      const users = await iamApi.listUsers();
      setUsers(users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearUsers = () => setUsers([]);

  return { users, loading, error, listUsers, clearUsers };
};

export const useIAMAssessment = () => {
  const [findings, setFindings] = useState<IAMFinding[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAssessment = async () => {
    setError(null);
    setLoading(true);
    try {
      const findings = await iamApi.runAssessment();
      setFindings(findings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    window.location.href = iamApi.getReportDownloadUrl();
  };

  const clearFindings = () => setFindings([]);

  return {
    findings,
    loading,
    error,
    runAssessment,
    downloadReport,
    clearFindings,
  };
};

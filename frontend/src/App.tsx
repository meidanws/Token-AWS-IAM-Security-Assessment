import IAMUserList from "./components/IAMUserList";
import VulnerabilityResults from "./components/VulnerabilityResults";
import { useIAMUsers, useIAMAssessment } from "./hooks/useIAM";
import tokenIcon from "./assets/token_icon.svg";

function App() {
  const {
    users,
    loading: usersLoading,
    error: usersError,
    listUsers,
    clearUsers,
  } = useIAMUsers();
  const {
    findings,
    loading: vulnerabilityScanLoading,
    error: vulnerabilityScanError,
    runAssessment: runVulnerabilityScan,
    downloadReport,
    clearFindings,
  } = useIAMAssessment();

  const loading = usersLoading || vulnerabilityScanLoading;
  const error = usersError || vulnerabilityScanError;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          {" "}
          <img src={tokenIcon} alt="Token Icon" className="w-32 h-10" />
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-aws-blue">
              AWS IAM Vulnerability Scanner
            </h1>
          </div>
          <p className="text-gray-600">
            Monitor and detect vulnerabilities in your AWS IAM configuration
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={listUsers}
            disabled={loading}
            className="btn-primary"
          >
            {usersLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading users...
              </span>
            ) : (
              "List IAM Users"
            )}
          </button>
          <button
            onClick={runVulnerabilityScan}
            disabled={loading}
            className="btn-primary"
          >
            {vulnerabilityScanLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Running...
              </span>
            ) : (
              "Run Vulnerability Scan"
            )}
          </button>
          <button
            onClick={downloadReport}
            disabled={!findings.length}
            className={`btn ${
              findings.length ? "btn-secondary" : "bg-gray-300 text-gray-700"
            }`}
          >
            Download Report
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <IAMUserList users={users} onClear={clearUsers} />
        <VulnerabilityResults findings={findings} onClear={clearFindings} />
      </div>
    </div>
  );
}

export default App;

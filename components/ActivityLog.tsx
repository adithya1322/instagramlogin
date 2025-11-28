import React from 'react';
import { ActivityLogProps } from '../types';

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  const handleDownload = () => {
    if (logs.length === 0) return;

    // Format the logs into a readable string
    const fileContent = logs.map(log => 
      `[${new Date(log.timestamp).toLocaleString()}] Email: ${log.email} | Status: ${log.status}`
    ).join('\n');

    // Create a Blob from the string
    const blob = new Blob([fileContent], { type: 'text/plain' });
    
    // Create a temporary link to trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'login_activity.txt';
    
    // Append to body, click, and cleanup
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base text-text font-semibold">Recent Activity Log</h3>
        {logs.length > 0 && (
          <button 
            onClick={handleDownload}
            className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 transition-colors"
            title="Download activity log to file"
          >
            Download Logs
          </button>
        )}
      </div>
      
      <ul className="list-none p-0 text-sm text-gray-500 max-h-[150px] overflow-y-auto custom-scrollbar">
        {logs.length === 0 ? (
          <li className="text-center italic text-xs text-gray-400 py-2">No recent activity</li>
        ) : (
          logs.map((log) => (
            <li key={log.id} className="mb-2 pb-1 border-b border-gray-50 flex justify-between items-center last:border-0">
              <strong className="text-gray-700 font-medium truncate max-w-[60%]">{log.email}</strong>
              <span className="text-xs text-gray-400">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ActivityLog;
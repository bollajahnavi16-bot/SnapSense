import React, { useState } from 'react';
import { CheckSquare, User, Calendar, Check, Circle } from 'lucide-react';

export default function ActionItemsTable({ actionItems }) {
  const [completedTasks, setCompletedTasks] = useState({});

  if (!actionItems || actionItems.length === 0) return null;

  const toggleTask = (idx) => {
    setCompletedTasks(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const getPriorityBadge = (priority) => {
    switch (priority?.toUpperCase()) {
      case 'HIGH':
        return 'bg-red-950/80 text-red-400 border-red-800';
      case 'MEDIUM':
        return 'bg-amber-950/80 text-amber-400 border-amber-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="glass-card rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <CheckSquare className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Extracted Action Items & Deliverables</h3>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            {actionItems.length} Tasks Identified
          </span>
        </div>
        <span className="text-xs text-slate-400 font-mono">Auto-generated via Snapdragon NPU</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-2.5 px-3 w-8">Done</th>
              <th className="py-2.5 px-3">Action Item / Deliverable Task</th>
              <th className="py-2.5 px-3">Assignee</th>
              <th className="py-2.5 px-3">Priority</th>
              <th className="py-2.5 px-3">Target Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {actionItems.map((item, idx) => {
              const isDone = completedTasks[idx];
              return (
                <tr key={idx} className={`hover:bg-slate-900/40 transition-colors ${isDone ? 'opacity-50 line-through' : ''}`}>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => toggleTask(idx)}
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                        isDone ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-700 hover:border-slate-500 bg-slate-900'
                      }`}
                    >
                      {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-100 leading-snug">
                    {item.task}
                  </td>
                  <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                    <div className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.assignee}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap font-mono">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.deadline}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

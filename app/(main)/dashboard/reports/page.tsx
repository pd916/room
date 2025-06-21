import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { gradeReports } from '@/constant';

const GradeReports = () => {
  return (
    <div className="space-y-4">
      {gradeReports.map((report) => (
        <div
          key={report.id}
          className="w-full border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-all"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {report.quizTitle}
            </h2>
            <Badge variant="outline" className="text-sm">
              {report.classTitle}
            </Badge>
          </div>

          {/* Meta Info */}
          <div className="mt-2 text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span>
              Date:{" "}
              <span className="font-medium text-gray-800">
                {format(report.date, 'MMMM d, yyyy')}
              </span>
            </span>
            <span>
              Grade:{" "}
              <span
                className={`font-bold text-base ${
                  report.score >= 90
                    ? 'text-green-600'
                    : report.score >= 75
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {report.grade} ({report.score}%)
              </span>
            </span>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/reports/${report.id}`}>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-blue-600 hover:underline"
              >
                View Report
              </Button>
            </Link>
            {report.grade === 'A+' && (
              <Button variant="outline" className="text-sm px-3 py-1 h-auto" disabled>
                Excellent Work!
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GradeReports;

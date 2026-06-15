import React from "react";
import { Button, Table } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

// ── Formatter Helpers ───────────────────────────────────────────────────────

const formatSalary = (min, max, currency) => {
  if (!min && !max) return "Not specified";
  const formatNum = (num) =>
    num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num;
  const range =
    min && max
      ? `${formatNum(min)} - ${formatNum(max)}`
      : formatNum(min || max);
  return `${range} ${currency?.toUpperCase()}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const JobsTable = ({ jobs }) => {
  const jobList = Array.isArray(jobs) ? jobs : [];

  return (
    <Table aria-label="Recruiter job vacancies overview board">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Job Title</Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Deadline</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {jobList.length > 0 ? (
              jobList.map((job) => (
                <Table.Row key={job._id}>
                  <Table.Cell className="font-medium text-foreground">
                    {job.jobTitle}
                  </Table.Cell>
                  <Table.Cell className="capitalize">
                    {job.jobCategory}
                  </Table.Cell>
                  <Table.Cell
                    className={`capitalize ${job.status == "active" ? "text-green-500" : ""}`}
                  >
                    {job.status}
                  </Table.Cell>
                  <Table.Cell>{formatDate(job.deadline)}</Table.Cell>
                  {/* Action Suite */}
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        radius="md"
                        aria-label={`View details for ${job.jobTitle}`}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-default-500" />
                      </Button>

                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        radius="md"
                        aria-label={`Edit ${job.jobTitle}`}
                        title="Edit Position"
                      >
                        <Pencil className="w-4 h-4 text-primary" />
                      </Button>

                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        radius="md"
                        color="danger"
                        aria-label={`Delete ${job.jobTitle}`}
                        title="Delete Position"
                      >
                        <TrashBin className="w-4 h-4 text-danger" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={5}
                  className="text-center py-8 text-default-400"
                >
                  No job vacancies found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

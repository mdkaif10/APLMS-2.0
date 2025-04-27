"use client";

import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useState, useTransition } from "react";
import { deleteContactMessage, markContactMessageRead } from "@/actions/actions";

export default function MessageActions({ id, status }: { id: string, status: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [actionLoading, setActionLoading] = useState(false);

  const handleDelete = () => setOpen(true);
  const handleConfirmDelete = () => {
    setOpen(false);
    setActionLoading(true);
    startTransition(async () => {
      await deleteContactMessage(id);
      window.location.reload();
    });
  };
  const handleMarkRead = () => {
    setActionLoading(true);
    startTransition(async () => {
      await markContactMessageRead(id);
      window.location.reload();
    });
  };
  return (
    <div className="flex gap-2">
      {status === "unread" && (
        <Button size="sm" variant="secondary" disabled={actionLoading} onClick={handleMarkRead}>
          {actionLoading ? "Marking..." : "Mark as Read"}
        </Button>
      )}
      <Button size="sm" variant="destructive" disabled={actionLoading} onClick={handleDelete}>
        Delete
      </Button>
      <ConfirmationDialog
        message="Are you sure you want to delete this message?"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
} 
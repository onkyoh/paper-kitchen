import { useState, useCallback } from "react";

const usePermissions = () => {
  const [editingIds, setEditingIds] = useState<number[]>([]);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const handleEdit = useCallback(
    (id: number) => {
      setEditingIds((prevEditingIds) => {
        const isIncluded = editingIds.includes(id);
        return isIncluded
          ? prevEditingIds.filter((editing) => editing !== id)
          : [...prevEditingIds, id];
      });
    },
    [editingIds]
  );

  const handleDelete = useCallback(
    (id: number) => {
      setDeletingIds((prevDeletingIds) => {
        const isIncluded = prevDeletingIds.includes(id);
        return isIncluded
          ? prevDeletingIds.filter((deleting) => deleting !== id)
          : [...prevDeletingIds, id];
      });
    },
    [deletingIds]
  );

  return { editingIds, handleEdit, deletingIds, handleDelete };
};

export default usePermissions;

import { useState, useCallback } from "react";

const usePermissions = () => {
  const [editingIds, setEditingIds] = useState<number[]>([]);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const handleEdit = useCallback((id: number) => {
    setEditingIds((prevEditingIds) => {
      const isEditing = prevEditingIds.includes(id);
      return isEditing
        ? prevEditingIds.filter((editing) => editing !== id)
        : [...prevEditingIds, id];
    });
  }, []);

  const handleDelete = useCallback((id: number) => {
    setDeletingIds((prevDeletingIds) => {
      const isDeleting = prevDeletingIds.includes(id);
      return isDeleting
        ? prevDeletingIds.filter((deleting) => deleting !== id)
        : [...prevDeletingIds, id];
    });
  }, []);

  return { editingIds, handleEdit, deletingIds, handleDelete };
};

export default usePermissions;
